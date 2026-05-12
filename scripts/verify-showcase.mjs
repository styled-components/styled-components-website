#!/usr/bin/env node
/**
 * Verify whether a site currently ships styled-components in production.
 *
 * Detection is a single unambiguous signal: the `data-styled-version`
 * attribute that the SC runtime emits. No other library produces this
 * string. We look for it in two places:
 *
 *   1. The page HTML (SSR'd <style data-styled data-styled-version="...">).
 *   2. Same-origin JavaScript bundles (the literal is baked into the SC
 *      runtime as the attribute name passed to setAttribute), used as a
 *      fallback for sites that hydrate SC client-side without SSR.
 *
 * Either route reports the SC version when adjacent to the literal.
 *
 * Usage:
 *   node scripts/verify-showcase.mjs <url> [<url> ...]
 *   node scripts/verify-showcase.mjs --all       # audit the whole manifest
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TIMEOUT_MS = 15000;
const JS_TIMEOUT_MS = 10000;
const MAX_JS_BUNDLES = 12;
const MAX_JS_BYTES = 1_500_000; // skim the first ~1.5 MB of any one bundle
const CONCURRENCY = 6;
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

// Primary HTML signal. styled-components SSRs a <style> tag carrying
// both `data-styled` and `data-styled-version="X.Y.Z"`; no other
// library emits this combination.
const SC_HTML_SIGNAL = /<style[^>]*data-styled[^>]*data-styled-version="([^"]+)"/i;

// JS bundle signals. The SC runtime calls setAttribute with the literal
// "data-styled-version" plus a baked-in version constant. After
// minification the version usually sits adjacent to the attribute name
// as a quoted string literal, so try to capture it; fall back to the
// presence of the attribute literal alone when the version was hoisted.
const SC_JS_VERSION = /data-styled-version["'`\s:,]+["'`](\d+\.\d+\.\d+(?:-[\w.]+)?)["'`]/;
const SC_JS_LITERAL = /data-styled-version/;

// Reported as context when a site has no SC signal. Helps explain why
// a previously-listed site no longer qualifies.
const ANTI_PATTERNS = [
  { name: 'emotion', re: /<style[^>]+data-emotion|@emotion\/(?:styled|react|css)/i },
  { name: 'tailwind', re: /\b(tw-[a-z]|tailwind|--tw-)/i },
];

const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const C = useColor
  ? {
      reset: '\x1b[0m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      red: '\x1b[31m',
      dim: '\x1b[2m',
      bold: '\x1b[1m',
    }
  : { reset: '', green: '', yellow: '', red: '', dim: '', bold: '' };

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml' },
      signal: controller.signal,
    });
    const html = await res.text();
    return { ok: res.ok, status: res.status, finalUrl: res.url, html };
  } finally {
    clearTimeout(timeout);
  }
}

function detectSC(html) {
  const m = html.match(SC_HTML_SIGNAL);
  return m ? m[1] : null;
}

function extractScriptUrls(html, baseUrl) {
  const urls = new Set();
  const re = /<script[^>]+src=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    try {
      urls.add(new URL(m[1], baseUrl).href);
    } catch {}
  }
  return [...urls];
}

// Cross-origin script sources are common (e.g. Spotify serves bundles
// from open.spotifycdn.com). Skip URLs that look like pure analytics
// or recaptcha so the per-site fetch budget stays focused on app code.
const NOISE_HOSTS = /(googletagmanager|google-analytics|doubleclick|recaptcha|facebook\.(?:net|com)|connect\.facebook|twitter\.com|t\.co|linkedin|segment\.(?:io|com)|hotjar|mixpanel|optimizely|cdn\.amplitude|appboy|braze|fullstory|sentry|datadog|cloudflareinsights|hcaptcha|cookielaw|onetrust)/i;

function isLikelyAppBundle(scriptUrl) {
  try {
    const u = new URL(scriptUrl);
    return !NOISE_HOSTS.test(u.hostname);
  } catch {
    return false;
  }
}

/** Read at most MAX_JS_BYTES of the bundle body so a multi-megabyte
 *  vendor chunk doesn't dominate the audit. SC's `data-styled-version`
 *  literal is part of the runtime emit and appears well inside that
 *  budget when it's present at all. */
async function fetchJSText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), JS_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': UA },
      signal: controller.signal,
    });
    if (!res.ok || !res.body) return null;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let total = 0;
    let text = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.length;
      text += decoder.decode(value, { stream: true });
      if (total >= MAX_JS_BYTES) {
        try {
          await reader.cancel();
        } catch {}
        break;
      }
    }
    return text;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function detectSCInBundles(baseUrl, html) {
  const candidates = extractScriptUrls(html, baseUrl)
    .filter(isLikelyAppBundle)
    .filter(u => /\.m?js(?:[?#]|$)/i.test(u))
    .slice(0, MAX_JS_BUNDLES);

  for (const url of candidates) {
    const js = await fetchJSText(url);
    if (!js) continue;
    const versionMatch = js.match(SC_JS_VERSION);
    if (versionMatch) return { url, version: versionMatch[1] };
    if (SC_JS_LITERAL.test(js)) return { url, version: 'unknown' };
  }
  return null;
}

function detectAntiSignal(html) {
  for (const a of ANTI_PATTERNS) {
    if (a.re.test(html)) return a.name;
  }
  return null;
}

async function check({ url, label }) {
  try {
    const res = await fetchHtml(url);

    // AWS WAF, DataDome, Cloudflare, and similar bot-protection services
    // either return empty bodies or tiny challenge pages that ask the
    // client to solve a captcha. Detect those upfront so they're flagged
    // as needing manual verification rather than reported as failures.
    const looksLikeChallenge =
      res.html.length === 0 ||
      res.status === 202 ||
      (res.html.length < 10000 &&
        /datadome|captcha-delivery|cloudflare|just a moment|please enable js|aws.?waf|awswaf|cf-chl|challenge-platform/i.test(
          res.html
        ));

    if (looksLikeChallenge) {
      return {
        url,
        label,
        status: 'blocked',
        reason: `HTTP ${res.status} + bot challenge page, needs DevTools`,
      };
    }

    if (!res.ok) {
      return { url, label, status: 'failed', reason: `HTTP ${res.status}` };
    }

    const version = detectSC(res.html);
    if (version) {
      return {
        url,
        label,
        status: 'confirmed',
        evidence: `data-styled-version="${version}" (HTML SSR)`,
        finalUrl: res.finalUrl,
      };
    }

    // No SSR tag in the HTML. Walk the page's same-origin script bundles
    // looking for the same `data-styled-version` literal baked into the
    // SC runtime; this catches sites that mount SC client-side.
    const bundleHit = await detectSCInBundles(res.finalUrl || url, res.html);
    if (bundleHit) {
      const bundleName = new URL(bundleHit.url).pathname.split('/').pop() || bundleHit.url;
      return {
        url,
        label,
        status: 'confirmed',
        evidence: `data-styled-version="${bundleHit.version}" (JS bundle: ${bundleName})`,
        finalUrl: res.finalUrl,
      };
    }

    // Still nothing. Either the site has migrated or the SC runtime is
    // loaded from a third-party origin we didn't scan. Use a stray
    // "styled-components" string as a hint that something SC-shaped is
    // referenced even if we can't fingerprint it.
    const mentionsSC = /styled[-_]?components/i.test(res.html);
    const anti = detectAntiSignal(res.html);

    if (!mentionsSC && anti) {
      return {
        url,
        label,
        status: 'no-trace',
        reason: `no SC signal in HTML or scanned bundles; saw ${anti} markers (likely migrated)`,
        finalUrl: res.finalUrl,
      };
    }
    if (!mentionsSC) {
      return {
        url,
        label,
        status: 'no-trace',
        reason: 'no SC signal in HTML or scanned bundles (likely migrated)',
        finalUrl: res.finalUrl,
      };
    }
    return {
      url,
      label,
      status: 'inconclusive',
      reason: 'SC referenced but not fingerprinted in HTML or scanned bundles',
      finalUrl: res.finalUrl,
    };
  } catch (err) {
    return {
      url,
      label,
      status: 'failed',
      reason: err.name === 'AbortError' ? 'timeout' : err.message,
    };
  }
}

function parseManifest() {
  const src = readFileSync(join(ROOT, 'companies-manifest.tsx'), 'utf8');
  // Each project block has a title + link pair in close proximity. The
  // non-greedy [\s\S]*? between them keeps the match contained to a
  // single project. Empty `projects: {}` blocks have neither, so they're
  // skipped naturally.
  const projects = [];
  const re = /title:\s*'([^']+)'[\s\S]{0,400}?link:\s*'([^']+)'/g;
  let m;
  while ((m = re.exec(src))) {
    projects.push({ label: m[1], url: m[2] });
  }
  return projects;
}

function symbol(status) {
  if (status === 'confirmed') return `${C.green}✓${C.reset}`;
  if (status === 'inconclusive') return `${C.yellow}?${C.reset}`;
  if (status === 'blocked') return `${C.yellow}!${C.reset}`;
  if (status === 'no-trace') return `${C.red}✗${C.reset}`;
  return `${C.red}✗${C.reset}`;
}

function formatResult(r) {
  const sym = symbol(r.status);
  const label = (r.label || '').padEnd(28).slice(0, 28);
  const url = r.url.padEnd(48).slice(0, 48);
  const detail =
    r.evidence ||
    r.reason ||
    '';
  const detailColor =
    r.status === 'confirmed' ? C.dim : r.status === 'inconclusive' ? C.yellow : C.red;
  return `${sym}  ${C.bold}${label}${C.reset}  ${C.dim}${url}${C.reset}  ${detailColor}${detail}${C.reset}`;
}

async function runConcurrently(items, fn, concurrency) {
  const queue = [...items];
  const results = [];
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (queue.length) {
      const item = queue.shift();
      const result = await fn(item);
      console.log(formatResult(result));
      results.push(result);
    }
  });
  await Promise.all(workers);
  return results;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('-h') || args.includes('--help')) {
    console.error(
      'usage:\n' +
        '  node scripts/verify-showcase.mjs <url> [<url> ...]\n' +
        '  node scripts/verify-showcase.mjs --all'
    );
    process.exit(2);
  }

  let targets;
  if (args.includes('--all')) {
    targets = parseManifest();
    if (targets.length === 0) {
      console.error('could not parse any projects from companies-manifest.tsx');
      process.exit(2);
    }
  } else {
    targets = args.map(url => ({ url, label: '' }));
  }

  console.log(
    `${C.bold}Checking ${targets.length} site${targets.length === 1 ? '' : 's'} for styled-components artifacts.${C.reset}\n`
  );

  const results = await runConcurrently(targets, check, CONCURRENCY);

  const counts = {
    confirmed: 0,
    inconclusive: 0,
    blocked: 0,
    'no-trace': 0,
    failed: 0,
  };
  for (const r of results) counts[r.status]++;

  console.log(
    `\n${C.bold}${counts.confirmed}${C.reset} confirmed, ` +
      `${C.yellow}${counts.inconclusive}${C.reset} inconclusive, ` +
      `${C.yellow}${counts.blocked}${C.reset} blocked, ` +
      `${C.red}${counts['no-trace']}${C.reset} no-trace, ` +
      `${C.red}${counts.failed}${C.reset} failed.`
  );

  if (counts.inconclusive + counts.blocked > 0) {
    console.log(
      `${C.dim}? / ! → manual check in DevTools: look for <style data-styled> or sc-* classes after hydration.${C.reset}`
    );
  }
  if (counts['no-trace'] > 0) {
    console.log(
      `${C.dim}✗ no-trace → strong signal the site has migrated; consider removing from the showcase.${C.reset}`
    );
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
