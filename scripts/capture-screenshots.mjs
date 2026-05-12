#!/usr/bin/env node
/**
 * Capture 1280x720 JPGs of showcase entries.
 *
 * Drives macOS's installed Chrome via the DevTools Protocol so we can
 * inject JS to nuke cookie / consent banners before each screenshot.
 * Zero dependencies. Node 22+ has a built-in WebSocket client.
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
// widgets. Liberal removal: if it looks like a banner, it dies.
const KILL_BANNERS = `
(() => {
  const KEYWORDS = /cookie|consent|privacy|gdpr|tracking|terms of use|terms of service|legal terms|we use|we value your privacy|agree (?:and|to)/i;
  const ACCEPT_TEXT = /^\\s*(accept|agree|i agree|ok|got it|allow all|accept all|continue|i accept|i understand)\\s*$/i;

  // Pass 1: known vendor IDs / classes (fast path).
  const SELECTORS = [
    '#onetrust-banner-sdk', '#onetrust-consent-sdk', '.onetrust-pc-dark-filter',
    '#CybotCookiebotDialog', '#CybotCookiebotDialogBodyUnderlay', '#CookiebotWidget',
    '#didomi-notice', '#didomi-popup', '.didomi-popup-view',
    '#truste-consent-track', '.truste_box_overlay', '.truste_overlay', '#consent_blackbar',
    '#qc-cmp2-container', '.qc-cmp2-summary-info',
    // Usercentrics CMP (SIXT, many EU sites). The modal is inside a closed
    // shadow root on this host, so we can't reach the OK button: kill
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

// Walks up from each match to the first ancestor with computed position
// sticky/fixed and removes it. Used for ad rails that wrap a Google Ads
// iframe in a positioned slot.
const KILL_STICKY_PARENT = (rootSelector) => `
  for (const el of document.querySelectorAll(${JSON.stringify(rootSelector)})) {
    let cur = el;
    while (cur && cur !== document.body) {
      const cs = getComputedStyle(cur);
      if (cs.position === 'sticky' || cs.position === 'fixed') { cur.remove(); break; }
      cur = cur.parentElement;
    }
  }
`;

// Reach plc (BristolLive, LiverpoolEcho) ad infrastructure. The Primis
// floating-video player spawns a constellation of sibling slot ids that
// must all go, and `.Gutter_gutter__*` is the skin wallpaper.
const REACH_PLC_SELECTORS = [
  '[id^="primis_player"]', '#imaSlotContainer', '#layoutContainerDiv',
  '#layoutDesign', '#adContainerDiv', '#adVpaid', '#slotContainer',
  '#sekindoVpaidIframe', '#adIma', '#adDisplayBanner',
  '#displayBannerSlotContainer',
  '[class*="Gutter_gutter"]',
];

// Per-slug overrides keyed by the slug argument. Selectors are confirmed
// by `--inspect <slug> <url>`; keep them specific so editorial content
// stays intact.
const SITE_OVERRIDES = {
  'asurion.com': {
    selectors: ['iframe#_si_widget_iframe'],
  },
  'bristolpost.co.uk': {
    selectors: REACH_PLC_SELECTORS,
    js: KILL_STICKY_PARENT('iframe[id^="google_ads_iframe"]'),
  },
  'entrepreneur.com': {
    selectors: [
      '#top_leaderboard',
      '#anchorcontainer',
      '#skinplacement',
      '#hs-web-interactives-top-anchor',
      '#hs-interactives-modal-overlay',
    ],
    // The top ad's slate-bg wrapper is the parent of #top_leaderboard.
    // Remove it so it doesn't leave an empty strip.
    js: `
      const top = document.getElementById('top_leaderboard');
      if (top && top.parentElement) top.parentElement.remove();
    `,
  },
  'fortune.com': {
    selectors: ['.leaderboard-ad-wrapper-parent'],
  },
  'liverpoolecho.co.uk': {
    selectors: [
      ...REACH_PLC_SELECTORS,
      '#ayads-html', '#ayads-dv-div', '#sublime-iframe-container',
      '.celtra-banner',
    ],
    js: KILL_STICKY_PARENT('iframe[id^="google_ads_iframe"]'),
  },
  'smh.com.au': {
    // The wrapper persists with an "Advertisement" label even when the
    // adspot child is gone, so we also sweep any near-top sticky whose
    // visible text is just "Advertisement".
    selectors: ['[id^="adspot-"]', '[class~="adWrapper"]'],
    js: `
      ${KILL_STICKY_PARENT('[id^="adspot-"], [class~="adWrapper"]')}
      for (const el of document.body.querySelectorAll('div, section, aside')) {
        const cs = getComputedStyle(el);
        if (cs.position !== 'sticky' && cs.position !== 'fixed') continue;
        const r = el.getBoundingClientRect();
        if (r.top > 100 || r.height < 100) continue;
        const text = (el.innerText || '').trim();
        if (text === 'Advertisement' || (text === '' && r.height < 320)) el.remove();
      }
    `,
  },
  'vogue.de': {
    selectors: [
      '[class*="AdsSpacer"]',
      '[class*="StickyHeroAdWrapper"]',
      '[class*="AdWrapper"][class*="ad--hero"]',
    ],
  },
};

function overrideScript(slug) {
  const o = SITE_OVERRIDES[slug];
  if (!o) return '';
  const sels = JSON.stringify(o.selectors || []);
  const extra = o.js || '';
  return `
    (() => {
      const sels = ${sels};
      for (const sel of sels) {
        try { document.querySelectorAll(sel).forEach(el => el.remove()); } catch {}
      }
      try { ${extra} } catch (e) { console.warn('override JS failed', e); }
    })();
  `;
}

// Persistent CSS injected at document start so late-mounted overrides
// (e.g. chat widgets that mount after our poll loop) stay hidden.
function overrideCss(slug) {
  const o = SITE_OVERRIDES[slug];
  if (!o || !o.selectors || !o.selectors.length) return '';
  const rule = o.selectors.join(', ');
  return `${rule} { display: none !important; visibility: hidden !important; }`;
}

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

// Dumps a flat list of every reasonably-sized fixed/sticky/absolute element
// on the page so the caller can write targeted overrides. Runs after the
// generic banner-killer so consent dialogs don't drown out the actual ads.
const INSPECT_SCRIPT = `
(() => {
  const results = [];
  // Pass A: ad/iframe markers anywhere in the doc.
  const AD_HINTS = [
    'iframe[id*="google_ads" i]', 'iframe[name*="google_ads" i]',
    'iframe[src*="doubleclick" i]', 'iframe[src*="googlesyndication" i]',
    'iframe[id*="ad" i]', 'iframe[title*="advert" i]',
    '[id*="div-gpt-ad" i]', '[id*="google_ads_iframe" i]',
    '[id*="ad-" i]', '[id^="ad_" i]', '[class*="ad-slot" i]',
    '[class*="advertisement" i]', '[data-ad-unit]', '[data-ad-position]',
    '[data-google-query-id]', '[data-name="ad" i]',
  ];
  const seen = new Set();
  for (const sel of AD_HINTS) {
    let nodes;
    try { nodes = document.querySelectorAll(sel); } catch { continue; }
    for (const n of nodes) {
      // Walk up to the visible container (the "slot").
      let cur = n;
      let bestParent = n;
      while (cur && cur !== document.body) {
        const r = cur.getBoundingClientRect();
        if (r.width >= 200 && r.height >= 40) bestParent = cur;
        cur = cur.parentElement;
      }
      if (seen.has(bestParent)) continue;
      seen.add(bestParent);
      const r = bestParent.getBoundingClientRect();
      if (r.width < 40 || r.height < 20) continue;
      const cs = getComputedStyle(bestParent);
      const id = bestParent.id || '';
      const cls = (typeof bestParent.className === 'string' ? bestParent.className : '').slice(0, 200);
      const text = (bestParent.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 100);
      results.push({
        match: sel,
        tag: bestParent.tagName.toLowerCase(),
        id, cls,
        pos: cs.position,
        x: Math.round(r.x), y: Math.round(r.y),
        w: Math.round(r.width), h: Math.round(r.height),
        z: cs.zIndex,
        text,
      });
    }
  }
  // Pass B: positioned overlays (existing behavior).
  const all = document.querySelectorAll('div, section, aside, header, footer, dialog, ins, iframe');
  for (const el of all) {
    const cs = getComputedStyle(el);
    const pos = cs.position;
    if (pos !== 'fixed' && pos !== 'sticky' && pos !== 'absolute') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 80 || r.height < 40) continue;
    if (r.bottom < 0 || r.top > window.innerHeight + 200) continue;
    // Skip the page-shell wrappers (nav, header). Only flag things plausibly noise.
    if (el.tagName === 'NAV') continue;
    const id = el.id || '';
    const cls = (typeof el.className === 'string' ? el.className : '').slice(0, 200);
    const text = (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 120);
    results.push({
      match: 'overlay',
      tag: el.tagName.toLowerCase(),
      id,
      cls,
      pos,
      x: Math.round(r.x), y: Math.round(r.y),
      w: Math.round(r.width), h: Math.round(r.height),
      z: cs.zIndex,
      text,
    });
  }
  return results;
})();
`;

async function inspectOne(slug, url) {
  const { ws, targetId } = await openTarget();
  const cdp = new CDP(ws);
  try {
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false,
    });
    await cdp.send('Network.setUserAgentOverride', {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      acceptLanguage: 'en-US,en;q=0.9',
      platform: 'MacIntel',
    });
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: STEALTH_INIT });

    const navigated = Promise.race([
      cdp.once('Page.loadEventFired'),
      sleep(NAV_TIMEOUT_MS).then(() => null),
    ]);
    await cdp.send('Page.navigate', { url });
    await navigated;
    await sleep(HYDRATION_WAIT_MS);
    // Knock out consent banners first so they don't drown the listing.
    await cdp.send('Runtime.evaluate', { expression: KILL_BANNERS });
    await sleep(POLL_KILL_INTERVAL_MS);

    // Pass C-alt: every element fully within top viewport (0 <= top, bottom <= 600)
    // and small enough that it's a real card/section, not a wrapper.
    const blocks = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const out = [];
          for (const el of document.body.querySelectorAll('div, section, aside, article, header, figure, a, ins')) {
            const r = el.getBoundingClientRect();
            if (r.top < 0 || r.bottom > 700) continue;
            if (r.width < 400 || r.height < 60) continue;
            if (r.height > 500) continue;
            const cs = getComputedStyle(el);
            const cls = (typeof el.className === 'string' ? el.className : '').slice(0, 120);
            const text = (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
            out.push({
              tag: el.tagName.toLowerCase(), id: el.id || '', cls, pos: cs.position,
              w: Math.round(r.width), h: Math.round(r.height),
              x: Math.round(r.x), y: Math.round(r.y),
              text,
            });
            if (out.length > 40) break;
          }
          return out;
        })();
      `,
      returnByValue: true,
    });
    const blks = blocks.result?.value || [];
    console.log(`\n  -- top-viewport static blocks (${blks.length}) --`);
    for (const b of blks) {
      console.log(`    <${b.tag}> ${b.pos} ${b.w}x${b.h} @(${b.x},${b.y}) id="${b.id}" cls="${b.cls}"` + (b.text ? ` text="${b.text}"` : ''));
    }

    // Pass C: every iframe + every <ins> (DFP) in the top viewport.
    const adFrames = await cdp.send('Runtime.evaluate', {
      expression: `
        (() => {
          const out = [];
          const nodes = document.querySelectorAll('iframe, ins, [data-ad-name], [data-ad-position], [data-ad-unit], [data-google-query-id]');
          for (const el of nodes) {
            const r = el.getBoundingClientRect();
            if (r.bottom < 0 || r.top > 720) continue;
            if (r.width < 40 || r.height < 20) continue;
            // Walk up to a meaningful "slot" wrapper.
            let cur = el.parentElement;
            const chain = [];
            for (let i = 0; i < 6 && cur && cur !== document.body; i++) {
              const cr = cur.getBoundingClientRect();
              const cs = getComputedStyle(cur);
              chain.push({
                tag: cur.tagName.toLowerCase(),
                id: cur.id || '',
                cls: (typeof cur.className === 'string' ? cur.className : '').slice(0, 120),
                pos: cs.position,
                w: Math.round(cr.width), h: Math.round(cr.height),
              });
              cur = cur.parentElement;
            }
            out.push({
              tag: el.tagName.toLowerCase(),
              id: el.id || '',
              name: el.getAttribute('name') || '',
              src: (el.getAttribute('src') || '').slice(0, 80),
              title: el.getAttribute('title') || '',
              w: Math.round(r.width), h: Math.round(r.height),
              x: Math.round(r.x), y: Math.round(r.y),
              chain,
            });
          }
          return out;
        })();
      `,
      returnByValue: true,
    });
    const frames = adFrames.result?.value || [];
    console.log(`\n  -- iframes/ins in top viewport (${frames.length}) --`);
    for (const f of frames) {
      console.log(`    <${f.tag}> ${f.w}x${f.h} @(${f.x},${f.y}) id="${f.id}" name="${f.name}" src="${f.src}" title="${f.title}"`);
      for (const c of f.chain) {
        console.log(`      ↑ <${c.tag}> ${c.pos} ${c.w}x${c.h} id="${c.id}" cls="${c.cls}"`);
      }
    }

    const res = await cdp.send('Runtime.evaluate', {
      expression: INSPECT_SCRIPT,
      returnByValue: true,
    });
    const items = res.result?.value || [];
    console.log(`\n=== ${slug} (${items.length} overlay candidates) ===`);
    for (const it of items) {
      console.log(
        `  [${it.tag}] ${it.match} ${it.pos} ${it.w}x${it.h} @(${it.x},${it.y}) z=${it.z}` +
        `\n    id="${it.id}" cls="${it.cls}"` +
        (it.text ? `\n    text="${it.text}"` : '')
      );
    }
    return true;
  } catch (err) {
    console.error(`  ✗ ${err.message || err}`);
    return false;
  } finally {
    ws.close();
    await closeTarget(targetId);
  }
}

async function captureOne(slug, url, { debug = false } = {}) {
  const overrideEntry = SITE_OVERRIDES[slug];
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
    // Realistic UA. Drop the "Headless" token that Chrome adds in
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
    const slugCss = overrideCss(slug);
    await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `
        (() => {
          const insertCSS = () => {
            if (document.getElementById('__sc_kill_css__')) return;
            const head = document.head || document.documentElement;
            const s = document.createElement('style');
            s.id = '__sc_kill_css__';
            s.textContent = ${JSON.stringify(KILL_CSS + '\n' + slugCss)};
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

    // Many sites lazy-mount consent modals or chat widgets after load,
    // so the kill pass runs in a short poll loop.
    await sleep(HYDRATION_WAIT_MS);
    const override = overrideScript(slug);
    for (let i = 0; i < POLL_KILL_ROUNDS; i++) {
      await cdp.send('Runtime.evaluate', { expression: KILL_BANNERS });
      if (override) await cdp.send('Runtime.evaluate', { expression: override });
      if (i < POLL_KILL_ROUNDS - 1) await sleep(POLL_KILL_INTERVAL_MS);
    }
    await sleep(POST_KILL_WAIT_MS);

    if (debug && overrideEntry) {
      const probe = await cdp.send('Runtime.evaluate', {
        expression: `
          (() => {
            const sels = ${JSON.stringify(overrideEntry.selectors || [])};
            return sels.map(sel => {
              const n = document.querySelectorAll(sel).length;
              if (!n) return sel + ' = 0';
              const first = document.querySelector(sel);
              const r = first.getBoundingClientRect();
              const cs = getComputedStyle(first);
              return sel + ' = ' + n + ' (display=' + cs.display + ' vis=' + cs.visibility + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ')';
            }).join('\\n  ');
          })();
        `,
        returnByValue: true,
      });
      if (probe.result?.value) console.log('  override probe:\n  ' + probe.result.value);
    }

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
  const flags = new Set(process.argv.slice(2).filter(a => a.startsWith('--')));
  const argv = process.argv.slice(2).filter(a => !a.startsWith('--'));
  const keep = flags.has('--keep');
  const inspect = flags.has('--inspect');
  const debug = flags.has('--debug');

  if (argv.length === 0 || argv.length % 2 !== 0) {
    console.error('usage: node scripts/capture-screenshots.mjs [--inspect] [--debug] [--keep] <slug> <url> [<slug> <url> ...]');
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
      const success = inspect ? await inspectOne(slug, url) : await captureOne(slug, url, { debug });
      if (success) ok++;
      else fail++;
    }
  } finally {
    if (!keep) await killChrome();
  }

  console.log(`\n${ok} ${inspect ? 'inspected' : 'captured'}, ${fail} failed.`);
  if (fail > 0) process.exit(1);
}

main().catch(async err => {
  console.error(err);
  await killChrome().catch(() => {});
  process.exit(1);
});
