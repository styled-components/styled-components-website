#!/usr/bin/env node
/**
 * Capture 1280x720 JPGs of showcase entries.
 *
 * Drives macOS's installed Chrome via the DevTools Protocol so we can
 * inject JS to nuke cookie / consent banners before each screenshot.
 * Zero dependencies — Node 22+ has a built-in WebSocket client.
 *
 * Usage:
 *   node scripts/capture-screenshots.mjs <slug> <url> [<slug> <url> ...]
 *   node scripts/capture-screenshots.mjs --keep   # don't quit Chrome at end
 *
 * Output: public/screenshots/thumbnails/<slug>.jpg
 */

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT, 'public', 'screenshots', 'thumbnails');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9223; // off the default 9222 to avoid clashing with a running Chrome
const WIDTH = 1280;
const HEIGHT = 720;
const NAV_TIMEOUT_MS = 30_000;
const HYDRATION_WAIT_MS = 4500;
const POST_KILL_WAIT_MS = 600;
const POLL_KILL_ROUNDS = 5;
const POLL_KILL_INTERVAL_MS = 1000;
const JPG_QUALITY = 85;

// JS executed inside the page after navigation to wipe out the usual
// suspects: GDPR / cookie / consent modals, scroll-locks, and chat
// widgets. Liberal removal — if it looks like a banner, it dies.
const KILL_BANNERS = `
(() => {
  const KEYWORDS = /cookie|consent|privacy|gdpr|tracking|terms of use|terms of service|legal terms|we use|we value your privacy|agree (?:and|to)/i;
  const ACCEPT_TEXT = /^\\s*(accept|agree|i agree|ok|got it|allow all|accept all|continue|i accept|i understand)\\s*$/i;

  // Pass 1: known vendor IDs / classes — fast path.
  const SELECTORS = [
    '#onetrust-banner-sdk', '#onetrust-consent-sdk', '.onetrust-pc-dark-filter',
    '#CybotCookiebotDialog', '#CybotCookiebotDialogBodyUnderlay', '#CookiebotWidget',
    '#didomi-notice', '#didomi-popup', '.didomi-popup-view',
    '#truste-consent-track', '.truste_box_overlay', '.truste_overlay', '#consent_blackbar',
    '#qc-cmp2-container', '.qc-cmp2-summary-info',
    // Usercentrics CMP (SIXT, many EU sites). The modal is inside a closed
    // shadow root on this host, so we can't reach the OK button — kill
    // the host element instead.
    '#usercentrics-cmp-ui', '#usercentrics-root', '[data-testid="uc-default-wall"]',
    '.cc-window', '.cc-banner', '.cc-modal', '.cc-overlay', '.osano-cm-dialog',
    '[id*="cookie" i][class*="banner" i]', '[id*="cookie" i][class*="modal" i]',
    '[class*="cookie" i][class*="banner" i]', '[class*="cookie" i][class*="modal" i]',
    '[id*="consent" i][class*="modal" i]', '[class*="consent" i][class*="banner" i]',
    '[id*="gdpr" i]', '[class*="gdpr" i]', '[id*="privacy" i][class*="banner" i]',
    '[aria-label*="cookie" i][role="dialog"]', '[aria-label*="consent" i][role="dialog"]',
    // Chat / support widgets
    '#hubspot-messages-iframe-container', 'iframe[title*="chat" i]',
    '[id*="chat-widget" i]', '[id*="zendesk" i]', '[id*="intercom-frame" i]',
    '[id*="drift-frame" i]', '[class*="chat-widget" i]', '[class*="chatbot" i]',
    '[id*="livechat" i]',
  ];
  for (const sel of SELECTORS) document.querySelectorAll(sel).forEach(el => el.remove());

  // Pass 2a: any [role="dialog"] / aria-modal / <dialog>. Walk up to the
  // outermost overlay ancestor so we remove the backdrop too.
  function killDialog(node) {
    let cur = node;
    let outermost = node;
    while (cur && cur !== document.body) {
      const cs = getComputedStyle(cur);
      if (cs.position === 'fixed' || cs.position === 'absolute' || parseFloat(cs.zIndex) > 100) {
        outermost = cur;
      }
      cur = cur.parentElement;
    }
    outermost.remove();
  }
  document
    .querySelectorAll('[role="dialog"],[role="alertdialog"],dialog,[aria-modal="true"]')
    .forEach(d => {
      const text = (d.innerText || '').slice(0, 2000);
      if (!KEYWORDS.test(text)) return;
      const buttons = d.querySelectorAll('button, a, [role="button"]');
      for (const b of buttons) {
        const t = (b.innerText || b.getAttribute('aria-label') || '').trim();
        if (ACCEPT_TEXT.test(t)) {
          try { b.click(); } catch {}
          break;
        }
      }
      killDialog(d);
    });

  // Pass 2b: any fixed/sticky element occupying real screen estate whose
  // visible text mentions cookies, privacy, or legal terms.
  const all = document.querySelectorAll('div, section, aside, dialog, form, article');
  for (const el of all) {
    if (!el.isConnected) continue;
    const style = getComputedStyle(el);
    const pos = style.position;
    if (pos !== 'fixed' && pos !== 'sticky' && pos !== 'absolute') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 200 || r.height < 80) continue;
    if (r.width * r.height < 30_000) continue;
    const text = (el.innerText || '').slice(0, 1500);
    if (!KEYWORDS.test(text)) continue;
    const buttons = el.querySelectorAll('button, a, [role="button"]');
    for (const b of buttons) {
      const t = (b.innerText || b.getAttribute('aria-label') || '').trim();
      if (ACCEPT_TEXT.test(t)) {
        try { b.click(); } catch {}
        break;
      }
    }
    el.remove();
  }

  // Pass 2c: chat widgets pinned to the bottom-right corner. Detect by
  // position + size + content keywords ("chat", "help", "ask").
  const CHAT_TEXT = /how can (?:i|we) help|chat with|ask (?:us|a question)|live (?:chat|support)|need help/i;
  for (const el of document.querySelectorAll('div, section, aside')) {
    if (!el.isConnected) continue;
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed') continue;
    const r = el.getBoundingClientRect();
    if (r.right < window.innerWidth - 50 || r.bottom < window.innerHeight - 50) continue;
    if (r.width < 100 || r.width > 600) continue;
    const text = (el.innerText || '').slice(0, 500);
    if (!CHAT_TEXT.test(text)) continue;
    el.remove();
  }

  // Pass 3: full-screen backdrops / dim overlays that survived without
  // the actual dialog they were dimming.
  for (const el of document.querySelectorAll('div, section')) {
    const s = getComputedStyle(el);
    if ((s.position === 'fixed' || s.position === 'absolute') && parseFloat(s.zIndex) > 1000) {
      const r = el.getBoundingClientRect();
      if (r.width >= window.innerWidth * 0.95 && r.height >= window.innerHeight * 0.95) {
        const bg = s.backgroundColor;
        const isDim = /rgba?\\(.*0?\\.[0-9]+\\)/.test(bg) || bg === 'rgb(0, 0, 0)' || s.backdropFilter !== 'none';
        if (isDim && !el.textContent.trim()) el.remove();
      }
    }
  }

  // Undo body scroll-locks.
  for (const el of [document.documentElement, document.body]) {
    if (!el) continue;
    el.style.overflow = '';
    el.style.height = '';
    el.style.position = '';
    el.classList.forEach(c => {
      if (/no-scroll|scroll-lock|modal-open|cookie|consent/i.test(c)) el.classList.remove(c);
    });
  }

  // Seed common consent cookies so reloads don't re-show banners.
  const yr = new Date(Date.now() + 31536000_000).toUTCString();
  for (const c of [
    'OptanonAlertBoxClosed=' + new Date().toISOString(),
    'OptanonConsent=isGpcEnabled=0&groups=C0001:1,C0002:1,C0003:1,C0004:1',
    'CookieConsent={stamp:%27-%27%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true}',
    'didomi_token=accept', 'cookieconsent_status=dismiss', 'cookie_consent=true',
    'gdpr_consent=accept',
  ]) {
    document.cookie = c + '; path=/; expires=' + yr;
  }
})();
`;

// Stylesheet injected at document start. Brute-force hides anything
// that looks like a dialog/modal so even portal-rendered consent UIs
// stay invisible without depending on DOM-walking heuristics. Site
// content rarely uses `aria-modal="true"` for non-overlay UI, so the
// false-positive risk is low for a screenshot purpose.
const KILL_CSS = `
  [role="dialog"],
  [role="alertdialog"],
  [aria-modal="true"],
  dialog,
  [class*="modal" i][class*="overlay" i],
  [class*="cookie" i][class*="banner" i],
  [class*="cookie" i][class*="dialog" i],
  [class*="consent" i][class*="dialog" i],
  [class*="privacy" i][class*="dialog" i],
  [data-status="entered"][role="dialog"],
  /* Usercentrics CMP host (renders consent modal inside a shadow root) */
  #usercentrics-cmp-ui,
  #usercentrics-root,
  /* Chat / support widgets pinned to the bottom-right corner */
  [class*="chat-widget" i],
  [class*="chatbot" i],
  [id*="chat-widget" i],
  [id*="livechat" i],
  [id*="intercom" i],
  [id*="drift-widget" i],
  [id*="zendesk" i],
  [aria-label*="chat" i][role="button"],
  iframe[title*="chat" i] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
  /* Restore body scroll in case modals locked it */
  html, body { overflow: auto !important; }
`;

// Injected via Page.addScriptToEvaluateOnNewDocument before navigation
// so bot-detection scripts see a believable browser environment. Not a
// full stealth suite, but enough to get past the cheapest checks.
const STEALTH_INIT = `
(() => {
  try {
    Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
  } catch {}
  try {
    Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
  } catch {}
  try {
    Object.defineProperty(navigator, 'plugins', {
      get: () => [
        { name: 'Chrome PDF Plugin' },
        { name: 'Chrome PDF Viewer' },
        { name: 'Native Client' },
      ],
    });
  } catch {}
  try {
    const orig = window.chrome;
    if (!orig) window.chrome = { runtime: {} };
  } catch {}
})();
`;

// ---- CDP client ----------------------------------------------------------

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = new Map();
    ws.addEventListener('message', e => this._onMessage(e));
  }
  _onMessage(e) {
    const msg = JSON.parse(e.data);
    if (msg.id != null) {
      const p = this.pending.get(msg.id);
      if (p) {
        this.pending.delete(msg.id);
        if (msg.error) p.reject(new Error(msg.error.message));
        else p.resolve(msg.result);
      }
    } else if (msg.method) {
      const fns = this.listeners.get(msg.method);
      if (fns) for (const fn of fns) fn(msg.params);
    }
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }
  on(event, fn) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event).add(fn);
    return () => this.listeners.get(event)?.delete(fn);
  }
  once(event) {
    return new Promise(resolve => {
      const off = this.on(event, params => {
        off();
        resolve(params);
      });
    });
  }
}

// ---- Chrome lifecycle ----------------------------------------------------

let chromeProcess;
let userDataDir;

async function launchChrome() {
  userDataDir = mkdtempSync(join(tmpdir(), 'sc-shot-profile-'));
  chromeProcess = spawn(
    CHROME,
    [
      '--headless=new',
      '--hide-scrollbars',
      '--disable-gpu',
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${userDataDir}`,
      `--remote-debugging-port=${PORT}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      'about:blank',
    ],
    { stdio: ['ignore', 'pipe', 'pipe'] }
  );

  // Poll /json/version until the debug endpoint is alive.
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return;
    } catch {}
    await sleep(150);
  }
  throw new Error('Chrome did not expose CDP within 10s');
}

async function killChrome() {
  if (chromeProcess && !chromeProcess.killed) {
    chromeProcess.kill('SIGTERM');
    await new Promise(resolve => {
      chromeProcess.once('exit', resolve);
      setTimeout(() => {
        if (!chromeProcess.killed) chromeProcess.kill('SIGKILL');
        resolve();
      }, 2000);
    });
  }
  if (userDataDir) rmSync(userDataDir, { recursive: true, force: true });
}

async function openTarget() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/new`, { method: 'PUT' });
  const target = await res.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
  return { ws, targetId: target.id };
}

async function closeTarget(targetId) {
  await fetch(`http://127.0.0.1:${PORT}/json/close/${targetId}`).catch(() => {});
}

// ---- Per-URL capture -----------------------------------------------------

async function captureOne(slug, url) {
  const { ws, targetId } = await openTarget();
  const cdp = new CDP(ws);
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });
    // Realistic UA — drop the "Headless" token that Chrome adds in
    // headless mode, which is the cheapest tell for bot-detection.
    await cdp.send('Network.setUserAgentOverride', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      acceptLanguage: 'en-US,en;q=0.9',
      platform: 'MacIntel',
    });
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: STEALTH_INIT });
    // Inject the kill stylesheet at document start so it applies to
    // late-mounted dialogs, modals, and chat widgets.
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        (() => {
          const insertCSS = () => {
            if (document.getElementById('__sc_kill_css__')) return;
            const head = document.head || document.documentElement;
            const s = document.createElement('style');
            s.id = '__sc_kill_css__';
            s.textContent = ${JSON.stringify(KILL_CSS)};
            head.appendChild(s);
          };
          insertCSS();
          new MutationObserver(insertCSS).observe(
            document.documentElement,
            { childList: true, subtree: false }
          );
        })();
      `,
    });

    const navigated = Promise.race([
      cdp.once('Page.loadEventFired'),
      sleep(NAV_TIMEOUT_MS).then(() => null),
    ]);
    await cdp.send('Page.navigate', { url });
    await navigated;

    // Let JS hydrate, then run the banner killer in a poll loop.
    // Many sites lazy-mount consent modals or chat widgets a few
    // seconds after load, so one pass isn't enough.
    await sleep(HYDRATION_WAIT_MS);
    for (let i = 0; i < POLL_KILL_ROUNDS; i++) {
      await cdp.send('Runtime.evaluate', { expression: KILL_BANNERS });
      if (i < POLL_KILL_ROUNDS - 1) await sleep(POLL_KILL_INTERVAL_MS);
    }
    await sleep(POST_KILL_WAIT_MS);

    const shot = await cdp.send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: JPG_QUALITY,
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
    });

    const buf = Buffer.from(shot.data, 'base64');
    const outPath = join(OUTPUT_DIR, `${slug}.jpg`);
    writeFileSync(outPath, buf);
    console.log(`  ✓ ${outPath} (${(buf.length / 1024).toFixed(0)} KB)`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${err.message || err}`);
    return false;
  } finally {
    ws.close();
    await closeTarget(targetId);
  }
}

// ---- Entry ---------------------------------------------------------------

async function main() {
  const argv = process.argv.slice(2).filter(a => a !== '--keep');
  const keep = process.argv.includes('--keep');

  if (argv.length === 0 || argv.length % 2 !== 0) {
    console.error('usage: node scripts/capture-screenshots.mjs <slug> <url> [<slug> <url> ...]');
    process.exit(2);
  }

  console.log('Launching Chrome...');
  await launchChrome();

  let ok = 0;
  let fail = 0;
  try {
    for (let i = 0; i < argv.length; i += 2) {
      const slug = argv[i];
      const url = argv[i + 1];
      console.log(`→ ${slug}  ${url}`);
      const success = await captureOne(slug, url);
      if (success) ok++;
      else fail++;
    }
  } finally {
    if (!keep) await killChrome();
  }

  console.log(`\n${ok} captured, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch(async err => {
  console.error(err);
  await killChrome().catch(() => {});
  process.exit(1);
});
