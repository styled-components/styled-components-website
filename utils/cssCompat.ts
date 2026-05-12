// CSS feature compatibility matrix for styled-components v6 vs v7.
//
// Each entry is a hand-authored annotation describing how the feature behaves
// in styled-components specifically. Browser-support data (when relevant) is
// joined from caniuse-lite at build time via `loadCompatMatrix()`.

export type Support = 'yes' | 'partial' | 'no';

export type Category =
  | 'selectors'
  | 'at-rules'
  | 'functions'
  | 'units'
  | 'colors'
  | 'layout'
  | 'animation'
  | 'props'
  | 'other';

export interface CompatEntry {
  /** Stable identifier used as React key and URL fragment. */
  id: string;
  /** Display title. Falls back to caniuse title if omitted and caniuseId set. */
  title: string;
  category: Category;
  /** Optional caniuse-lite feature id for browser-support enrichment. */
  caniuseId?: string;

  nativeV6: Support;
  nativeV7: Support;
  /** What stock React Native iOS supports without any styled-components polyfill. Defaults to 'no'. */
  iosStock?: Support;
  /** What stock React Native Android supports without any styled-components polyfill. Defaults to 'no'. */
  androidStock?: Support;

  /** One-line description of the SC-specific story. Required. */
  summary: string;
  /** Optional caveats (SSR, RSC, platform limits, plugin-required, etc.). */
  caveats?: string[];
  /** Open PR URLs that, when merged, would lift a 'no' cell into 'yes' / 'partial'. Keyed by column. */
  prUrls?: {
    v6?: string;
    v7?: string;
    ios?: string;
    android?: string;
  };
}

/**
 * The hand-authored matrix. Ordered for editorial flow; the renderer sorts
 * alphabetically by title at render time.
 */
export const COMPAT_ENTRIES: CompatEntry[] = [
  {
    id: 'nesting',
    title: 'CSS Nesting',
    category: 'at-rules',
    caniuseId: 'css-nesting',
    nativeV6: 'partial',
    nativeV7: 'yes',
    summary:
      'v6 preprocesses nesting through stylis before the browser sees it; v7 hands native CSS Nesting to the browser when targets support it.',
    caveats: [
      'On React Native, v7 resolves nested rules through the in-house engine; v6 only flattened simple ampersand cases.',
      'Always anchor pseudo-states with `&:hover`, never `:hover`. Stylis (v6) and the v7 parser both treat bare pseudos as descendant selectors.',
    ],
  },
  {
    id: 'has',
    title: ':has() relational selector',
    category: 'selectors',
    caniuseId: 'css-has',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      "On web, v6 had selector-list recursion bugs when commas appeared inside `:has(...)`; v7's parser handles arbitrary nesting and comma-split arms correctly. On React Native, v7 implements the `<simple>` argument grammar: `&:has(${StyledComponent})` (descendant match by component reference) and `&:has([attr])` / `&:has([attr=value i])` (any attribute operator, including the case-insensitive flag).",
    caveats: [
      'Complex inner arguments — compound selectors, pseudo-classes (`:has(:hover)`), combinators (`:has(.a .b)`), and selector lists (`:has(.a, .b)`) — are not implemented on native and warn in dev. The browser-side spec form is `<relative-selector-list>`, much broader.',
      "Match scope is the element's own descendant subtree per spec (no preceding-sibling matching without combinators).",
    ],
  },
  {
    id: 'is-where',
    title: ':is() / :where()',
    category: 'selectors',
    caniuseId: 'css-matches-pseudo',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v6 leaked nested-rule tokens into the wrong arm when selectors contained commas inside :is(...) / :where(...). v7 compiles each arm independently.',
    caveats: ['On native v7, :is() and :where() apply the rule to each listed state (e.g. `&:is(:hover, :focus)`).'],
  },
  {
    id: 'container-queries',
    title: '@container size queries',
    category: 'at-rules',
    caniuseId: 'css-container-queries',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v6 passed @container through to the browser on web only. v7 implements container queries against React Native ancestor containers as well.',
    caveats: [
      'An element with `container-type` cannot match its own `@container` query. Set it on a parent.',
      'Container-query units (cqw, cqh, cqmin, cqmax) are part of this support story.',
    ],
  },
  {
    id: 'starting-style',
    title: '@starting-style',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v6 stylis treated `@starting-style` as an unknown at-rule and could mangle nested declarations. v7 recognises it and runs first-mount enter animations on React Native via the default `Animated`-based adapter. No reanimated opt-in required.',
    caveats: ['No caniuse entry yet; check the spec status before relying on it in old browsers.'],
  },
  {
    id: 'scope',
    title: '@scope',
    category: 'at-rules',
    caniuseId: 'css-cascade-scope',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      "v6 stylis sometimes swallowed @scope or flattened its donut shape. v7's in-house parser keeps @scope intact and lets the browser handle the cascade.",
    caveats: ['React Native does not implement @scope on either version.'],
  },
  {
    id: 'property',
    title: '@property (registered custom props)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Both versions pass @property through. The catch is animation: a CSS custom property only eases between values (e.g. between two oklch colors) once it is registered with a `<color>` syntax and an initial-value.',
    caveats: [
      'Put @property declarations in `createGlobalStyle` so they live on the document and survive SSR.',
      'Web-only. React Native does not have CSSOM custom properties to register.',
    ],
  },
  {
    id: 'cascade-layers',
    title: '@layer cascade layers',
    category: 'at-rules',
    caniuseId: 'css-cascade-layers',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Cascade layers compose cleanly with styled-components on web in both versions. RN has no cascade, so the at-rule is ignored on native.',
  },
  {
    id: 'color-mix',
    title: 'color-mix()',
    category: 'colors',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'v6 passed color-mix() through on web only. v7 resolves color-mix() during native style resolution and converts back to sRGB for display. Stock RN has no color-mix parser.',
    caveats: ['Specify the interpolation space explicitly (e.g. `in oklab`) for predictable cross-platform results.'],
  },
  {
    id: 'oklch-oklab',
    title: 'oklch() / oklab() / lch() / lab()',
    category: 'colors',
    caniuseId: 'css-lch-lab',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Modern color functions pass through on web in both versions. v7 also resolves them to sRGB on React Native, gamut-mapping wide-gamut inputs while preserving hue. Stock RN's `normalize-colors` only recognises hex / rgb / hsl / hwb — oklch / oklab / lch / lab are not handled. v7 also supports CSS Color 5 relative-color syntax (`oklch(from <base> <l-expr> <c-expr> <h-expr>)`) for all four modern spaces, with channel keywords (`l`, `c`, `h`, `a`, `b`, `alpha`) usable inside `calc()`. Literal bases (hex / named / nested color function) fold at compile time; theme-token bases re-fold at render time when the token resolves.",
    caveats: [
      'Percent channels follow CSS Color L4 ranges: `lab(50% 0 0)` is mid-gray.',
      'Relative-color is only implemented for the four modern spaces (`oklch` / `oklab` / `lch` / `lab`). `rgb()` / `hsl()` / `hwb()` relative forms are not folded — use the modern-space variants.',
    ],
  },
  {
    id: 'light-dark',
    title: 'light-dark() / CSS system colors',
    category: 'colors',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. v7 evaluates `light-dark()` on React Native by reading `Appearance.getColorScheme()`. Stock RN has no `light-dark` parser in `normalize-colors`. v7 additionally folds the CSS Color 4 system-color keywords (`canvas`, `canvastext`, `field`, `fieldtext`, `graytext`, `highlight`, `highlighttext`, `linktext`, `visitedtext`, `activetext`) into platform-appropriate `light-dark(<lightHex>, <darkHex>)` expressions at compile time, then resolves the active scheme at render time.',
    caveats: [
      'The system-color fold covers the 10 most common author-facing keywords; the wider CSS UI / Forms keywords (`ButtonFace`, `Mark`, `AccentColor`, `SelectedItem`, etc.) are not folded and pass through unchanged.',
    ],
  },
  {
    id: 'viewport-units-dvh',
    title: 'Dynamic viewport units (dvh / svh / lvh / dvw)',
    category: 'units',
    caniuseId: 'viewport-units',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Dynamic viewport units pass through on web. v7 resolves them against the React Native window and re-resolves on orientation change. Stock RN does not recognise these as dimension values. The four variants (default v*, sv*, lv*, dv*) collapse to a single value on RN since there is no URL-bar surface.',
  },
  {
    id: 'cq-units',
    title: 'Container-query units (cqw / cqh / cqmin / cqmax)',
    category: 'units',
    caniuseId: 'css-container-query-units',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'v7 wires container-query units up to the nearest ancestor container on React Native. Stock RN does not recognise these as dimension values. When a container is pending first measurement, the declaration drops for one frame.',
  },
  {
    id: 'math-functions',
    title: 'calc() / clamp() / min() / max()',
    category: 'functions',
    caniuseId: 'css-math-functions',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/56162',
      android: 'https://github.com/facebook/react-native/pull/56162',
    },
    summary:
      'v7 evaluates the static arms of math functions at compile time and re-evaluates dynamic arms at render. v6 supported only fully-static cases on native. Beyond `calc()` / `clamp()` / `min()` / `max()`, v7 implements the CSS Values 4 Math L4 step family (`round()` with `nearest` / `up` / `down` / `to-zero` strategies, `mod()`, `rem()`), trig (`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`), exponential (`pow`, `sqrt`, `hypot`, `log`, `exp`), and sign (`abs`, `sign`). Math constants `pi` and `e` are recognised. An upstream Callstack PR wires Yoga dynamic-value resolution into stock React Native for layout properties (dimensions, min/max, flex-basis, gap, position, margin, padding).',
    caveats: [
      'CSS Values 4 §10.7 keywords `infinity`, `-infinity`, and `NaN` are valid CSS but cannot be represented in RN dimensions — v7 emits a dev-warn and drops the declaration. Use a large literal or viewport unit instead.',
      'All math functions compose inside `calc()`. A function whose every argument resolves to a static numeric folds at compile time; if any sub-expression contains viewport units, container units, theme-token sentinels, or `var()`, the whole expression re-resolves at render time.',
    ],
  },
  {
    id: 'logical-props',
    title: 'Logical properties (margin-inline, padding-block, …)',
    category: 'props',
    caniuseId: 'css-logical-props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Full logical-property support on React Native in v7, including `-start` / `-end` longhands across margin, padding, border-color, border-width, border-inline, and border-block (see the dedicated `border-inline / border-block` entry). The first-party RTL plugin handles physical-property mirroring; logical properties are already direction-agnostic.',
    caveats: [
      'Stock RN supports `marginStart` / `paddingEnd` style keys; the `inset-inline` shorthand family arrived with the New Architecture (0.76+).',
    ],
  },
  {
    id: 'border-logical',
    title: 'border-inline / border-block (logical border longhands + shorthands)',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'v7 registers 24 handlers covering every authoring-spec form: per-edge `border-{inline,block}-{start,end}-{color,width,style}` longhands, axis shorthands (`border-inline-color`, `border-block-width`, etc.), per-edge composite shorthands (`border-inline-start: 1px solid red`), and the two whole-axis composites (`border-inline`, `border-block`). Under horizontal-tb writing mode, inline edges map to `borderStart*` / `borderEnd*` and block edges map to `borderTop*` / `borderBottom*`.',
    caveats: [
      'Stock RN 0.85 only registers a subset of the spec keys: `borderStart*Color/Width`, `borderEnd*Color/Width`, and the block-axis `borderBlockColor` family. The newer `borderInline*` and `borderBlock*Width` names are not stock-RN keys — v7 maps them onto the legacy `borderStart/End/Top/Bottom*` keys so authoring against the spec works regardless.',
      'Per-edge `border-style` is not supported on native (RN has a single whole-element `borderStyle`); v7 emits a one-time dev-warn and drops per-edge styles. The element-level `border-style` still works.',
    ],
  },
  {
    id: 'attr-selectors',
    title: 'Attribute selectors ([aria-pressed], [data-state="open"])',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 implements the full Selectors 4 §6 attribute grammar on React Native: presence (`&[attr]`), exact-match (`&[attr=value]`), word (`~=`), prefix (`|=`), starts-with (`^=`), ends-with (`$=`), substring (`*=`), and the `i` / `s` case-sensitivity flags. Compound brackets chain with AND semantics (`&[a][b]`), and a trailing pseudo-state attaches (`&[a]:active`). Boolean coercion means `aria-pressed={true}` and `aria-pressed="true"` both match.',
  },
  {
    id: 'line-clamp',
    title: 'line-clamp',
    category: 'props',
    caniuseId: 'css-line-clamp',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web (`-webkit-line-clamp` and the standard `line-clamp` both work on Chromium / WebKit / Firefox 68+). Stock React Native has no `lineClamp` style key; the equivalent is the `numberOfLines` prop on `<Text>` paired with `ellipsizeMode`. v7 polyfills `line-clamp: N` by lifting `numberOfLines: N` as a top-level prop on `<Text>` so the same template works on both targets.',
  },
  {
    id: 'filter',
    title: 'filter: blur() / saturate() / drop-shadow() / …',
    category: 'props',
    caniuseId: 'css-filters',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock RN 0.76+ accepts the `filter` CSS string at the ABI; v7 wires v6-style template syntax to that surface. On iOS Fabric (default), only `brightness` and `opacity` apply — `blur`, `grayscale`, `saturate`, `contrast`, `hue-rotate`, and `drop-shadow` are gated behind `enableSwiftUIBasedFilters` (defaults FALSE in 0.85 / 0.86-rc.0). `invert` and `sepia` are accepted at the ABI but never applied on iOS. On Android, color-matrix filters (brightness, contrast, grayscale, sepia, saturate, hue-rotate, invert, opacity) work on minSdk 24+; `blur` and `drop-shadow` require API 31+ (Android 12).',
    caveats: [
      'iOS SwiftUI filter opt-in: set `ReactNativeReleaseLevel` to `experimental` in Info.plist (or `ios.infoPlist` in Expo).',
    ],
  },
  {
    id: 'clip-path',
    title: 'clip-path',
    category: 'props',
    caniuseId: 'css-clip-path',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/54700',
      android: 'https://github.com/facebook/react-native/pull/54701',
    },
    summary:
      'Web pass-through in both versions. Stock React Native does not implement `clip-path` on either platform; a Callstack PR trio is in flight (one JS, one iOS, one Android) covering `inset()`, `circle()`, `ellipse()`, `polygon()`, `rect()`, `xywh()`, plus the reference-box keywords.',
  },
  {
    id: 'gradients',
    title: 'linear-gradient() / radial-gradient() / conic-gradient()',
    category: 'colors',
    caniuseId: 'css-gradients',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock RN 0.76+ accepts `linear-gradient()` and (0.80+) `radial-gradient()` at the ABI under the `experimental_backgroundImage` key (plus their `repeating-*` variants on the same release windows). v7 emits both `experimental_*` and standard keys so the same template works on RN and react-native-web; the `experimental_` prefix has not been removed in main. Conic gradients are a different story: stock RN has zero `conic-gradient` references on either platform and no PR is in flight, so on native v7 forwards the string but it does not paint. v6 dropped all gradient strings on native.',
    caveats: [
      'Linear / radial: web pass-through plus native paint via `experimental_backgroundImage`.',
      'Conic: web-only. Approximate on native with a layered radial-gradient + image mask, or use `react-native-skia` for true sweep painting.',
      'A separate Callstack three-PR series adds `url()` value support for raster images (tracked in the `background-image: url()` row).',
    ],
  },
  {
    id: 'mix-blend-mode',
    title: 'mix-blend-mode',
    category: 'props',
    caniuseId: 'css-mixblendmode',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'partial',
    summary:
      'v7 passes mix-blend-mode to native. iOS Fabric handles all 16 non-Normal blend modes. Android requires API 29+ (Android 10): `BlendModeHelper.parseMixBlendMode` returns null below Android 10, so the prop is silently dropped on the 5 lowest API levels (24-28) RN supports.',
    caveats: [
      'Gamma-sensitive modes (color-burn, soft-light, overlay, hard-light) appear more saturated than on web because iOS Core Animation and Android Skia blend in linear-light on Display P3 devices.',
      'On react-native-web, `View.js` defaults to `position: relative; z-index: 0`, making every View a stacking context. Override the parent with `z-index: auto` so blends reach the intended backdrop.',
    ],
  },
  {
    id: 'background-blend-mode',
    title: 'background-blend-mode',
    category: 'props',
    caniuseId: 'css-backgroundblendmode',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'v7 polyfills background-blend-mode on native by rewriting `background-image` + `background-blend-mode` into absolutely-positioned layer Views. Stock RN has no `backgroundBlendMode` style at all. Linear-friendly modes round-trip exactly; gamma-sensitive modes differ slightly on Display P3.',
  },
  {
    id: 'transitions',
    title: 'transition',
    category: 'animation',
    caniuseId: 'css-transitions',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 animates eligible properties on the native thread by default. No setup, no extra import. All CSS easing keywords plus `cubic-bezier()`, `steps()`, `step-start`, `step-end`, and `linear(<stop-list>)` are supported — non-linear curves are sampled into per-frame `outputRange`s for the native driver. Web behaviour is unchanged.',
    caveats: [
      "CSS `ease` maps to the W3C `ease` curve, not React Native's `Easing.ease` (which is `ease-in`). v7 fixes that subtle mismatch.",
      '`prefers-reduced-motion` collapses durations to 0.',
    ],
  },
  {
    id: 'keyframes',
    title: '@keyframes',
    category: 'animation',
    caniuseId: 'css-animation',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      '`@keyframes` runs on native in v7 via the default `Animated`-based adapter. All CSS `animation-direction`, `animation-fill-mode`, `animation-play-state`, `animation-iteration-count`, and `animation-composition` (`replace | add | accumulate` per CSS Animations 2 §4.8) values are supported, plus per-frame easing. The optional reanimated adapter (`styled-components/native/reanimated`) is available for consumers that prefer to drive animations through reanimated instead.',
  },
  {
    id: 'env',
    title: 'env() safe-area-inset',
    category: 'functions',
    caniuseId: 'css-env-function',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'v7 parses `env()` per CSS Environment Variables Level 1 (recognised names, fallbacks, recursive fallback substitution). Safe-area insets currently resolve to 0 on React Native; the insets surface is not yet wired to `react-native-safe-area-context`, so `env(safe-area-inset-top, 47px)` returns 0 because recognised names ignore the fallback per spec.',
  },
  {
    id: 'custom-props',
    title: 'CSS Custom Properties (var(--…))',
    category: 'other',
    caniuseId: 'css-variables',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      '`createTheme()` (v6.4+) emits CSS custom properties and works in both client and RSC. On native, tokens are sentinel strings that resolve when interpolated directly into CSS-value positions.',
    caveats: [
      '`ThemeProvider` must receive the raw theme object, not the `createTheme()` output. Passing the output yields self-referential `var(--x, var(--x, fallback))`.',
      'JS arithmetic on tokens silently breaks (`4 + theme.space.md`). Use `calc()` instead.',
    ],
  },
  {
    id: 'matrix-transform',
    title: 'transform: matrix() / matrix3d()',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "Stock RN's `processTransform.js` accepts `matrix()` only with 16 or 9 numbers; the spec-canonical 6-number 2D `matrix(a,b,c,d,e,f)` fails validation, and `matrix3d` is rejected entirely as an unknown key. v7 normalizes both forms to the 16-number array spec. Bare numbers in `translateX(10)` are treated as `10px` instead of failing to parse. On react-native-web, v7 emits `matrix()` as `matrix3d()` so browsers preserve 3D context.",
  },
  {
    id: 'transform-skew',
    title: 'transform: skewX() / skewY()',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'no',
    prUrls: {
      android: 'https://github.com/facebook/react-native/pull/56724',
    },
    summary:
      'iOS renders skew correctly via `CATransform3D` in both stock RN and through v6 / v7. On Android, the matrix-decomposition path silently drops the shear, so views render as rotated rectangles instead of true parallelograms. An upstream Android-only fix wires the affine matrix through `View.setAnimationMatrix` on API 29+ and threads hit-testing through it as well.',
  },
  {
    id: 'media-aspect-ratio',
    title: '@media (aspect-ratio: …)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 evaluates aspect-ratio media queries against the device window. Bare-number ratios are treated as `<n>/1` per spec.',
  },
  {
    id: 'flexbox',
    title: 'Flexbox',
    category: 'layout',
    caniuseId: 'flexbox',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: "Pass-through in both versions. React Native's default layout.",
  },
  {
    id: 'grid',
    title: 'CSS Grid',
    category: 'layout',
    caniuseId: 'css-grid',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/55665',
      android: 'https://github.com/facebook/react-native/pull/55665',
    },
    summary:
      'Web-only today. A Meta-internal Yoga + React Native series adds `display: grid` to the layout engine, with grid track types, the grid layout algorithm, and platform bindings landing across a multi-PR sequence; once it merges, stock RN gets `grid-template-columns`, `grid-template-rows`, `grid-area`, and friends on both platforms simultaneously.',
  },
  {
    id: 'subgrid',
    title: 'CSS Subgrid',
    category: 'layout',
    caniuseId: 'css-subgrid',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web in both versions.',
  },
  {
    id: 'position-sticky',
    title: 'position: sticky',
    category: 'layout',
    caniuseId: 'css-sticky',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Web-only. React Native has no equivalent on either version.',
  },
  {
    id: 'position-fixed',
    title: 'position: fixed',
    category: 'layout',
    caniuseId: 'css-fixed',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Web-only.',
  },
  {
    id: 'text-shadow',
    title: 'text-shadow',
    category: 'props',
    caniuseId: 'css-textshadow',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/55289',
      android: 'https://github.com/facebook/react-native/pull/55289',
    },
    summary:
      'Pass-through on web. Stock React Native renders text shadows on both platforms via the three legacy individual style keys (`textShadowOffset`, `textShadowRadius`, `textShadowColor`), but does NOT parse the CSS `text-shadow` shorthand string. v7 polyfills the shorthand by expanding `<offset-x> <offset-y> [<blur>] [<color>]` (any order between the colour and the length triplet) into the three legacy keys. v6 dropped the shorthand. Upstream PR #55289 adds native CSS-shorthand parsing on both platforms (single shadow per node).',
  },
  {
    id: 'text-decoration-style',
    title: 'text-decoration-style',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'no',
    prUrls: {
      android: 'https://github.com/facebook/react-native/pull/56768',
    },
    summary:
      "iOS Fabric maps `text-decoration-style` to `NSUnderlineStyle` and supports `solid`, `double`, `dashed`, `dotted` (for both underline and strikethrough); `wavy` is not in RN's TextDecorationStyle enum and is silently dropped. Android ignores the property entirely; an upstream PR adds full support.",
  },
  {
    id: 'text-decoration-color',
    title: 'text-decoration-color',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'no',
    prUrls: {
      android: 'https://github.com/facebook/react-native/pull/56767',
    },
    summary:
      'iOS already paints the underline / line-through in the requested color, so v6 and v7 pass through and render correctly there. Android currently inherits the text color regardless; an upstream PR adds proper `text-decoration-color` support.',
  },
  {
    id: 'vertical-align',
    title: 'vertical-align',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'yes',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/56774',
    },
    summary:
      'Android honors `vertical-align` on `Text`, `Paragraph`, and multi-line `TextInput` via `textAlignVertical`. iOS has no platform API for vertical alignment of attributed text on either primitive — v7 dev-warns (`native-vertical-align-ios`) when the prop is set on iOS, suggesting wrapping `<Text>` in a `View` with `justify-content` as a workaround. On rn-web, v7 emits an additional `align-content` value (`top → flex-start`, `middle → center`, `bottom → flex-end`) alongside the original `vertical-align` to make box-positioning keywords actually shift the content; baseline-shifting keywords (`baseline | sub | super | text-top | text-bottom | <length>`) flow through unchanged. An upstream PR adds iOS Paragraph + multi-line TextInput support, mirroring Android.',
  },
  {
    id: 'box-shadow',
    title: 'box-shadow (incl. inset, spread)',
    category: 'props',
    caniuseId: 'css-boxshadow',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'v7 round-trips full `box-shadow` syntax on native, including spread and inset. RN 0.76+ accepts the same CSS-string syntax directly via the New Architecture; v6 only handled a subset of the legacy `shadow*` / `elevation` props.',
  },
  {
    id: 'backdrop-filter',
    title: 'backdrop-filter',
    category: 'props',
    caniuseId: 'css-backdrop-filter',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web in both versions. React Native does not implement backdrop-filter on either platform. Listed in v7's native limitations.",
  },
  {
    id: 'transforms-3d',
    title: '3D transforms (rotateX, perspective, translateZ)',
    category: 'props',
    caniuseId: 'transforms3d',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock React Native supports `rotateX`, `rotateY`, `rotateZ`, `translateZ`, and per-view `perspective` inside the transform array on both platforms (iOS via Core Animation `CATransform3D`; Android via matrix decomposition). `scaleZ`, `scale3d`, `rotate3d`, and `matrix3d` keywords are silently dropped. `transform-style: preserve-3d` is unimplemented on either platform, so nested 3D children always flatten — multi-face 3D layouts must be hand-built with absolutely-positioned siblings carrying their own `perspective`.',
  },
  {
    id: 'view-transitions',
    title: 'View Transitions',
    category: 'at-rules',
    caniuseId: 'view-transitions',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      "Pass-through on web. Not implemented on React Native — neither stock RN nor v7 has a same-document or cross-document view-transition surface; use `react-native-reanimated`'s shared-element APIs or `LayoutAnimation` for analogous effects.",
  },
  {
    id: 'scroll-snap',
    title: 'scroll-snap-type / scroll-snap-align',
    category: 'props',
    caniuseId: 'css-snappoints',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has its own paged-scroll APIs but does not honour CSS scroll-snap on either version.',
  },
  {
    id: 'focus-visible',
    title: ':focus-visible',
    category: 'selectors',
    caniuseId: 'css-focus-visible',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Pass-through on web. v7 aliases `&:focus-visible` to `&:focus` on React Native so portable code works without branching (no keyboard-focus distinction is available on native).',
  },
  {
    id: 'focus-within',
    title: ':focus-within',
    category: 'selectors',
    caniuseId: 'css-focus-within',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web.',
  },
  {
    id: 'placeholder',
    title: '::placeholder',
    category: 'selectors',
    caniuseId: 'css-placeholder',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web. React Native uses the `placeholderTextColor` prop instead.',
  },
  {
    id: 'form-state',
    title: 'Form-state selectors (:invalid, :required, :read-only)',
    category: 'selectors',
    caniuseId: 'css-in-out-of-range',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: "Pass-through on web. React Native's `TextInput` does not implement form-state pseudos.",
  },
  {
    id: 'combinators',
    title: 'Combinators (descendant, >, +, ~)',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'Pass-through on web in both versions. v7 implements combinators between styled-component references on React Native: descendant (`${Foo} &`), child (`${Foo} > &`), adjacent-sibling (`${Foo} + &`), and general-sibling (`${Foo} ~ &`). The left operand must be a styled-component reference; raw selector strings on the left do not match because they have no published `styledComponentId` to track. Each styled component publishes its position and ancestor chain via a `ParentContext`.',
    caveats: [
      'Non-styled intermediaries (e.g. a user `<View>` between the ancestor and the matched component) are transparent for descendant combinators but break the child combinator chain because they reset the publishing `parentId`.',
      'A non-styled component that renders styled children does not republish ParentContext, so sibling and indexed-position matches reset within its subtree.',
    ],
  },
  {
    id: 'pseudo-hover',
    title: '&:hover',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      "v7 implements `&:hover` on React Native ≥ 0.85 via `Pressable`. Stock RN's Pressable fires hover events ONLY when `ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover` is enabled — the flag defaults to FALSE in 0.85, so without it `Pressable.onHoverIn` / `onHoverOut` return null and no hover styles fire. The pointer infrastructure (iOS `UIHoverGestureRecognizer` for mouse + Apple Pencil on iOS 13+; Android `topPointerEnter` via PointerEventHelper) is fully wired in Fabric. Always anchor with `&`, not bare `:hover` (both versions parse bare `:hover` as a descendant).",
  },
  {
    id: 'pseudo-focus',
    title: '&:focus',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary: "v7 wires `&:focus` to React Native's existing focus surface.",
  },
  {
    id: 'pseudo-pressed',
    title: '&:pressed',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary: 'React-Native-only pseudo on `Pressable`. v7 wires the `Pressable` press state into the CSS.',
  },
  {
    id: 'pseudo-disabled',
    title: '&:disabled',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary: 'v7 implements `&:disabled` on React Native via existing disabled-state surfaces.',
  },
  {
    id: 'pseudo-before-after',
    title: '::before / ::after',
    category: 'selectors',
    caniuseId: 'css-gencontent',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web. Pseudo-elements have no equivalent on React Native.',
  },
  {
    id: 'animation-property',
    title: '@property + animatable custom props',
    category: 'animation',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Register animatable theme tokens with `@property` so `transition: color 300ms` actually eases between values. Custom properties default to type `<string>` which interpolates discretely.',
  },
  {
    id: 'opacity',
    title: 'opacity',
    category: 'props',
    caniuseId: 'css-opacity',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Pass-through everywhere.',
  },
  {
    id: 'border-radius',
    title: 'border-radius',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Pass-through everywhere.',
  },
  {
    id: 'box-sizing',
    title: 'box-sizing',
    category: 'props',
    caniuseId: 'css3-boxsizing',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "React Native used to be border-box-only. Stock RN's Fabric C++ parser now accepts both `border-box` and `content-box` with no feature flag on either platform.",
  },
  {
    id: 'rrggbbaa',
    title: '#rrggbbaa / 8-digit hex',
    category: 'colors',
    caniuseId: 'css-rrggbbaa',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Pass-through everywhere.',
  },
  {
    id: 'tabsize',
    title: 'tab-size',
    category: 'props',
    caniuseId: 'css3-tabsize',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web.',
  },
  {
    id: 'object-fit',
    title: 'object-fit / object-position',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Stock RN 0.85+ registers `objectFit` as a native style key on `<Image>` (fill / contain / cover / scale-down / none). v7 passes the CSS through unchanged. `object-position` has no native equivalent on either platform and is web-only; on native, alignment falls back to the `Image` defaults.',
  },
  {
    id: 'aspect-ratio',
    title: 'aspect-ratio',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Pass-through on web. v7 parses the full CSS Sizing 4 grammar — bare ratio (`1.5` or `16 / 9`), `auto`, and the two-value `auto <ratio>` form — and emits the numeric ratio to RN. Stock RN 0.85 reliably accepts only the unitless number form natively; the CSS-string slash form requires `enableNativeCSSParsing` (defaults FALSE in 0.85) so it usually drops without v7. The two-value form is dropped silently on stock RN. v6 only handled the number form.',
    caveats: [
      'The `auto` half of `auto <ratio>` is only meaningful on replaced elements (`<Image>`) where it falls back to the intrinsic size when missing; on regular views it is a no-op, and v7 dev-warns once (`native-aspect-ratio-auto-intrinsic`).',
    ],
  },
  {
    id: 'gap',
    title: 'gap / row-gap / column-gap',
    category: 'layout',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Pass-through on web. React Native added gap in 0.71 (percent values in 0.75+); v7 routes it through.',
  },
  {
    id: 'cursor',
    title: 'cursor',
    category: 'props',
    caniuseId: 'css3-cursors',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'no',
    summary:
      'Pass-through on web; flows through on `react-native-web`. iOS Fabric only honours the `pointer` keyword (via `UIHoverAutomaticEffect` on iOS 17+); the 30+ other Cursor enum values (Crosshair, Move, Grab, Help, etc.) parse but have no rendering. iOS < 17 ignores the property entirely. Android has no `cursor` consumer on either renderer.',
  },
  {
    id: 'isolation',
    title: 'isolation',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'no',
    summary:
      'Required for predictable stacking contexts when using blend modes on native. Stock RN 0.85+ parses `isolation: auto | isolate` at the ABI; iOS Fabric only contributes to `FormsStackingContext` z-ordering, not a real compositing isolation layer. Android has no `@ReactProp` for `isolation` — the prop is silently dropped, though `BlendModeHelper.needsIsolatedLayer` auto-isolates when child views use `mix-blend-mode`.',
  },
  {
    id: 'nth-child-of-type',
    title: ':nth-child / :nth-of-type',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Covers `:nth-child`, `:nth-of-type`, `:nth-last-child`, `:nth-last-of-type`. v6 stylis miscounted child positions under RSC because injected `<style data-styled>` tags shift the index; v6.4 ships an opt-in `stylisPluginRSC` that rewrites these selectors using the L4 `of S` syntax to exclude SC style tags. v7 emits the same rewrite by default in RSC. On React Native, v7 matches the full `<an+b>` grammar plus `odd` / `even` against the live sibling position published by `ParentContext`. The `<an+b of <selector>>` form (Selectors L4) is not implemented on native.',
    caveats: [
      'On v6 RSC: import `stylisPluginRSC` and pass it to `StyleSheetManager.stylisPlugins`, or fall back to `:nth-of-type()` (universally compatible).',
      '`:nth-child(N of S)` itself needs Chrome 111+, Firefox 113+, Safari 9+.',
      'On native, siblings outside a styled parent that publishes ParentContext do not contribute to the count.',
    ],
  },
  {
    id: 'first-last-only-child',
    title: ':first-child / :last-child / :only-child',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Same RSC child-index shift as :nth-child(): inline `<style data-styled>` tags break first/last/only counts under v6 unless `stylisPluginRSC` is wired up. v7 rewrites them automatically. On React Native, v7 evaluates them against the live `ParentContext` sibling index.',
    caveats: ['Prefer `:first-of-type` / `:last-of-type` / `:only-of-type` if `stylisPluginRSC` is not available.'],
  },
  {
    id: 'first-last-only-of-type',
    title: ':first-of-type / :last-of-type / :only-of-type',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Type-scoped structural pseudos are unaffected by injected `<style data-styled>` tags, since style elements are a different element type. Universally compatible alternative to the child-index family under RSC on both versions. On native, v7 evaluates them against the per-type sibling index published by `ParentContext`.',
  },
  {
    id: 'not',
    title: ':not()',
    category: 'selectors',
    caniuseId: 'css-not-sel-list',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'Single-argument :not() works on both versions on web. The Selectors L4 selector-list form `:not(.a, .b, [c])` tripped v6 stylis when a comma appeared between simple selectors inside the parens (same family of bugs as :is() / :has()); v7 compiles each arm independently. On React Native, v7 implements `:not(<simple>)` for single pseudo-states (`&:not(:hover)`, `&:not(:focus)`, `&:not(:pressed)`, `&:not(:disabled)`) and single attribute selectors with any operator (`&:not([disabled])`, `&:not([href^="https"])`).',
    caveats: [
      'Compound, nested, and selector-list inner arguments are not implemented on native (`:not([a][b])`, `:not(:hover, :focus)`, `:not(.foo .bar)` all warn).',
    ],
  },
  {
    id: 'empty',
    title: ':empty',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web in both versions. React Native has no child-emptiness pseudo on either version.',
  },
  {
    id: 'root',
    title: ':root',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web; commonly used in `createGlobalStyle` to declare custom-property defaults on the document element. React Native has no document root; emit `--*` defaults via `createTheme()` instead.',
    caveats: [
      '`createTheme({ selector: ":root" })` uses this hook by default; override with `":host"` for Shadow DOM.',
    ],
  },
  {
    id: 'checked-enabled-indeterminate',
    title: ':checked / :enabled / :indeterminate / :default',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      "Pass-through on web. React Native's form primitives (`Switch`, `Checkbox` in the new core, `TextInput`) do not expose UI-state pseudo-classes on either version; drive state styling from React props instead.",
  },
  {
    id: 'target',
    title: ':target',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web. React Native has no URL fragment to match against.',
  },
  {
    id: 'link-visited-any-link',
    title: ':link / :visited / :any-link',
    category: 'selectors',
    caniuseId: 'css-any-link',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no anchor or browser history surface to match against; render link affordances from explicit component state instead.',
    caveats: [
      '`:visited` is restricted to a small subset of properties (color family) in modern browsers for privacy.',
    ],
  },
  {
    id: 'selection',
    title: '::selection',
    category: 'selectors',
    caniuseId: 'css-selection',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native exposes the analog as the `selectionColor` prop on `TextInput` (cross-platform; tints handle, cursor, and selection range) and on `Text` (Android-only). No `::selection` pseudo-element on either version.',
  },
  {
    id: 'marker',
    title: '::marker',
    category: 'selectors',
    caniuseId: 'css-marker-pseudo',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no list primitive that exposes a marker pseudo-element; render bullets / numbers as explicit children of the list item.',
  },
  {
    id: 'lang',
    title: ':lang()',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no `lang` attribute inheritance model; switch styles off an explicit locale prop or context instead.',
  },
  {
    id: 'font-family',
    title: 'font-family',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN `fontFamily` is a single platform-font name. v7 reads either a single ident sequence (unquoted multi-word like `Helvetica Neue`), one quoted string, or a generic-family keyword. Comma-separated stacks (`Inter, system-ui, sans-serif`) keep the first family and drop the rest with a one-time dev-warn (`native-font-family-fallbacks-dropped`) since RN has no fallback chain. v6 dropped the whole declaration silently for stacks. Round-trips on web through normal CSS parsing.',
    caveats: [
      'v7 normalises all 13 CSS generic-family keywords (`system-ui`, `ui-sans-serif`, `ui-serif`, `ui-monospace`, `ui-rounded`, `sans-serif`, `serif`, `monospace`, `cursive`, `fantasy`, `emoji`, `math`, `fangsong`) to concrete face names per platform — e.g. `Times New Roman` for serif variants on iOS, `monospace` for mono variants on Android.',
      'iOS Fabric also recognises `system-ui` / `ui-sans-serif` / `ui-serif` / `ui-monospace` / `ui-rounded` natively via `UIFontDescriptorSystemDesign*`. Android has no native generic-keyword handling; unknown names silently fall back to the system default.',
      'Font names are case-sensitive on native; both versions preserve the source casing.',
    ],
  },
  {
    id: 'font-size',
    title: 'font-size',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN `fontSize` is a bare point value. v7 accepts bare numbers and `Npx`, plus full unit resolution at render time for `vh` / `vw` / `dvh` (viewport), `em` / `rem` (font-relative against the cascade), and `lh` / `rlh` (line-height-relative). v6 only handled bare numbers and `px` — `em` and `rem` strings dropped silently on native.',
  },
  {
    id: 'font-weight',
    title: 'font-weight',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "Numeric (`100`–`900`) and the keyword pair (`normal`, `bold`) pass through on both platforms. iOS maps each numeric slot to UIFontWeight internally; Android maps to the nearest installed face. RN's named-weight aliases (`ultralight`, `thin`, `medium`, `semibold`, `heavy`, `black`) are accepted ONLY by the legacy paper bridge on iOS; the Fabric C++ parser used by the New Architecture default (RN 0.85) rejects them and falls back to Regular.",
    caveats: ['`bolder` and `lighter` are resolved on web only; native treats them as `normal`.'],
  },
  {
    id: 'font-style',
    title: 'font-style',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN accepts `normal` and `italic` natively on both platforms. v7 additionally folds `oblique` to italic and gracefully degrades `oblique <angle>` (consume the angle, drop it with a one-time dev-warn, resolve to italic) per CSS Fonts 4. v6 dropped the bare `oblique` declaration entirely. For exact slant control, switch to a slant-axis variable font.',
  },
  {
    id: 'font-variant',
    title: 'font-variant',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'iOS Fabric supports `small-caps`, `oldstyle-nums`, `lining-nums`, `tabular-nums`, `proportional-nums`, and `stylistic-one` through `stylistic-twenty` (mapped to `UIFontFeatureSelector`). Android handles a superset: also the common / discretionary / historical `*-ligatures` pairs (with `no-*` variants) and `contextual` / `no-contextual`, rewritten internally into `fontFeatureSettings`. v6 and v7 both split a space-separated CSS value into the RN array form.',
  },
  {
    id: 'font-feature-settings',
    title: 'font-feature-settings',
    category: 'props',
    caniuseId: 'font-feature',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native does not register `fontFeatureSettings`; the only surface for OpenType features is the `font-variant` keyword set, which Android internally rewrites into `fontFeatureSettings` but does not expose for direct authoring.',
  },
  {
    id: 'font-variation-settings',
    title: 'font-variation-settings',
    category: 'props',
    caniuseId: 'variable-fonts',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native does not expose a variable-font axis surface; variable fonts render at their default axis values unless the consuming app patches a native module.',
  },
  {
    id: 'line-height',
    title: 'line-height',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN `lineHeight` is an absolute point value. Both v6 and v7 accept bare numbers and `Npx`; other CSS lengths (em, rem) are NOT coerced and pass through as raw strings which RN rejects. The CSS unitless-multiplier form (`line-height: 1.5`) is treated as `1.5` points — there is no font-size-relative resolution on native.',
    caveats: [
      'iOS centres glyphs within the line box differently from web when `lineHeight > fontSize`; upstream fix for TextInput is in flight.',
    ],
  },
  {
    id: 'letter-spacing',
    title: 'letter-spacing',
    category: 'props',
    caniuseId: 'css-letter-spacing',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN `letterSpacing` is a bare point value. Both v6 and v7 accept bare numbers and `Npx`; the `em` and `rem` forms do not resolve against the active font-size on native in either version.',
  },
  {
    id: 'word-spacing',
    title: 'word-spacing',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no `wordSpacing` style attribute on either platform; the declaration is silently dropped on native.',
  },
  {
    id: 'text-align',
    title: 'text-align',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Pass-through everywhere. RN accepts `auto | left | right | center | justify` on both platforms. iOS Fabric additionally maps `start` to `TextAlignment::Natural` (locale-aware); Android stock does NOT recognize `start` or `end` and silently falls back to start-aligned. v7 lifts both platforms to spec by resolving `start` / `end` / `match-parent` at render time against the inherited `direction` (`start` → `left` under LTR / `right` under RTL; `end` → the opposite; `match-parent` aliases `start` since RN only supports horizontal-tb).',
    caveats: [
      '`text-align: justify` requires Android 8.0 (API 26) or later on Android.',
      'On rn-web, `start` / `end` / `match-parent` flow to the browser unchanged.',
    ],
  },
  {
    id: 'text-indent',
    title: 'text-indent',
    category: 'props',
    caniuseId: 'css-text-indent',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no `textIndent` style attribute on either platform; first-line indentation is not implemented in the RN text layout pipeline.',
  },
  {
    id: 'text-overflow',
    title: 'text-overflow',
    category: 'props',
    caniuseId: 'text-overflow',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web. Stock React Native has no `textOverflow` style key; v7 also has no handler for it. Use `numberOfLines={N}` with `ellipsizeMode='tail' | 'head' | 'middle' | 'clip'` on the Text component, or `line-clamp: N` which v7 DOES polyfill (see the line-clamp entry).",
  },
  {
    id: 'text-transform',
    title: 'text-transform',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN accepts `none | capitalize | uppercase | lowercase` on both platforms in v6 and v7. The CSS `full-width` and `full-size-kana` keywords are web-only.',
  },
  {
    id: 'white-space',
    title: 'white-space',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no `whiteSpace` style and v7 does NOT polyfill it — the `text-wrap` polyfill registers under the `textWrap` property name only. Use `text-wrap: nowrap` (which IS polyfilled to `numberOfLines: 1`) or pass `numberOfLines={1}` directly. Embedded `\\n` in the source preserves newlines.',
  },
  {
    id: 'word-break-overflow-wrap',
    title: 'word-break / overflow-wrap',
    category: 'props',
    caniuseId: 'word-break',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no `wordBreak` or `overflowWrap` style attributes; long unbroken strings clip at the container edge on both platforms and the declaration is silently dropped.',
  },
  {
    id: 'hyphens',
    title: 'hyphens',
    category: 'props',
    caniuseId: 'css-hyphens',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock Android exposes hyphenation only via the separate Text prop `android_hyphenationFrequency` (`none` / `normal` / `full`); the literal CSS `hyphens` property is silently dropped. v7 maps `hyphens: auto` to `android_hyphenationFrequency: normal`; `manual` and `none` map to `none`. iOS has no programmatic hyphenation control in RN.',
    caveats: [
      'Soft-hyphens (U+00AD) embedded in source text still produce break opportunities on both platforms regardless of the `hyphens` setting.',
    ],
  },
  {
    id: 'direction',
    title: 'direction',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "Pass-through everywhere. React Native exposes `direction` on ViewStyle (`inherit | ltr | rtl`) via Yoga; root-node default tracks the device locale. iOS Text additionally accepts `writingDirection` for paragraph-level reordering. v7's RTL plugin handles physical-property mirroring; logical properties stay direction-agnostic.",
  },
  {
    id: 'writing-mode',
    title: 'writing-mode',
    category: 'props',
    caniuseId: 'css-writing-mode',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Yoga only implements `horizontal-tb`; React Native has no vertical writing-mode support on either platform, so logical inline / block units (`vi`, `vb`) collapse to width / height on native.',
  },
  {
    id: 'display',
    title: 'display',
    category: 'props',
    caniuseId: 'css-display-contents',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock React Native accepts `display: flex` (the default), `display: none`, and `display: contents` (RN 0.77+); v6 and v7 pass those through. Block / inline / inline-block / inline-flex / flow-root are web-only because Yoga has no inline-level box model. CSS Grid is tracked under its own entry.',
    caveats: [
      '`display: contents` removes the Yoga node from layout and hoists its children into the parent — useful for transparent wrapper components.',
      'There is no inline flow on React Native; bare strings must live inside a `Text` primitive.',
    ],
  },
  {
    id: 'z-index',
    title: 'z-index',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "On Fabric the shadow-node `orderIndex_` is set from the `zIndex` prop in the platform-agnostic C++ layer, and the mounting tree is stable-sorted by it before painting on both iOS and Android. Android's `setZIndex` view-manager method is a documented no-op because the C++ ordering already covers it. v6 and v7 both pass through.",
    caveats: [
      "RN's `zIndex` is a unitless integer; v6 and v7 both coerce a CSS number string (`z-index: 5`) down to `Number` before handing it to RN.",
    ],
  },
  {
    id: 'top-right-bottom-left',
    title: 'top / right / bottom / left',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "All four physical edges work on iOS and Android via Yoga. Values follow RN's `DimensionValue` shape: a number, an `Npx` length (stripped to a number), an `N%` percent string, or `auto`. Ems, viewport units, and other CSS lengths are not natively understood. v7 evaluates `calc()` over static arms at compile time; the upstream Callstack PR #56162 would wire Yoga dynamic `calc()` resolution through stock RN.",
  },
  {
    id: 'inset',
    title: 'inset',
    category: 'layout',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock RN 0.72+ accepts `inset`, `inset-block`, and `inset-inline` as single `DimensionValue` keys; the renderer then writes each physical edge. v7 implements the multi-value CSS shorthand (`inset: 10px 20px`) by tokenizing and expanding to per-edge values, so it works on every target. v6 only forwards single-value forms because `css-to-react-native` has no inset transform.',
    caveats: [
      'Multi-value shorthand (`inset: 10px 20px 30px 40px`) only round-trips correctly through v7 on native; v6 forwards it as a string RN cannot parse.',
    ],
  },
  {
    id: 'overflow',
    title: 'overflow',
    category: 'layout',
    caniuseId: 'css-overflow',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "Stock RN accepts only the `overflow` shorthand with values `visible`, `hidden`, and `scroll`. The CSS `auto` and `clip` keywords plus the `overflow-x` / `overflow-y` longhands are not implemented. iOS `UIView`s don't clip by default; Android `ViewGroup`s do, so `overflow: visible` on Android can still be clipped by an ancestor `ScrollView`.",
    caveats: [
      '`overflow: scroll` on a plain `View` does not produce scrollbars; use `ScrollView` for actual scrolling.',
      'For overflow-visible across Android scroll ancestors, hoist the element out or set `collapsable={false}` on the wrapper.',
    ],
  },
  {
    id: 'width-height',
    title: 'width / height',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "React Native's `width` and `height` accept a `DimensionValue`: number (logical pixels), percent string, or `auto`. v6 and v7 both strip the `px` unit and forward the number. Stock RN's Fabric `SizeLength` parser also accepts the CSS keywords `max-content`, `fit-content`, and `stretch`. Only `min-content` is not implemented in Yoga.",
  },
  {
    id: 'min-max-width-height',
    title: 'min/max-width and min/max-height',
    category: 'layout',
    caniuseId: 'intrinsic-width',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'All four bounds work on both platforms via Yoga and accept the same `DimensionValue` shape as `width` / `height` (number, percent string, `auto`, plus the keywords `max-content`, `fit-content`, `stretch`). Only `min-content` is not implemented.',
  },
  {
    id: 'flex-direction',
    title: 'flex-direction',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "Stock RN accepts `row`, `row-reverse`, `column`, and `column-reverse`. React Native's default is `column` (the CSS default is `row`), so port-from-web layouts need an explicit `flex-direction: row` for horizontal flow.",
  },
  {
    id: 'flex-wrap',
    title: 'flex-wrap',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Stock RN accepts `nowrap` (default), `wrap`, and `wrap-reverse`. Pass-through everywhere.',
  },
  {
    id: 'justify-content',
    title: 'justify-content',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Stock RN accepts `flex-start` (default), `flex-end`, `center`, `space-between`, `space-around`, and `space-evenly`. The newer CSS Box Alignment keywords (`start`, `end`, `left`, `right`) are not implemented.',
  },
  {
    id: 'align-items',
    title: 'align-items',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Stock RN accepts `stretch` (default), `flex-start`, `flex-end`, `center`, and `baseline`. The newer `start` / `end` keywords from CSS Box Alignment Level 3 are not implemented.',
  },
  {
    id: 'align-content',
    title: 'align-content',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Stock RN accepts `flex-start` (default), `flex-end`, `center`, `stretch`, `space-between`, `space-around`, and `space-evenly` (the last keyword landed in RN 0.74 with Yoga 3.0).',
  },
  {
    id: 'align-self',
    title: 'align-self',
    category: 'layout',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Stock RN accepts `auto` (default), `flex-start`, `flex-end`, `center`, `stretch`, and `baseline`.',
  },
  {
    id: 'justify-items',
    title: 'justify-items / justify-self',
    category: 'layout',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Neither property is implemented in Yoga (tracked in facebook/yoga#1649). These are grid-era keywords; flexbox uses `justify-content` on the container and has no per-item justification override. Pass-through on web in both versions.',
  },
  {
    id: 'place-content',
    title: 'place-content / place-items / place-self',
    category: 'layout',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'v6 and v7 both expand the `place-content` shorthand to `{ align-content, justify-content }`. v7 also expands `place-items` to `{ align-items, justify-items }` and `place-self` to `{ align-self, justify-self }` per CSS Box Alignment 3 §6/§7. The align axis flows through Yoga on native; the justify axis is silently dropped by RN (Yoga has no `justifyItems` / `justifySelf`) but reaches the browser on rn-web. Self-position keywords (`start | self-start | end | self-end`) normalise to the Yoga `flex-*` enums.',
  },
  {
    id: 'flex-longhands',
    title: 'flex / flex-grow / flex-shrink / flex-basis',
    category: 'layout',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "All three longhands map directly to Yoga. The `flex` shorthand is parsed by both versions: v6 via `css-to-react-native`, v7 via its own parser. React Native's keyword semantics for `flex` differ from CSS: a single positive number means grow proportional, `flex: 0` is inflexible, `flex: -1` shrinks to `minWidth` / `minHeight`.",
    caveats: [
      '`flex-basis` accepts `auto`, a length, or a percent. The CSS intrinsic keywords (`content`, `min-content`, etc.) are not implemented in Yoga.',
    ],
  },
  {
    id: 'columns',
    title: 'columns / column-count / column-width / column-rule / column-span / column-fill',
    category: 'layout',
    caniuseId: 'multicolumn',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'CSS Multicolumn is not implemented in Yoga and there is no PR in flight. Pass-through on web in both versions. For column-style layouts on React Native, use `FlatList` / `SectionList` with `numColumns`, or compose `flex-direction: row` with `flex-wrap`.',
  },
  {
    id: 'float-clear',
    title: 'float / clear',
    category: 'layout',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web in both versions. React Native has no float layout — Yoga is flexbox-first — and these properties are listed in v7's native limitations alongside CSS Grid.",
  },
  {
    id: 'border-style',
    title: 'border-style',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'React Native renders only `solid`, `dotted`, and `dashed` on both platforms. v7 also normalises `border: none` to `border-style: none` (v6 emitted `solid` for the keyword). The other web keywords (`double`, `groove`, `ridge`, `inset`, `outset`, `hidden`) are dropped on native and remain web-only.',
  },
  {
    id: 'border-color',
    title: 'border-color',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Pass-through on web and native, including every per-side longhand. Stock React Native ships physical (`borderTopColor` / `borderBottomColor` / `borderLeftColor` / `borderRightColor`), logical (`borderStartColor` / `borderEndColor`), and block-axis (`borderBlockColor` / `borderBlockStartColor` / `borderBlockEndColor`) keys.',
  },
  {
    id: 'border-width',
    title: 'border-width',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Pass-through everywhere, with full per-side support on native (`borderTopWidth`, `borderRightWidth`, `borderBottomWidth`, `borderLeftWidth`, plus the `-start` / `-end` longhands).',
  },
  {
    id: 'border-image',
    title: 'border-image',
    category: 'props',
    caniuseId: 'border-image',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web in both versions. Stock React Native does not implement `border-image` on either platform and no upstream PR is in flight; SC v7 ignores it on native and surfaces the value only on react-native-web.',
  },
  {
    id: 'outline',
    title: 'outline',
    category: 'props',
    caniuseId: 'outline',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'v7 parses the `outline` shorthand into `outline-width`, `outline-style`, and `outline-color` longhands for React Native. Stock RN 0.77+ accepts the longhands as native style keys; the shorthand itself is not a native key, so the v7 parser is what makes the CSS-flavoured form work on native.',
    caveats: [
      'Outline does not affect layout on native, matching web.',
      'v7 dev-warns when `outline-style` is a web-only keyword (`auto`, `double`, `groove`, `ridge`, `inset`, `outset`) — the declaration still reaches rn-web but is dropped on native.',
    ],
  },
  {
    id: 'outline-color',
    title: 'outline-color',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Web pass-through in both versions; stock RN 0.77+ accepts `outlineColor`.',
  },
  {
    id: 'outline-style',
    title: 'outline-style',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Web pass-through in both versions. Stock React Native renders only `solid`, `dotted`, and `dashed`; `auto`, `double`, `groove`, `ridge`, `inset`, and `outset` are dropped on native (v7 warns in dev).',
  },
  {
    id: 'outline-width',
    title: 'outline-width',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Web pass-through in both versions; stock RN 0.77+ accepts `outlineWidth`.',
  },
  {
    id: 'outline-offset',
    title: 'outline-offset',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Web pass-through in both versions. Stock RN 0.77+ accepts `outlineOffset`, and 0.80+ factors the offset into the rendered outline radius the same way browsers do.',
  },
  {
    id: 'background-color',
    title: 'background-color',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary: 'Pass-through everywhere.',
  },
  {
    id: 'background-shorthand',
    title: 'background (shorthand)',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'v7 parses the full CSS Backgrounds 3 §2.10 grammar: comma-separated layers with `<image>`, `<position>` / `<size>` (slash-separated), `<repeat>`, `<attachment>`, `<box>` (origin, then clip), and a single `<color>` allowed only on the final layer. The sub-properties feed the dedicated `background-image`, `-position`, `-size`, `-repeat`, and `-color` rows (each tracked individually since stock RN gates them behind the `experimental_*` ABI keys). On native, `background-attachment: fixed`, non-`padding-box` `background-origin`, and non-`border-box` `background-clip` warn once and drop. v6 forwarded a raw shorthand string that stock RN rejects.',
    caveats: ['`background-clip: text` requires a community library on native; v7 surfaces the value only on rn-web.'],
  },
  {
    id: 'background-image-url',
    title: 'background-image: url()',
    category: 'props',
    caniuseId: 'background-img-opts',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/54996',
      android: 'https://github.com/facebook/react-native/pull/54994',
    },
    summary:
      "Raster `background-image: url(...)` is web-only today. The `gradients` entry covers `linear-gradient()` / `radial-gradient()` separately; raster images are blocked on a three-PR upstream series (JS #54995, iOS #54996, Android #54994) that adds `url()` parsing and image-fetching to React Native's background-image surface. Until that lands, render raster images through `Image` or `ImageBackground` on native.",
  },
  {
    id: 'background-position',
    title: 'background-position',
    category: 'props',
    caniuseId: 'css-background-offsets',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "Web pass-through in both versions. Stock RN 0.76+ accepts `experimental_backgroundPosition` (the `experimental_` prefix has NOT been removed in 0.85 or 0.86-rc.0 — the ABI key is still prefixed). v7 dual-emits the prefixed and unprefixed keys so the same template works on RN and react-native-web. To avoid rn-web's validator dropping multi-token values like `0 0` or `top left`, v7 skips the standard `backgroundPosition` key when the value has two axes; rn-web falls back to its `0% 0%` default and the `experimental_backgroundPosition` key still flows to iOS / Android where the two-axis grammar is honored.",
    caveats: [
      'Only meaningful when paired with `background-image` (gradients today; raster images once #54994/5/6 lands).',
    ],
  },
  {
    id: 'background-size',
    title: 'background-size',
    category: 'props',
    caniuseId: 'background-img-opts',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Web pass-through in both versions. Stock RN 0.76+ accepts `experimental_backgroundSize` (`Cover` / `Contain` keywords plus `BackgroundSizeLengthPercentage` pairs at the ABI). v7 dual-emits the prefixed and unprefixed keys, and works around a 0.85 native crash by rewriting `cover` / `contain` to `auto` on the `experimental_*` key (the standard `backgroundSize` key keeps the original keyword for rn-web). For gradients — the only image type that reaches `experimental_*` today — `cover ≡ contain ≡ auto` per spec when the source has no intrinsic dimensions.',
  },
  {
    id: 'background-repeat',
    title: 'background-repeat',
    category: 'props',
    caniuseId: 'background-repeat-round-space',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Web pass-through in both versions. Stock RN 0.76+ accepts `experimental_backgroundRepeat` with all four keywords (`repeat`, `no-repeat`, `round`, `space`); v7 dual-emits the prefixed and unprefixed keys.',
  },
  {
    id: 'background-clip',
    title: 'background-clip',
    category: 'props',
    caniuseId: 'background-clip-text',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Web pass-through in both versions. Stock React Native has no `background-clip` style key and there is no upstream PR; `border-box` / `padding-box` / `content-box` / `text` are all web-only.',
  },
  {
    id: 'background-origin',
    title: 'background-origin',
    category: 'props',
    caniuseId: 'background-img-opts',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary: 'Web pass-through in both versions. Stock React Native has no equivalent and no upstream PR is in flight.',
  },
  {
    id: 'background-attachment',
    title: 'background-attachment',
    category: 'props',
    caniuseId: 'background-attachment',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Web pass-through in both versions. `fixed` and `local` rely on a scrolling viewport that React Native does not expose, so the property is web-only with no upstream work in flight.',
  },
  {
    id: 'transform-box',
    title: 'transform-box',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web in both versions. Stock React Native has no `transformBox` style key on either platform; v7 accepts the full spec keyword set (`content-box`, `border-box`, `fill-box`, `stroke-box`, `view-box`) and forwards on rn-web, while warning once on native (`native-transform-box-unsupported`) where the transform pivot is always the view center.',
  },
  {
    id: 'transform-origin',
    title: 'transform-origin',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "Stock React Native added `transformOrigin` as a style key (px / percent / keyword). Both platforms recompute when the view's frame size changes — iOS via `RCTViewComponentView.updateLayoutMetrics` (stale-dimensions bug on recycled Fabric views fixed in react-native#55796, landed in 0.85), Android via `BaseViewManager.onLayoutChange`.",
    caveats: [
      'Three-value form (`x y z`) is parsed but only the 2D origin matters unless a non-zero `perspective` is on the same view.',
    ],
  },
  {
    id: 'transform-style',
    title: 'transform-style',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Web-only. React Native has no equivalent of `transform-style: preserve-3d`; children of a transformed view are always composited flat. v7 accepts `flat` as a no-op and dev-warns once on `preserve-3d` (`native-transform-style-preserve-3d`) with a hint about the `collapsable={false}` iOS workaround. Multi-face 3D layouts have to be hand-built with absolutely-positioned siblings and per-element `perspective` values.',
  },
  {
    id: 'perspective',
    title: 'perspective',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "React Native exposes `perspective` only as a transform-array entry (`transform: [{ perspective: 1000 }, …]`), not as a standalone CSS property. v7 polyfills the top-level `perspective: 1000px` declaration into a `perspective(1000px)` entry on the element's own transform, with `none` resolving to identity and zero / sub-1px values clamping to 1px per CSS Transforms 2 §8. This establishes a 3D rendering context for the element itself; the spec semantic of perspective applying to descendants (which requires `transform-style: preserve-3d`) is not reachable since RN flattens children unconditionally. iOS and Android render different default cameras, so the same value lands at different depths.",
    caveats: [
      'For consistent cross-platform 3D, always declare an explicit `perspective` value on every transformed view. Android applies its own default if none is set.',
    ],
  },
  {
    id: 'perspective-origin',
    title: 'perspective-origin',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Web-only. React Native has no analogue; the vanishing point sits at the centre of the transformed view and cannot be moved.',
  },
  {
    id: 'backface-visibility',
    title: 'backface-visibility',
    category: 'props',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'iOS implements `backface-visibility: hidden` natively via `CALayer.doubleSided`. Android emulates it by reading `rotationX` / `rotationY` after every transform update and switching `alpha` to 0 when the view crosses the 90° threshold on either axis. Both platforms re-evaluate on every transform change.',
    caveats: [
      "Android's hidden state is a discrete alpha flip at the 90° rotation threshold, not a GPU-level backface cull. Continuous flip animations on Android pop rather than smoothly fade — pre-render both faces or use opacity / scale to mask the transition.",
    ],
  },
  {
    id: 'will-change',
    title: 'will-change',
    category: 'other',
    caniuseId: 'will-change',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native has no compositor-promotion hint; transitions and `@keyframes` already run on the native thread via the v7 default `Animated`-based adapter, so the hint has nothing to map to.',
  },
  {
    id: 'visibility',
    title: 'visibility',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Web-only. Stock React Native implements `display: none` (the view is removed from layout) but has no `visibility: hidden` style that keeps the layout box while hiding the contents. Workarounds set `opacity: 0` plus `pointerEvents: none`.',
    caveats: ['`visibility: collapse` has no RN equivalent on either platform.'],
  },
  {
    id: 'interactivity',
    title: 'interactivity',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'CSS UI 5 keyword that suppresses interaction and accessibility for a subtree. Stock React Native has no `interactivity` prop on either platform; v7 polyfills `interactivity: inert` by lifting four top-level props: `pointerEvents: "none"`, `accessibilityElementsHidden: true` (iOS), `importantForAccessibility: "no-hide-descendants"` (Android), and `focusable: false`. `auto` is a no-op. On rn-web, the keyword passes through to the browser, which reads it from the inline style (and from the corresponding HTML `inert` attribute when set explicitly).',
    caveats: [
      'RN does not propagate `focusable: false` to descendants, so a focusable child inside an `inert` subtree can still receive D-pad / keyboard focus on Android / tvOS. v7 dev-warns once (`native-interactivity-inert-focusable-leak`).',
    ],
  },
  {
    id: 'pointer-events',
    title: 'pointer-events',
    category: 'props',
    caniuseId: 'pointer-events',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'Pass-through everywhere. React Native accepts `pointerEvents` as a style key on both platforms (the legacy `pointerEvents` View prop has been deprecated in favour of the style). Values: `auto`, `none`, `box-none` (children receive events but the view itself does not), `box-only` (the view receives events but children do not).',
    caveats: [
      'Web only understands `auto` and `none`. `box-none` and `box-only` are RN-only extensions and silently behave as `auto` on react-native-web.',
    ],
  },
  {
    id: 'user-select',
    title: 'user-select',
    category: 'props',
    caniuseId: 'user-select-none',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "Stock React Native consumes `userSelect` only on `<Text>` (via Text.js `userSelectToSelectableMap`: `auto | text | contain | all` → `selectable: true`, `none` → `selectable: false`). On `<View>` it is a registered style attribute with no native consumer and is silently dropped. The `contain` and `all` values don't actually constrain or expand the selection on either platform.",
    caveats: [
      'Only applies to `<Text>` on native. `<View>` accepts the style but ignores it.',
      '`contain` and `all` collapse to the same selectable=true behavior as `text`; no value-specific semantics are honored.',
    ],
  },
  {
    id: 'caret-color',
    title: 'caret-color',
    category: 'props',
    caniuseId: 'css-caret-color',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'partial',
    summary:
      "Web pass-through in both versions. v7 emits `cursorColor` (Android-only TextInput prop) for the platform-acceptable case. iOS gets no mapping: RN's `selectionColor` would tint the selection range too, violating the CSS spec, so the polyfill refuses to wire it up and dev-warns once. The `caretColor` style key is preserved on the style object so rn-web's browser handles it.",
    caveats: [
      'Android `cursorColor` is reliable on API 29+ (Q); Android 9 silently no-ops, and older versions use reflection that may break.',
    ],
  },
  {
    id: 'accent-color',
    title: 'accent-color',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native has no form-control accent: Switch / Checkbox / Slider tints are configured via dedicated props (`thumbColor`, `trackColor`, etc.) per component.',
  },
  {
    id: 'scroll-behavior',
    title: 'scroll-behavior',
    category: 'props',
    caniuseId: 'css-scroll-behavior',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native does not honour `scroll-behavior` as a style: smooth scrolling is opt-in per call via `ScrollView.scrollTo({ ..., animated: true })`.',
  },
  {
    id: 'touch-action',
    title: 'touch-action',
    category: 'props',
    caniuseId: 'css-touch-action',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native routes gestures through its own responder system; there is no `touch-action` style. Equivalent behaviour comes from `react-native-gesture-handler` or the responder lifecycle.',
  },
  {
    id: 'overscroll-behavior',
    title: 'overscroll-behavior',
    category: 'props',
    caniuseId: 'css-overscroll-behavior',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native\'s `ScrollView` configures overscroll per-platform via props instead: `bounces={false}` disables iOS rubber-banding and `overScrollMode="never"` disables the Android edge glow. No CSS style key wires up to either.',
  },
  {
    id: 'mask',
    title: 'mask / mask-image / mask-mode / mask-position',
    category: 'props',
    caniuseId: 'css-masks',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no CSS mask: the `@react-native-masked-view/masked-view` community package provides a `<MaskedView maskElement={...}>` component on both iOS and Android, but it is opt-in and does not consume CSS syntax.',
  },
  {
    id: 'paint-order',
    title: 'paint-order',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web (primarily an SVG text-stroke ordering control). React Native has no concept of paint order between fill, stroke, and markers; SVG support comes from `react-native-svg`, which does not currently implement `paint-order`.',
  },
  {
    id: 'resize',
    title: 'resize',
    category: 'props',
    caniuseId: 'css-resize',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native has no user-resize handle; a multiline `TextInput` grows automatically via `onContentSizeChange` instead.',
  },
  {
    id: 'appearance',
    title: 'appearance',
    category: 'props',
    caniuseId: 'css-appearance',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native form controls (Switch, Slider, Picker, Button, TextInput) render native platform widgets and do not expose `appearance: none` for opting out.',
  },
  {
    id: 'color-scheme',
    title: 'color-scheme',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web; required there so form controls and scrollbars repaint when dark mode is active. React Native reads the same OS signal through `Appearance` / `useColorScheme`. v7 evaluates `light-dark()` against that signal, which covers the practical use case even though the style itself does not exist on native.',
  },
  {
    id: 'scrollbar-color',
    title: 'scrollbar-color',
    category: 'props',
    caniuseId: 'css-scrollbar',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native does not paint custom scrollbars: iOS exposes only `indicatorStyle` (`default | black | white`) on `ScrollView`, and Android offers no equivalent.',
  },
  {
    id: 'scrollbar-width',
    title: 'scrollbar-width',
    category: 'props',
    caniuseId: 'css-scrollbar',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. React Native has no scrollbar-thickness style; the closest stock option is hiding indicators entirely with `showsVerticalScrollIndicator={false}` / `showsHorizontalScrollIndicator={false}`.',
  },
  // ── Media queries ─────────────────────────────────────────────────
  {
    id: 'media-width',
    title: '@media (min-width / max-width)',
    category: 'at-rules',
    caniuseId: 'css-mediaqueries',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 resolves width / height media queries against the React Native window. Media Queries L4 range syntax (`@media (400px <= width < 800px)`) is supported alongside the legacy `min-width` / `max-width` colon form.',
    caveats: [
      'Sentinel theme tokens in feature values (`@media (min-width: ${t.bp.md}px)`) resolve to their `createTheme` fallback at parse time.',
      '`em` / `rem` lengths inside feature values are treated as 16px.',
    ],
  },
  {
    id: 'media-prefers-reduced-motion',
    title: '@media (prefers-reduced-motion)',
    category: 'at-rules',
    caniuseId: 'prefers-reduced-motion',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 evaluates `prefers-reduced-motion` on React Native via `AccessibilityInfo.isReduceMotionEnabled()` and the `reduceMotionChanged` event. The same signal also collapses `transition` and `@keyframes` durations to 0 automatically.',
  },
  {
    id: 'media-prefers-color-scheme',
    title: '@media (prefers-color-scheme)',
    category: 'at-rules',
    caniuseId: 'prefers-color-scheme',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 evaluates `prefers-color-scheme` on React Native by reading `Appearance.getColorScheme()` and subscribing to its change events. Same signal feeds `light-dark()`.',
  },
  {
    id: 'media-prefers-contrast',
    title: '@media (prefers-contrast)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native exposes high-contrast / bold-text preferences through `AccessibilityInfo` but v7 does not yet wire them into the media-query evaluator.',
  },
  {
    id: 'media-orientation',
    title: '@media (orientation)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 derives `portrait` / `landscape` from the React Native window dimensions and re-evaluates on rotation. No subscription setup required.',
  },
  {
    id: 'media-interaction',
    title: '@media (hover) / (pointer) / (any-hover) / (any-pointer)',
    category: 'at-rules',
    caniuseId: 'css-media-interaction',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no device-capability signal for hover / pointer precision on either version; queries gated on these media features are silently dropped on native.',
    caveats: [
      'Anchor with `&:hover` on a `Pressable` instead of gating rules behind `@media (hover: hover)` on native.',
    ],
  },
  {
    id: 'media-forced-colors',
    title: '@media (forced-colors)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no Windows High Contrast / forced-colors analog; both versions ignore the at-rule on native.',
  },
  {
    id: 'media-dynamic-range',
    title: '@media (dynamic-range)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. iOS and Android both expose HDR-capable display flags (`UIScreen.traitCollection.displayGamut`, `Configuration.colorMode`), but v7 does not yet surface `dynamic-range` to the media-query evaluator.',
  },
  {
    id: 'media-color-gamut',
    title: '@media (color-gamut)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. iOS reports display-P3 / sRGB and Android API 26+ reports color-mode; v7 does not currently surface either to `@media (color-gamut)`.',
  },
  // ── Color functions ───────────────────────────────────────────────
  {
    id: 'color-rgb-hsl',
    title: 'rgb() / rgba() / hsl() / hsla()',
    category: 'colors',
    caniuseId: 'css3-colors',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "React Native's color parser (`@react-native/normalize-colors`) handles `rgb()` / `rgba()` / `hsl()` / `hsla()` in both the legacy comma form and the modern space-separated form. Pass-through everywhere.",
  },
  {
    id: 'color-hwb',
    title: 'hwb()',
    category: 'colors',
    nativeV6: 'yes',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      "RN's `@react-native/normalize-colors` parses `hwb()` natively in both modern (`hwb(H W B)`) and slash-alpha (`hwb(H W B / A)`) forms; v6 and v7 pass the function through unchanged.",
    caveats: [
      'v7 has no dynamic resolver for `hwb()`, so theme sentinels embedded in channels (`hwb(${t.h} 0% 0%)`) are not substituted at render time. Use `oklch` / `oklab` / `lch` / `lab` / `color-mix` for sentinel-bearing dynamic colors.',
    ],
  },
  {
    id: 'color-function',
    title: 'color() function (display-p3, rec2020, …)',
    category: 'colors',
    caniuseId: 'css-color-function',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/42831',
      android: 'https://github.com/facebook/react-native/pull/42831',
    },
    summary:
      'v7 folds static `color(display-p3 …)`, `color(rec2020 …)`, etc. to sRGB hex at compile time on React Native, gamut-mapping wide-gamut inputs. An upstream RN PR adds native Display-P3 awareness (iOS largely implemented, Android on hold) so the wide-gamut value can reach the renderer untouched.',
    caveats: ['Until the upstream PR lands, channels resolve through sRGB even on P3-capable displays.'],
  },
  {
    id: 'named-colors',
    title: 'Named colors / transparent / currentcolor',
    category: 'colors',
    caniuseId: 'currentcolor',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      "RN's `normalize-colors` accepts all 147 CSS named colors plus `transparent` on both platforms (case-sensitive — lowercase only; uppercase `RED` will not match). `currentcolor` is web-only: RN has no cascading `color` to inherit, so v7 leaves it unresolved on native and the value normalises to transparent.",
    caveats: [
      'Use lowercase named-color keywords on native; the matcher is case-sensitive.',
      '`currentcolor` falls back to transparent on native; on Android `cursorColor` the value is silently ignored and the system uses its default caret regardless.',
    ],
  },
  // ── Units ─────────────────────────────────────────────────────────
  {
    id: 'rem-em',
    title: 'rem / em',
    category: 'units',
    caniuseId: 'rem',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web. Stock React Native parses style values as numbers (density-independent pixels) only; `rem` / `em` strings resolve to NaN and the declaration is silently dropped without v7. v7 resolves both units at render time: `rem` multiplies against the root font-size (default 16, configurable via cascade), `em` anchors at the parent's resolved `font-size` per CSS Values 4 §6.1. They compose inside `calc()` and any length context (width, padding, margin, gap, font-size, etc.). v6 did not fold either unit.",
    caveats: [
      'Inside `@media (min-width: 25em)` both versions treat 1em as 16px so legacy `em`-based breakpoints still match.',
      'When `font-size` itself is `em`-based on a descendant, resolution follows the cascade — v7 re-resolves whenever an ancestor publishes a new font-size.',
    ],
  },
  {
    id: 'viewport-units-classic',
    title: 'Classic viewport units (vh, vw, vmin, vmax)',
    category: 'units',
    caniuseId: 'viewport-units',
    nativeV6: 'no',
    nativeV7: 'yes',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. v7 resolves `vh` / `vw` / `vi` / `vb` / `vmin` / `vmax` against the React Native window and re-resolves on orientation change (`vi` and `vb` resolve to width and height respectively in horizontal-tb writing mode). Stock RN does not recognise the strings on either platform.',
  },
  {
    id: 'typographic-units',
    title: 'Typographic units (ch, ex, cap, ic, lh, rlh)',
    category: 'units',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web. v7 resolves the line-height-derived `lh` and `rlh` units on React Native: `lh` anchors at the parent's resolved `line-height`, `rlh` anchors at the root (today this is the same slot — v7 tracks only one cascaded line-height, so `lh` and `rlh` coincide except where descendants override). Glyph-metric units (`ch`, `ex`, `cap`, `ic`) have no equivalent on React Native and v7 does not fold them; pre-compute pixel values from `Dimensions` + `PixelRatio.getFontScale()` where needed.",
  },
  {
    id: 'fr-unit',
    title: 'fr (grid fractional unit)',
    category: 'units',
    caniuseId: 'css-grid',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Defined only inside CSS Grid track lists. React Native does not implement Grid on either version, so `fr` does not apply on native; see the Grid row for the upstream Yoga PR series that would change that.',
  },
  {
    id: 'absolute-units',
    title: 'Absolute units (pt, pc, in, cm, mm, Q)',
    category: 'units',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native dimensions are unitless density-independent pixels; v7 does not convert physical units on native. Convert ahead of time (1pt ≈ 1.33 px, 1in = 96 px, 1cm ≈ 37.8 px).',
  },
  // ── Web-only typography / hypertext features ──────────────────────
  {
    id: 'list-style',
    title: 'list-style / -type / -position / -image',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no `<ul>` / `<ol>` primitive; bullets and ordinal markers must be rendered as explicit `Text` siblings.',
  },
  {
    id: 'content-counters',
    title: 'content / counter-reset / counter-increment / counter-set',
    category: 'props',
    caniuseId: 'css-counters',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no `::before` / `::after` pseudo-elements and no counter cascade, so generated content has nowhere to attach on native.',
  },
  {
    id: 'css-tables',
    title: 'CSS tables (table-layout, border-collapse, border-spacing, caption-side, empty-cells)',
    category: 'layout',
    caniuseId: 'css-table',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native has no table layout mode; build tabular UIs with flex rows + columns or a dedicated grid library.',
  },
  {
    id: 'quotes',
    title: 'quotes',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. `quotes` chooses the glyphs for `content: open-quote / close-quote`; with no generated content on React Native there is nothing for the property to act on.',
  },
  {
    id: 'attr-function',
    title: 'attr() function',
    category: 'functions',
    caniuseId: 'css3-attr',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Browser-side `attr()` works in `content` everywhere and is shipping in Chromium for arbitrary properties (CSS Values L5, Chrome 133+); both SC versions pass the string through unchanged. React Native has no DOM attributes to read — pipe values through props / state at the JS layer instead.',
  },
  {
    id: 'url-function',
    title: 'url() function (image references)',
    category: 'functions',
    nativeV6: 'no',
    nativeV7: 'no',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/54996',
      android: 'https://github.com/facebook/react-native/pull/54994',
    },
    summary:
      "Pass-through on web. v7's `background` shorthand parser accepts `url(...)` as an image token and forwards it to `experimental_backgroundImage`, but stock RN 0.85 only recognises gradient functions inside that key — `url()` values drop silently at the ABI. A three-PR Callstack series (JS / iOS / Android) wires native `url()` parsing into the background-image engine. Until that lands, render raster backdrops with `Image` / `ImageBackground` directly.",
  },
  {
    id: 'image-set',
    title: 'image-set() function',
    category: 'functions',
    caniuseId: 'css-image-set',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native handles density variants through the `Image` `source` prop (e.g. `foo@2x.png` / `foo@3x.png` auto-pick); v7 does not currently rewrite `image-set()` into that surface.',
  },
  {
    id: 'overflow-anchor',
    title: 'overflow-anchor',
    category: 'props',
    caniuseId: 'css-overflow-anchor',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web in both versions. React Native scrolls preserve position relative to the content top, not a tracked anchor; there is no equivalent property on iOS or Android.',
  },
  {
    id: 'overflow-clip-margin',
    title: 'overflow-clip-margin',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. Stock React Native has no `overflow: clip` semantics, so the margin extension is not implemented on either platform.',
  },
  {
    id: 'content-visibility',
    title: 'content-visibility',
    category: 'props',
    caniuseId: 'css-content-visibility',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native already lazy-mounts off-screen rows in virtualized lists; there is no general-purpose `auto` skip on iOS or Android.',
    caveats: ['Pair with `contain-intrinsic-size` on web so reserved boxes do not collapse before they render.'],
  },
  {
    id: 'contain',
    title: 'contain',
    category: 'props',
    caniuseId: 'css-containment',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web in both versions. React Native does not expose layout/paint/style containment hints; the engine already isolates each view subtree.',
  },
  {
    id: 'anchor-positioning',
    title: 'anchor-name / position-anchor / anchor()',
    category: 'layout',
    caniuseId: 'css-anchor-positioning',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web (Chromium-only today). React Native has no positioned-anchor system; popovers and tooltips have to compose `measureInWindow` plus absolute children on iOS and Android.',
  },
  {
    id: 'scroll-driven-animations',
    title: 'scroll-timeline / view-timeline / animation-timeline',
    category: 'animation',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native drives scroll-linked animation through `Animated.event` on a `ScrollView`; the CSS scroll-driven syntax is not parsed on iOS or Android.',
    caveats: ['No caniuse entry yet — track spec maturity before relying on it in production.'],
  },
  {
    id: 'text-box-trim',
    title: 'text-box / text-box-trim / text-box-edge',
    category: 'props',
    caniuseId: 'css-text-box-trim',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. Stock React Native has no glyph-metric trimming on either platform; vertical centering still relies on manual `lineHeight` and `paddingVertical` math.',
  },
  {
    id: 'text-wrap',
    title: 'text-wrap',
    category: 'props',
    caniuseId: 'css-text-wrap-balance',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'v7 polyfills the `text-wrap` shorthand and both CSS Text 4 longhands (`text-wrap-mode`, `text-wrap-style`) on React Native. `text-wrap-mode: nowrap` (and the shorthand) lift `numberOfLines: 1` on the `<Text>` element. `text-wrap-style: balance` and `pretty` map to Android `textBreakStrategy` (`balanced` / `highQuality`, API 23+); `stable` is a no-op. iOS has no platform line-breaking control so style keywords warn there. v6 dropped the property on native.',
    caveats: [
      'On web, all four values pass through in both versions.',
      'Dev-mode warns once per style keyword that has no iOS or cross-platform support (balance / pretty / stable on iOS).',
    ],
  },
  {
    id: 'field-sizing',
    title: 'field-sizing',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web (Chrome 123+). v7 polyfills `field-sizing: content` on `<TextInput>` by lifting `multiline: true` as a top-level prop, which engages each platform's native height-fitting measure pass (iOS `RCTBaseTextInputShadowView.sizeThatFits`; Android `ReactEditText` Yoga measure). `fixed` is a no-op. Author-supplied `min-height` / `max-height` still bound the field. v7 dev-warns once (`native-field-sizing-needs-multiline`) when the caller explicitly passes `multiline={false}` since that voids the lift. Stock RN has no `field-sizing` surface on either platform.",
    caveats: [
      'The polyfill applies to `<TextInput>` only; the CSS property has no analog for other input types on native.',
    ],
  },
  {
    id: 'image-rendering',
    title: 'image-rendering',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. Stock React Native always scales raster images with bilinear filtering; pixelated / crisp-edges hints have no platform surface on iOS or Android.',
  },
  {
    id: 'image-orientation',
    title: 'image-orientation',
    category: 'props',
    caniuseId: 'css-image-orientation',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. React Native applies EXIF orientation at decode time on both platforms (matching the web default of `from-image`), but does not expose the CSS property — there is no way to override with `none` or a specific angle.',
  },
  {
    id: 'print-color-adjust',
    title: 'print-color-adjust',
    category: 'props',
    caniuseId: 'css-color-adjust',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web. React Native has no print pipeline, so the property is unused on iOS and Android.',
  },
  {
    id: 'interpolate-size',
    title: 'interpolate-size / calc-size()',
    category: 'animation',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web (Chromium-only today). v7 already animates layout properties on React Native through the runtime, so there is no equivalent opt-in needed on iOS or Android.',
    caveats: ['No caniuse entry yet.'],
  },
  {
    id: 'text-spacing-trim',
    title: 'text-spacing-trim',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      'Pass-through on web. CJK punctuation trimming is not implemented as a CSS property in stock React Native on either platform.',
  },
  {
    id: 'text-autospace',
    title: 'text-autospace',
    category: 'props',
    caniuseId: 'css-text-spacing',
    nativeV6: 'no',
    nativeV7: 'no',
    summary: 'Pass-through on web. Stock React Native has no CJK / Latin auto-spacing hook on iOS or Android.',
  },
];

// ───────────────────────────── Shared types/labels ──────────────────────────

export interface BrowserMin {
  chrome?: string;
  safari?: string;
  firefox?: string;
  edge?: string;
}

export interface MergedEntry extends CompatEntry {
  caniuseTitle?: string;
  browserMins?: BrowserMin;
}

export const SUPPORT_LABELS: Record<Support, string> = {
  yes: 'Supported',
  partial: 'Partial',
  no: 'Not supported',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  selectors: 'Selectors',
  'at-rules': 'At-rules',
  functions: 'Functions',
  units: 'Units',
  colors: 'Colors',
  layout: 'Layout',
  animation: 'Animation',
  props: 'Properties',
  other: 'Other',
};
