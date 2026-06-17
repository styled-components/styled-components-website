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
      'v6 normalizes nesting at build time before the browser sees it; v7 emits native CSS Nesting when the targeted browsers support it. On React Native, v7 resolves nested rules through the runtime; v6 only flattened simple ampersand cases.',
    caveats: [
      'Always anchor pseudo-states with `&:hover`, never bare `:hover`. Both versions treat a bare pseudo as a descendant selector.',
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
      'On web, v6 mishandled commas inside `:has(...)`; v7 compiles arbitrary nesting and comma-split arms correctly. On React Native, v7 supports `&:has(${StyledComponent})` for descendant-by-reference matching and `&:has([attr])` / `&:has([attr=value i])` for any attribute operator (including the case-insensitive flag). v6 dropped `:has(...)` on native.',
    caveats: [
      'On native, only single-argument forms work. Compound selectors, pseudo-classes (`:has(:hover)`), combinators (`:has(.a .b)`), and selector lists (`:has(.a, .b)`) drop with a dev-warn.',
      'Match scope is the descendant subtree only (no preceding-sibling matching without combinators).',
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
      'v6 could mangle nested declarations inside `@starting-style`. v7 honors the at-rule and runs first-mount enter animations on React Native by default; no reanimated opt-in required.',
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
      'v6 could swallow `@scope` or flatten its donut shape. v7 forwards `@scope` intact so the browser handles the cascade. React Native does not implement `@scope` on either version.',
  },
  {
    id: 'supports',
    title: '@supports',
    category: 'at-rules',
    caniuseId: 'css-supports-api',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      "Web answers directly. On React Native, v7 evaluates `@supports` as a real feature query against actual platform capability, with `not` / `and` / `or` per the CSS grammar. Probing a feature inside `@supports (foo: bar)` does not fire that feature's dev-warn. v6 does not evaluate the condition on native.",
    caveats: ['Unknown `selector(...)` and test-only forms resolve to false on native.'],
  },
  {
    id: 'property',
    title: '@property (registered custom props)',
    category: 'at-rules',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      "On web, v7 forwards `@property` to the browser's `CSS.registerProperty()`. On React Native, v7 registers it: `syntax`, `inherits`, and `initial-value` apply to `var()` resolution, unset registered properties resolve to their typed initial value, and `inherits: false` blocks ancestor leakage (descendants see the initial value). Supported syntax strings: `*`, `<length>`, `<number>`, `<percentage>`, `<integer>`, `<angle>`, `<time>`, `<color>`; invalid rules warn and are ignored. v6 does not register `@property` on native.",
    caveats: [
      'The animation gotcha holds: a CSS custom property only eases between values (e.g. two oklch colors) once it is registered with a `<color>` syntax and an initial value.',
      'Put `@property` declarations in `createGlobalStyle` so they live on the document and survive SSR.',
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
      'v6 passed `color-mix()` through on web only. v7 evaluates it on React Native and converts to sRGB for display. Stock RN has no `color-mix` parser.',
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
      'Pass-through on web in both versions. v7 also resolves these on React Native to sRGB, gamut-mapping wide-gamut inputs while preserving hue. Stock RN only recognizes hex / rgb / hsl / hwb, so the modern spaces would otherwise drop. v7 additionally supports CSS Color 5 relative-color syntax (`oklch(from <base> <l-expr> <c-expr> <h-expr>)`) with channel keywords (`l`, `c`, `h`, `a`, `b`, `alpha`) usable inside `calc()`. Theme-token bases re-resolve at render time.',
    caveats: [
      'Percent channels follow CSS Color 4 ranges: `lab(50% 0 0)` is mid-gray.',
      'Relative color is also resolved for `rgb()` / `hsl()` / `hwb()` / `color()` bases on native, not just the modern spaces.',
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
      'Pass-through on web. v7 evaluates `light-dark()` on React Native against the device color scheme. Stock RN does not parse the function. v7 additionally resolves the full CSS Color 4 system-color keyword set (page, field, button, highlight, link, mark, and accent surfaces: e.g. `canvas`, `canvastext`, `field`, `graytext`, `highlight`, `highlighttext`, `linktext`, `visitedtext`, `buttonface`, `buttontext`, `buttonborder`, `selecteditem`, `mark`, `accentcolor`) to platform-appropriate light / dark colors, including inside composite shorthands (`box-shadow`, `filter: drop-shadow()`, `background`, `linear-gradient` color stops).',
    caveats: [
      'Older CSS system-color names (`ActiveBorder`, `Menu`, `Window`, `ThreeDFace`, etc.) are treated as their modern keyword equivalent.',
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
      'Pass-through on web. v7 resolves these on React Native against the window dimensions and re-resolves on orientation change; stock RN does not recognize the unit strings. The four variants (default `v*`, `sv*`, `lv*`, `dv*`) collapse to a single value on native because RN has no URL-bar surface.',
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
      'v7 resolves container-query units against the nearest ancestor container on React Native; stock RN does not recognize the unit strings. When a container is pending first measurement, the declaration drops for one frame.',
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
      'v7 supports `calc()` / `clamp()` / `min()` / `max()` on React Native, plus the CSS Values 4 step family (`round()` with `nearest` / `up` / `down` / `to-zero` strategies, `mod()`, `rem()`), trig (`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`), exponential (`pow`, `sqrt`, `hypot`, `log`, `exp`), and sign (`abs`, `sign`). Math constants `pi` and `e` are recognized. v6 supported only fully-static cases. An upstream Callstack PR wires Yoga dynamic-value resolution into stock React Native for layout properties (dimensions, min/max, flex-basis, gap, position, margin, padding).',
    caveats: [
      'The keywords `infinity`, `-infinity`, and `NaN` cannot be represented in RN dimensions; v7 drops the declaration with a dev-warn. Use a large literal or viewport unit instead.',
      'All these functions compose inside `calc()`. `calc()`, `clamp()`, `min()`, and `max()` also re-resolve when their operands are dynamic (viewport / container units, theme tokens, `var()`); the step, trig, exponential, and sign functions are computed when the styles are built, so their inputs must be static values.',
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
      'Full logical-property support on React Native in v7, including `-start` / `-end` longhands across margin, padding, border-color, border-width, border-inline, and border-block (see the dedicated `border-inline / border-block` entry). The first-party RTL plugin mirrors physical properties; logical properties are direction-agnostic by definition.',
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
      'v7 covers every authoring-spec form on React Native: per-edge `border-{inline,block}-{start,end}-{color,width,style}` longhands, axis shorthands (`border-inline-color`, `border-block-width`, etc.), per-edge composite shorthands (`border-inline-start: 1px solid red`), and the two whole-axis composites (`border-inline`, `border-block`). Under horizontal-tb writing mode, inline edges map to start / end and block edges to top / bottom.',
    caveats: [
      'Stock RN 0.85 only ships the legacy `borderStart*` / `borderEnd*` / `borderBlockColor*` keys; v7 maps the newer `border-inline-*` / `border-block-*` names onto those so spec-authored CSS works regardless.',
      'Per-edge `border-style` is not supported on native (RN has a single whole-element `borderStyle`); v7 drops per-edge styles, dev-warning on a non-`solid` value (a per-edge `solid` is accepted silently since it already matches the default). The element-level `border-style` still works.',
    ],
  },
  {
    id: 'attr-selectors',
    title: 'Attribute selectors ([aria-pressed], [data-state="open"])',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 supports the full Selectors 4 attribute grammar on React Native: presence (`&[attr]`), exact-match (`&[attr=value]`), word (`~=`), prefix (`|=`), starts-with (`^=`), ends-with (`$=`), substring (`*=`), and the `i` / `s` case-sensitivity flags. Compound brackets chain with AND semantics (`&[a][b]`), and a trailing pseudo-state attaches (`&[a]:active`). Boolean coercion means `aria-pressed={true}` and `aria-pressed="true"` both match.',
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
      'Pass-through on web (`-webkit-line-clamp` and the standard `line-clamp` both work on Chromium / WebKit / Firefox 68+). v7 supports `line-clamp: N` on `<Text>` so the same template works on both targets.',
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
      'Stock RN 0.76+ consumes a CSS `filter` string. On iOS (default Fabric), only `brightness` and `opacity` apply; `blur`, `grayscale`, `saturate`, `contrast`, `hue-rotate`, and `drop-shadow` need the SwiftUI filter backend opt-in (off by default in 0.85 and 0.86). `invert` and `sepia` are accepted but never applied on iOS. On Android, color-matrix filters (brightness, contrast, grayscale, sepia, saturate, hue-rotate, invert, opacity) work on minSdk 24+; `blur` and `drop-shadow` require API 31+. v7 additionally resolves CSS Color 4 system keywords inside `drop-shadow()` so they paint on native.',
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
      'Stock RN 0.76+ paints `linear-gradient()` and (0.80+) `radial-gradient()`, plus their `repeating-*` variants. v7 emits the right native shape so the same template works on RN and react-native-web; v6 dropped gradient strings on native. v7 additionally resolves CSS Color 4 system keywords inside gradient stops so they paint on native. Conic gradients are not implemented in stock RN on either platform; v7 forwards the string but it does not paint on native.',
    caveats: [
      'Linear / radial: web pass-through plus native paint.',
      'Conic: web-only. Approximate on native with a layered radial-gradient and image mask, or use `react-native-skia` for true sweep painting.',
      'Raster `background-image: url()` is tracked separately under its own row (upstream PRs in flight).',
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
      'v7 forwards `mix-blend-mode` to native. iOS and Android map the 15 CSS Compositing 1 blend modes on RN 0.85+, plus `plus-lighter` (CSS Compositing 2) on RN 0.86+. Android needs API 29+ (Android 10); the prop is silently dropped on API 24-28.',
    caveats: [
      'Gamma-sensitive modes (color-burn, soft-light, overlay, hard-light) appear more saturated than on web because iOS and Android blend in linear-light on Display P3 devices.',
      'On react-native-web, every View is a stacking context by default. Override the parent with `z-index: auto` so blends reach the intended backdrop.',
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
      'v7 supports `background-blend-mode` on native. Stock RN has no `backgroundBlendMode` style. Linear-friendly modes round-trip exactly; gamma-sensitive modes differ slightly on Display P3.',
  },
  {
    id: 'transitions',
    title: 'transition',
    category: 'animation',
    caniuseId: 'css-transitions',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'v7 animates eligible properties on the native thread by default; no setup or extra import. All CSS easing keywords plus `cubic-bezier()`, `steps()`, `step-start`, `step-end`, and `linear(<stop-list>)` are supported. Non-linear curves are sampled into per-frame curves for the native driver. Web behavior is unchanged.',
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
      '`@keyframes` runs on React Native in v7 by default; no extra setup. All CSS `animation-direction`, `animation-fill-mode`, `animation-play-state`, `animation-iteration-count`, and `animation-composition` (`replace | add | accumulate`) values work, plus per-frame easing. Coordinating-list `animation-composition` pairs with `animation-name` (comma-separated). `prefers-reduced-motion` collapses durations to 0 automatically, and `@starting-style` participates in transitions and first-mount animations. The optional reanimated adapter (`styled-components/native/reanimated`) is available for consumers that prefer to drive animations through reanimated; on rn-web, `animation-composition` flows through to the browser as native CSS.',
  },
  {
    id: 'env',
    title: 'env() safe-area-inset',
    category: 'functions',
    caniuseId: 'css-env-function',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'v7 supports `env()` per CSS Environment Variables Level 1 (recognized names, fallbacks, recursive fallback substitution). Safe-area insets currently resolve to 0 on React Native; until the runtime wires up `react-native-safe-area-context`, `env(safe-area-inset-top, 47px)` returns 0 because recognized names ignore their fallback per spec.',
  },
  {
    id: 'custom-props',
    title: 'CSS Custom Properties (var(--…))',
    category: 'other',
    caniuseId: 'css-variables',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Declare `--name: value` on any styled component and descendants read it back through `var(--name, fallback)`. v7 honors the full CSS Variables L1 contract: fallbacks, nested resolution in both the name and fallback arguments, cycle detection, case-sensitive names, quote-aware skip inside string values, and `--foo: initial` resetting to the guaranteed-invalid value (so a downstream `var(--foo, fallback)` substitutes the fallback). References resolve against the cascade inside every conditional bucket (`@media`, `@container`, `@supports`, attribute, pseudo-state, `:has()`, `:nth-child()`, combinator). Substituted values flow through the same value pipeline as authored CSS, so a shorthand interpolation (`margin: var(--spacing)` with `--spacing: 4px 8px`) still expands to longhands. `createTheme()` (v6.4+) builds on the same primitive: every leaf becomes a `var(--prefix-path, fallback)` string usable in both web and native components.',
    caveats: [
      'Dev builds warn on a render-time `var()` only when no ancestor declared the property AND no fallback is provided.',
      '`ThemeProvider` must receive the raw theme object, not the `createTheme()` output. Passing the output yields self-referential `var(--x, var(--x, fallback))`.',
      'JS arithmetic on tokens silently breaks (`4 + theme.space.md`). Use `calc()` instead.',
    ],
  },
  {
    id: 'important',
    title: '!important',
    category: 'other',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "v7 honors the `!important` marker within a styled component. The marker is stripped from the rendered value, beats normal declarations on the same property regardless of source order, and applies through every conditional bucket (`@media`, `@container`, `@supports`, attribute, `:hover` / `:focus` / `:active` / `:disabled`, `:has()`, `:nth-child()`, combinator). A shorthand marked `!important` propagates to every longhand. Importance flows through `var()` substitution and render-time resolvers (`light-dark()`, `env()`, viewport units, theme tokens). Web-aligned: a styled component's `!important` beats a runtime `style={{ ... }}` prop; normal declarations are still overridden by the runtime `style` prop. Stock RN parses `red !important` as a string and leaks it onto the host element with no visible color, so authoring `!important` only became safe with v7.",
    caveats: [
      "Cross-component cascade is not yet supported: a parent's `!important font-size` cannot defeat a child's normal one. Coverage is within-component only.",
      '`!important` inside `@keyframes` is ignored, matching the CSS Animations spec.',
      'Marker is case-insensitive (`!IMPORTANT`) and whitespace between `!` and `important` is tolerated.',
    ],
  },
  {
    id: 'matrix-transform',
    title: 'transform: matrix() / matrix3d()',
    category: 'props',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'On native, `transform` passes through to React Native unchanged. RN accepts `matrix()` with 9 or 16 numbers; the standard 6-number 2D form and `matrix3d()` are rejected, so neither renders on native in either version. Function transforms need explicit units (`translateX(10px)`, not `translateX(10)`). On web both versions hand the value to the browser.',
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
      'iOS renders skew correctly through stock RN and both versions of styled-components. On Android, the matrix decomposition silently drops the shear, so views render as rotated rectangles instead of true parallelograms. An upstream Android fix is in flight (API 29+).',
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
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    prUrls: {
      ios: 'https://github.com/facebook/react-native/pull/55665',
      android: 'https://github.com/facebook/react-native/pull/55665',
    },
    summary:
      'Web pass-through. On React Native, v7 supports an equal-columns subset: `display: grid` with `grid-template-columns: repeat(N, 1fr)` plus `gap` lays direct styled children into N equal columns, and `grid-column: span N` spans columns. A grid container with `container-type` doubles as a container-query container. A Meta-internal Yoga + React Native series adds full `display: grid` to the layout engine across a multi-PR sequence; once it merges, stock RN gets `grid-template-columns`, `grid-template-rows`, `grid-area`, and friends on both platforms simultaneously.',
    caveats: [
      'Fixed px tracks, `minmax()`, `auto-fill` / `auto-fit`, unequal `fr` factors, named / line-number placement, `grid-row`, `grid-area`, and subgrid are not supported on native; they warn and fall back to a flex row.',
    ],
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
    nativeV7: 'partial',
    summary:
      'Web pass-through. On React Native, v7 sticks direct styled children of a styled ScrollView to the top edge, holding the pinned position through flings. v6 has no equivalent on native.',
    caveats: [
      'Top-edge only and direct children only.',
      'Inset offsets (`top: 8px`) are not applied.',
      'Consecutive sticky headers overlap; there is no push-off between them.',
      'Nested (non-direct) sticky elements are not supported.',
    ],
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
      'Pass-through on web. Stock React Native renders text shadows via individual `textShadowOffset` / `textShadowRadius` / `textShadowColor` keys but does not parse the CSS `text-shadow` shorthand string. v7 polyfills the shorthand `<offset-x> <offset-y> [<blur>] [<color>]` into those keys; v6 dropped the shorthand. Upstream PR #55289 adds native CSS-shorthand parsing on both platforms (single shadow per node).',
    caveats: [
      'Native renders a single shadow per `<Text>`, so a comma-separated list applies the first (topmost) layer with a dev-warn; web renders the full list.',
    ],
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
      'iOS supports `solid`, `double`, `dashed`, and `dotted` (for both underline and strikethrough). `wavy` cannot be drawn on either platform; v7 falls back to `solid` with a dev-warn on native (rn-web keeps `wavy` so the browser handles it). Android ignores the property entirely on native; an upstream PR adds full support.',
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
      'Android honors `vertical-align` on `Text`, `Paragraph`, and multi-line `TextInput`. iOS has no platform API for vertical alignment of attributed text; v7 dev-warns on iOS and suggests wrapping `<Text>` in a `View` with `justify-content` as a workaround. On rn-web, v7 maps box-positioning keywords (`top` / `middle` / `bottom`) to `align-content` so they actually shift the content; baseline-shifting keywords (`baseline | sub | super | text-top | text-bottom | <length>`) flow through unchanged. An upstream PR adds iOS support mirroring Android.',
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
      'v7 round-trips full `box-shadow` syntax on native, including spread and inset. RN 0.76+ accepts the same CSS-string syntax directly via the New Architecture; v6 only handled a subset of the legacy `shadow*` / `elevation` props. v7 additionally resolves CSS Color 4 system keywords inside the color slot so they paint on native (stock RN drops the whole shadow if a system keyword appears).',
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
    title: '3D transforms (rotateX, perspective, translate3d)',
    category: 'props',
    caniuseId: 'transforms3d',
    nativeV6: 'partial',
    nativeV7: 'partial',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Stock React Native supports `rotateX`, `rotateY`, `rotateZ`, the 3-axis `translate3d()`, and per-view `perspective` inside the transform array on both platforms. Standalone `translateZ`, `scaleZ`, `scale3d`, `rotate3d`, and `matrix3d` keywords are silently dropped. `transform-style: preserve-3d` is unimplemented on either platform, so nested 3D children always flatten; multi-face 3D layouts must be hand-built with absolutely-positioned siblings carrying their own `perspective`.',
  },
  {
    id: 'view-transitions',
    title: 'View Transitions',
    category: 'at-rules',
    caniuseId: 'view-transitions',
    nativeV6: 'no',
    nativeV7: 'no',
    summary:
      "Pass-through on web. Not implemented on React Native; neither stock RN nor v7 has a same-document or cross-document view-transition surface. Use `react-native-reanimated`'s shared-element APIs or `LayoutAnimation` for analog effects.",
  },
  {
    id: 'scroll-snap',
    title: 'scroll-snap-type / scroll-snap-align',
    category: 'props',
    caniuseId: 'css-snappoints',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'Web pass-through. On React Native, v7 turns `scroll-snap-type` on a styled ScrollView plus `scroll-snap-align: start | center | end` on its children into real snap positions; `scroll-snap-stop: always` keeps a fling from skipping past a child, and a settle guarantee makes `mandatory` literal on Android. v6 does not honor CSS scroll-snap on native.',
    caveats: [
      'Without aligned children, `mandatory` falls back to full-scrollport paging; size each slide to the scrollport in that mode.',
      '`proximity` (and a bare axis) applies fast deceleration only; RN has no proximity engine.',
      'Pass `snapToInterval` or `snapToOffsets` on the ScrollView to override the approximation with exact snap points.',
    ],
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
      'Pass-through on web in both versions. v7 implements combinators between styled-component references on React Native: descendant (`${Foo} &`), child (`${Foo} > &`), adjacent-sibling (`${Foo} + &`), and general-sibling (`${Foo} ~ &`). The left operand must be a styled-component reference; a raw selector string on the left does not match.',
    caveats: [
      'A non-styled wrapper (e.g. a user `<View>`) between the ancestor and the matched component is transparent to both the descendant and the child combinator. To break a `>` match on purpose, interpose a styled wrapper.',
      'Sibling and indexed-position selectors need a styled parent; under a non-styled parent, children are treated as untracked (each resolves as an only child).',
    ],
  },
  {
    id: 'pseudo-hover',
    title: '&:hover',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      "v7 supports `&:hover` on React Native ≥ 0.85 via `Pressable`. Stock RN's Pressable fires hover events only when its W3C-pointer-events feature flag is enabled (defaults off in 0.85); without it no hover styles fire. The underlying iOS / Android hover infrastructure is fully wired. Always anchor with `&`, not bare `:hover` (both versions parse bare `:hover` as a descendant selector).",
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
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'partial',
    androidStock: 'partial',
    summary:
      'Basic single-value and per-corner longhands pass through everywhere. v7 additionally accepts the slash-separated CSS grammar (`10px / 10px`) on native when it resolves to a circular radius; v6 and stock RN drop the slash form because RN has no per-axis radius surface to map it to. Truly elliptical combinations (different horizontal and vertical radii) drop in v7 too, with a dev-warn.',
  },
  {
    id: 'corner-shape',
    title: 'corner-shape',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web (Chrome 139+). v7 maps `corner-shape: round` to iOS circular corners and `squircle` to the Apple-smooth continuous curve; other contours (`bevel`, `notch`, `scoop`, out-of-band superellipse) warn and drop. Android renders circular corners regardless. Stock RN has no corner-shape surface on either platform.',
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
      'React Native used to be border-box-only. Stock RN now accepts both `border-box` and `content-box` with no feature flag on either platform.',
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
      'Stock RN 0.85+ accepts the four CSS keywords on `<Image>` (fill / contain / cover / scale-down / none). v7 makes the same authored CSS work on rn-web Image too. `object-position` has no native equivalent on either platform and is web-only; on native, alignment falls back to the `Image` defaults.',
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
      'Pass-through on web. Stock RN 0.85 natively parses only the bare number form (`1.5`); the slash string form, `auto`, and the two-value `auto <ratio>` form drop without v7. v7 computes the ratio itself, so `16 / 9`, `auto`, and `auto <ratio>` all work on React Native. v6 only handled the number form.',
    caveats: [
      'The `auto` half of `auto <ratio>` only matters on replaced elements (`<Image>`); on regular views it is a no-op and v7 dev-warns.',
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
      'Pass-through on web; flows through on react-native-web. iOS 17+ honors only the `pointer` keyword; the 30+ other CSS cursor values parse but have no effect. iOS < 17 ignores the property entirely. Android has no `cursor` consumer on either renderer.',
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
      'Required for predictable stacking contexts when using blend modes on native. v7 supports `isolation: isolate` on iOS, Android, and web so blended descendants composite against the isolated group. Android has no isolation style key, so v7 also enables a hardware-texture layer to create the isolated surface there. Stock RN 0.85+ accepts `isolation: auto | isolate` on iOS for z-ordering only and drops it on Android.',
    caveats: [
      "While a gated `filter` function is mounted on iOS at the default release level, descendants' `mix-blend-mode` stops compositing against the backdrop; dev builds warn once when this applies.",
    ],
  },
  {
    id: 'nth-child-of-type',
    title: ':nth-child / :nth-of-type',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Covers `:nth-child`, `:nth-of-type`, `:nth-last-child`, `:nth-last-of-type`. v6 miscounted child positions under RSC because injected `<style data-styled>` tags shift the index; v6.4 ships an opt-in `stylisPluginRSC` that rewrites these selectors using `of S` to exclude SC style tags. v7 rewrites them by default in RSC. On React Native, v7 matches the full `<an+b>` grammar plus `odd` / `even` against the live sibling position. The `<an+b of <selector>>` form is also supported on native: the inner accepts a styled-component reference or a single attribute selector (same simple-inner scope as `:has()`).',
    caveats: [
      'On v6 RSC: import `stylisPluginRSC` and pass it to `StyleSheetManager.stylisPlugins`, or fall back to `:nth-of-type()` (universally compatible).',
      '`:nth-child(N of S)` itself needs Chrome 111+, Firefox 113+, Safari 9+.',
      'On native, siblings outside a styled-component parent do not contribute to the count.',
      'On native, the `of S` inner does not accept compound selectors, combinators, or descendant chains; complex inners warn and fall through.',
    ],
  },
  {
    id: 'first-last-only-child',
    title: ':first-child / :last-child / :only-child',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Same RSC child-index shift as :nth-child(): inline `<style data-styled>` tags break first/last/only counts under v6 unless `stylisPluginRSC` is wired up. v7 rewrites them automatically. On React Native, v7 evaluates them against the live sibling index.',
    caveats: ['Prefer `:first-of-type` / `:last-of-type` / `:only-of-type` if `stylisPluginRSC` is not available.'],
  },
  {
    id: 'first-last-only-of-type',
    title: ':first-of-type / :last-of-type / :only-of-type',
    category: 'selectors',
    nativeV6: 'no',
    nativeV7: 'yes',
    summary:
      'Type-scoped structural pseudos are unaffected by injected `<style data-styled>` tags, since style elements are a different element type. Universally compatible alternative to the child-index family under RSC on both versions. On native, v7 evaluates them against the per-type sibling index.',
  },
  {
    id: 'not',
    title: ':not()',
    category: 'selectors',
    caniuseId: 'css-not-sel-list',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'Single-argument `:not()` works on both versions on web. The selector-list form `:not(.a, .b, [c])` tripped v6 when a comma appeared between simple selectors inside the parens (same family of bugs as `:is()` / `:has()`); v7 compiles each arm independently. On React Native, v7 supports single pseudo-states (`&:not(:hover)`, `&:not(:focus)`, `&:not(:pressed)`, `&:not(:disabled)`) and single attribute selectors with any operator (`&:not([disabled])`, `&:not([href^="https"])`).',
    caveats: [
      'Compound, nested, and selector-list inner arguments are not supported on native (`:not([a][b])`, `:not(:hover, :focus)`, `:not(.foo .bar)` all warn).',
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
      'RN `fontFamily` is a single platform-font name. v7 accepts a single ident sequence (unquoted multi-word like `Helvetica Neue`), one quoted string, or a generic-family keyword. Comma-separated stacks (`Inter, system-ui, sans-serif`) keep the first family and drop the rest with a dev-warn (RN has no fallback chain). v6 dropped the whole declaration silently for stacks. Round-trips on web.',
    caveats: [
      'v7 resolves all 13 CSS generic-family keywords (`system-ui`, `ui-sans-serif`, `ui-serif`, `ui-monospace`, `ui-rounded`, `sans-serif`, `serif`, `monospace`, `cursive`, `fantasy`, `emoji`, `math`, `fangsong`) to concrete face names per platform (e.g. `Times New Roman` for serif variants on iOS, `monospace` for mono variants on Android).',
      'iOS also recognizes the `ui-*` keywords natively. Android has no native generic-keyword handling; unknown names silently fall back to the system default.',
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
      'RN `fontSize` is a bare point value. v7 accepts bare numbers, `Npx`, viewport units (`vh`, `vw`, `svh`, `dvh`, `vi`, `vb`, `vmin`, `vmax` and the `s*` / `l*` / `d*` variants), container query units (`cqh`, `cqw`, `cqi`, `cqb`, `cqmin`, `cqmax`), font-relative units (`em`, `rem` against the cascade, `lh` / `rlh` against line-height, font-metric `ex` / `cap` / `ch` / `ic` and `r`-prefixed via standard approximations), and absolute lengths (`pt`, `pc`, `in`, `cm`, `mm`, `Q` resolve to dp at the standard fixed ratios). The CSS absolute-size keywords (`xx-small`, `x-small`, `small`, `medium`, `large`, `x-large`, `xx-large`, `xxx-large`) resolve to 9, 10, 13, 16, 18, 24, 32, 48 across iOS, Android, and web for parity; relative keywords (`smaller` / `larger`) step the absolute-size ramp against the inherited size or scale by 1.2 otherwise. Font-width keywords (`condensed`, `expanded`) and CSS system fonts (`caption`, `menu`, etc.) drop with a dev-warn that names the offending keyword. v6 only handled bare numbers and `px`; `em` / `rem` strings dropped silently on native.',
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
      "Numeric (`100`–`900`) and the keyword pair (`normal`, `bold`) pass through on both platforms. RN's named-weight aliases (`ultralight`, `thin`, `medium`, `semibold`, `heavy`, `black`) are only accepted by the legacy paper bridge on iOS; the New Architecture default in 0.85 rejects them and falls back to Regular.",
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
      'RN accepts `normal` and `italic` natively on both platforms. v7 additionally maps `oblique` to italic, and degrades `oblique <angle>` to italic with a dev-warn (the angle is ignored). v6 dropped the bare `oblique` declaration. For exact slant control, switch to a slant-axis variable font.',
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
      'iOS supports `small-caps`, `oldstyle-nums`, `lining-nums`, `tabular-nums`, `proportional-nums`, and `stylistic-one` through `stylistic-twenty`. Android handles a superset: also the common / discretionary / historical `*-ligatures` pairs (with `no-*` variants) and `contextual` / `no-contextual`. v6 and v7 both forward space-separated values to RN.',
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
      'RN `lineHeight` is an absolute point value. Both v6 and v7 accept bare numbers and `Npx`; other CSS lengths (`em`, `rem`) are not converted and pass through as raw strings which RN rejects. The CSS unitless-multiplier form (`line-height: 1.5`) is treated as `1.5` points; there is no font-size-relative resolution on native.',
    caveats: [
      'iOS centers glyphs within the line box differently from web when `lineHeight > fontSize`; upstream fix for TextInput is in flight.',
    ],
  },
  {
    id: 'letter-spacing',
    title: 'letter-spacing',
    category: 'props',
    caniuseId: 'css-letter-spacing',
    nativeV6: 'partial',
    nativeV7: 'yes',
    iosStock: 'yes',
    androidStock: 'yes',
    summary:
      'RN `letterSpacing` is a bare point value. v6 accepts only bare numbers and `Npx`; `em` / `rem` strings drop silently on native. v7 routes font-relative units (`em`, `rem`, `lh`, `rlh`) through the cascade resolver that already powers other length properties, so the inherited font size is applied at render time. rn-web stays a pass-through.',
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
      'Pass-through everywhere. RN accepts `auto | left | right | center | justify` on both platforms. iOS additionally maps `start` to a locale-aware natural alignment; stock Android does not recognize `start` / `end` and silently falls back to start-aligned. v7 brings both platforms to spec by resolving `start` / `end` / `match-parent` at render time against the inherited `direction`.',
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
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      "Pass-through on web. v7 supports `text-overflow: ellipsis | clip` on `<Text>` once a line limit is set; pair with `line-clamp: N` (or `text-wrap: nowrap` for one line). Without a line limit there is no line to ellipsize and the value is a no-op. The spec's two-value form (`text-overflow: <start> <end>`) parses and applies the end value with a dev-warn, and string-value overflow markers degrade to an ellipsis; for an exact match use single `clip` / `ellipsis`.",
    caveats: [
      'Only `<Text>` consumes it on native.',
      'Requires a companion line limit (`line-clamp`, or `text-wrap: nowrap` for one line). Without one, RN has no line to ellipsize and the value is dropped.',
      '`head` and `middle` ellipsize positions are RN-only (no CSS analog); reach them via the `numberOfLines` and `ellipsizeMode` props directly.',
    ],
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
      'Pass-through on web. Stock React Native has no `whiteSpace` style and v7 does not polyfill it. Use `text-wrap: nowrap` (which v7 does polyfill to `numberOfLines: 1`) or pass `numberOfLines={1}` directly. Embedded `\\n` in the source preserves newlines.',
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
      'Pass-through on web. Stock Android exposes hyphenation only via the separate Text prop `android_hyphenationFrequency` (`none` / `normal` / `full`); the CSS `hyphens` property is silently dropped. v7 maps `hyphens: auto` to `android_hyphenationFrequency: normal`; `manual` and `none` map to `none`. iOS has no programmatic hyphenation control in RN.',
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
      "Pass-through everywhere. Stock RN accepts `direction` on ViewStyle (`inherit | ltr | rtl`); root-node default tracks the device locale. v7 also drives `<Text>` paragraph-level bidi on native so reordering follows the cascade without an extra prop. v7's RTL plugin handles physical-property mirroring; logical properties stay direction-agnostic.",
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
      '`display: contents` removes the node from layout and moves its children up into the parent; useful for transparent wrapper components. RN 0.86 fixes its layout inside absolutely-positioned subtrees.',
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
      'Pass-through on web. Stock RN sorts children by `zIndex` before painting on both iOS and Android. v6 and v7 both forward the value.',
    caveats: [
      "RN's `zIndex` is a unitless integer; v6 and v7 both convert a CSS number string (`z-index: 5`) before handing it to RN.",
      '`z-index: auto` resolves to the platform default stacking on native.',
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
      "All four physical edges work on iOS and Android. Values follow RN's `DimensionValue` shape: a number, an `Npx` length, an `N%` percent string, or `auto`. Ems, viewport units, and other CSS lengths are not natively understood; v7 resolves the dynamic ones through its own runtime. The upstream Callstack PR #56162 would wire dynamic `calc()` resolution into stock RN for layout properties.",
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
      'Stock RN 0.72+ accepts `inset`, `inset-block`, and `inset-inline` as single-value style keys. v7 supports the multi-value CSS shorthand (`inset: 10px 20px`) by expanding to per-edge values, so spec-authored CSS works on every target. v6 forwarded only single-value forms.',
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
      "Stock RN accepts only the `overflow` shorthand with values `visible`, `hidden`, and `scroll`. The CSS `auto` and `clip` keywords plus the `overflow-x` / `overflow-y` longhands are not implemented. iOS views don't clip by default; Android views do, so `overflow: visible` on Android can still be clipped by an ancestor `ScrollView`.",
    caveats: [
      '`overflow: scroll` on a plain `View` does not produce scrollbars; use `ScrollView` for actual scrolling.',
      'For overflow-visible across Android scroll ancestors, move the element out or set `collapsable={false}` on the wrapper.',
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
      'Stock RN accepts a number (logical pixels), percent string, or `auto`. v6 and v7 both strip the `px` unit and forward the number. Stock RN 0.85 also accepts the CSS keywords `max-content`, `fit-content`, and `stretch`. Only `min-content` is not implemented.',
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
      'All four bounds work on both platforms and accept the same value shape as `width` / `height` (number, percent string, `auto`, plus `max-content`, `fit-content`, `stretch`). Only `min-content` is not implemented.',
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
      'v6 and v7 both expand the `place-content` shorthand to `align-content` + `justify-content`. v7 also expands `place-items` to `align-items` + `justify-items` and `place-self` to `align-self` + `justify-self`. The align axis flows through on native; the justify axis is silently dropped by RN but reaches the browser on rn-web. v7 forwards the full place-content grammar (`baseline`, `normal`, `safe`, `unsafe`, `left`, `right`) verbatim to rn-web so the browser handles the keywords it understands; native keeps the narrower flex keyword set.',
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
      "All three longhands work natively. The `flex` shorthand is parsed by both versions. React Native's keyword semantics for `flex` differ from CSS: a single positive number means grow proportional, `flex: 0` is inflexible, `flex: -1` shrinks to `minWidth` / `minHeight`.",
    caveats: [
      '`flex-basis` accepts `auto`, a length, or a percent. The CSS intrinsic keywords (`content`, `min-content`, etc.) are not implemented in RN.',
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
      "Pass-through on web in both versions. React Native has no float layout (flexbox-first); these properties are listed in v7's native limitations alongside CSS Grid.",
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
      'React Native renders only `solid`, `dotted`, and `dashed` on both platforms. v7 normalizes `border: none` to `border-style: none` (v6 emitted `solid`), and `hidden` resolves to no border on native (was previously misrendered). Repeated sides collapse without noise; mixed sides keep the first drawable style with a dev-warn. Other web keywords (`double`, `groove`, `ridge`, `inset`, `outset`) are dropped on native and remain web-only.',
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
      'v7 parses the `outline` shorthand into `outline-width`, `outline-style`, and `outline-color` longhands for React Native. Stock RN 0.77+ accepts the longhands as native style keys; the shorthand itself is not a native key, so the v7 parser is what makes the CSS-flavored form work on native.',
    caveats: [
      'Outline does not affect layout on native, matching web.',
      'v7 dev-warns when `outline-style` is a web-only keyword (`auto`, `double`, `groove`, `ridge`, `inset`, `outset`); the declaration still reaches rn-web but is dropped on native.',
      '`hidden` is not a legal outline style per spec. v7 drops the declaration with a dev-warn; use `outline-style: none` to remove the outline.',
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
      'v7 supports the full CSS Backgrounds 3 grammar: comma-separated layers with `<image>`, `<position>` / `<size>` (slash-separated), `<repeat>`, `<attachment>`, `<box>` (origin, then clip), and a single `<color>` allowed only on the final layer. Each sub-property is tracked in its own row below. v7 additionally resolves CSS Color 4 system keywords inside the color slot. On native, `background-attachment: fixed`, non-`padding-box` `background-origin`, and non-`border-box` `background-clip` warn and drop. v6 forwarded a raw shorthand that stock RN rejects.',
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
      "Raster `background-image: url(...)` is web-only today. Gradients are covered by the dedicated row above; raster images are blocked on a three-PR upstream series that adds `url()` parsing and image-fetching to React Native's background-image surface. Until that lands, render raster images through `Image` or `ImageBackground` on native.",
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
      'Pass-through on web in both versions. Stock RN 0.76+ paints `background-position` on native, currently behind the `experimental_` prefix. v7 emits the right shape so the same template works on RN and react-native-web; on rn-web the browser handles two-axis values without falling back to its default.',
    caveats: [
      'Only meaningful when paired with `background-image` (gradients today; raster images once the upstream PR series lands).',
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
      'Pass-through on web in both versions. Stock RN 0.76+ accepts `cover` / `contain` keywords and length pairs on native, currently behind the `experimental_` prefix. v7 emits the right shape and works around a 0.85 native crash by rewriting `cover` / `contain` to `auto` for native (rn-web keeps the original keyword). For gradients (the only image type that reaches native today), `cover`, `contain`, and `auto` are equivalent per spec since the source has no intrinsic dimensions.',
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
      'Pass-through on web in both versions. Stock RN 0.76+ paints all four keywords (`repeat`, `no-repeat`, `round`, `space`), currently behind the `experimental_` prefix. v7 emits the right shape so the same template works on RN and react-native-web.',
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
      'Pass-through on web in both versions. Stock React Native has no `transform-box` on either platform; v7 accepts the full spec keyword set (`content-box`, `border-box`, `fill-box`, `stroke-box`, `view-box`) and forwards on rn-web, while warning on native (the transform pivot is always the view center).',
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
      "Stock React Native accepts `transform-origin` (px / percent / keyword) and recomputes when the view's frame size changes. A stale-dimensions bug on recycled Fabric views was fixed in 0.85 (react-native#55796).",
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
      'Web-only. React Native has no equivalent of `transform-style: preserve-3d`; children of a transformed view are always composited flat. v7 accepts `flat` as a no-op and dev-warns on `preserve-3d` with a hint about the `collapsable={false}` iOS workaround. Multi-face 3D layouts have to be hand-built with absolutely-positioned siblings and per-element `perspective` values.',
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
      "React Native exposes `perspective` only as a transform-array entry, not as a standalone CSS property. v7 polyfills the top-level `perspective: 1000px` declaration into a `perspective(1000px)` entry on the element's own transform, with `none` resolving to identity and zero / sub-1px values clamping to 1px. This establishes a 3D rendering context for the element itself; the spec semantic of perspective applying to descendants (which requires `transform-style: preserve-3d`) is not reachable since RN flattens children unconditionally. iOS and Android render different default cameras, so the same value lands at different depths.",
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
      'Web-only. React Native has no analog; the vanishing point sits at the center of the transformed view and cannot be moved.',
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
      'iOS implements `backface-visibility: hidden` natively. Android emulates it by switching the view to fully transparent when it crosses the 90° rotation threshold. Both platforms re-evaluate on every transform change.',
    caveats: [
      "Android's hidden state is a discrete alpha flip at the 90° rotation threshold, not a GPU-level backface cull. Continuous flip animations on Android pop rather than smoothly fade; pre-render both faces or use opacity / scale to mask the transition.",
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
      'Web-only. Stock React Native implements `display: none` (the view is removed from layout) but has no `visibility: hidden` style that keeps the layout box while hiding the contents. Workaround: combine `opacity: 0` with `pointerEvents: none`.',
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
      'CSS UI 5 keyword that suppresses interaction and accessibility for a subtree. v7 supports `interactivity: inert` on React Native: the subtree is non-interactive and hidden from accessibility services. `auto` is a no-op. On rn-web, the keyword passes through to the browser.',
    caveats: [
      'A focusable child inside an `inert` subtree can still receive D-pad / keyboard focus on Android / tvOS because RN does not propagate the focusable flag to descendants. v7 dev-warns when this can happen.',
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
      'Pass-through everywhere. RN accepts `pointerEvents` as a style key on both platforms (the legacy View prop is deprecated in favor of the style). Values: `auto`, `none`, `box-none` (children receive events but the view itself does not), `box-only` (the view receives events but children do not).',
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
      "Stock React Native consumes `userSelect` only on `<Text>`: `auto | text | contain | all` map to `selectable: true`, `none` maps to `selectable: false`. On `<View>` the style is silently dropped. `contain` and `all` don't actually constrain or expand the selection on either platform.",
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
      'Pass-through on web. v7 supports `caret-color` on Android `<TextInput>`. iOS has no caret-only API in RN (the only surface tints the selection range too, violating the CSS spec) so the property has no effect on iOS and v7 dev-warns.',
    caveats: ['Reliable on Android API 29+; Android 9 silently no-ops, and older versions are unreliable.'],
  },
  {
    id: 'accent-color',
    title: 'accent-color',
    category: 'props',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. Stock React Native has no form-control accent on either platform. v7 supports `accent-color: <color> | auto` on `<Switch>`. `auto` resolves to the platform accent (system blue on iOS, the colorAccent attribute on Android). Any color form is accepted: named, system keyword, hex, modern color function, theme tokens. Works on third-party Switch wrappers via `attrs()`.',
    caveats: [
      'Cascade-style inheritance from an ancestor `accent-color` is not supported. Set the declaration directly on the form control.',
      'Only `<Switch>` is wired up; Checkbox, Slider, and Picker are not.',
    ],
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
      'Pass-through on web. React Native does not honor `scroll-behavior` as a style: smooth scrolling is opt-in per call via `ScrollView.scrollTo({ ..., animated: true })`.',
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
      'Pass-through on web. React Native routes gestures through its own responder system; there is no `touch-action` style. Equivalent behavior comes from `react-native-gesture-handler` or the responder lifecycle.',
  },
  {
    id: 'overscroll-behavior',
    title: 'overscroll-behavior',
    category: 'props',
    caniuseId: 'css-overscroll-behavior',
    nativeV6: 'no',
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. v7 supports `overscroll-behavior: contain | none` on `<ScrollView>` and `<FlatList>`, disabling iOS rubber-banding and the Android edge glow. `auto` uses the platform defaults.',
    caveats: [
      'The `overscroll-behavior-x` / `-y` longhands are not split out; RN has no per-axis overscroll surface.',
      'Only scrollable primitives consume it. On a plain `View`, the declaration has no effect.',
    ],
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
    nativeV7: 'partial',
    iosStock: 'no',
    androidStock: 'no',
    summary:
      'Pass-through on web. v7 supports `scrollbar-width: none` on `<ScrollView>` and `<FlatList>` to hide scroll indicators. `auto` and `thin` use the platform defaults (RN has no thin-scrollbar surface).',
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
      'Theme tokens used in feature values (`@media (min-width: ${t.bp.md}px)`) resolve to their `createTheme` fallback when the styles are read.',
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
      'Stock RN parses `hwb()` natively in both modern (`hwb(H W B)`) and slash-alpha (`hwb(H W B / A)`) forms; v6 and v7 pass the function through unchanged.',
    caveats: [
      'v7 does not re-resolve `hwb()` at render time, so theme tokens embedded in channels (`hwb(${t.h} 0% 0%)`) are not substituted. Use `oklch` / `oklab` / `lch` / `lab` / `color-mix` for theme-driven dynamic colors.',
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
      'v7 converts static `color(display-p3 …)`, `color(rec2020 …)`, etc. to an sRGB hex value when the styles are built on React Native, gamut-mapping wide-gamut inputs. An upstream RN PR adds native Display-P3 awareness (iOS largely implemented, Android on hold) so the wide-gamut value can reach the renderer untouched.',
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
      'Stock RN accepts all 147 CSS named colors plus `transparent` on both platforms, but its matcher is case-sensitive (lowercase only; uppercase `RED` will not match). `currentcolor` is web-only: RN has no cascading `color` to inherit, so the value normalizes to transparent on native.',
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
      "Pass-through on web. Stock React Native parses style values as numbers (density-independent pixels) only; `rem` / `em` strings resolve to NaN and the declaration is silently dropped without v7. v7 resolves both units at render time on native: `rem` multiplies against the root font-size (default 16, configurable via cascade), `em` anchors at the parent's resolved `font-size`. They compose inside `calc()` and any length context (width, padding, margin, gap, font-size, etc.). v6 did not resolve either unit.",
    caveats: [
      'Inside `@media (min-width: 25em)` both versions treat 1em as 16px so legacy em-based breakpoints still match.',
      'When `font-size` itself is em-based on a descendant, resolution follows the cascade; v7 re-resolves whenever an ancestor publishes a new font-size.',
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
      'Pass-through on web. v7 resolves `vh` / `vw` / `vi` / `vb` / `vmin` / `vmax` on React Native against the window and re-resolves on orientation change (`vi` and `vb` resolve to width and height respectively in horizontal-tb writing mode). Stock RN does not recognize the unit strings on either platform.',
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
      "Pass-through on web. v7 resolves the line-height-derived units `lh` and `rlh` on React Native: `lh` anchors at the parent's resolved `line-height`, `rlh` anchors at the root (today these coincide except where descendants override). Glyph-metric units (`ch`, `ex`, `cap`, `ic`) have no equivalent on React Native and v7 does not resolve them; pre-compute pixel values from `Dimensions` and `PixelRatio.getFontScale()` where needed.",
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
    nativeV7: 'yes',
    summary:
      "Browser-side `attr()` works in `content` everywhere and is shipping in Chromium for arbitrary properties (Chrome 133+); both versions pass the string through unchanged. On React Native, v7 reads the styled component's own props as typed CSS values (`width: attr(data-size px, 48px)`), supporting unit names, the `number` keyword, `raw-string`, and `type()` forms for length / number / percentage / color. Missing or mismatched props use the fallback, and the result composes inside `calc()`. v6 has no `attr()` on native.",
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
      'Pass-through on web. v7 accepts `url(...)` in the `background` shorthand and forwards it to the native background-image slot, but stock RN 0.85 only paints gradient functions there; raster `url()` values drop silently on native. A three-PR Callstack series wires `url()` parsing through. Until that lands, render raster backdrops with `Image` or `ImageBackground` directly.',
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
    nativeV7: 'partial',
    summary:
      'Web pass-through (Chromium-only today). On React Native, v7 supports a core subset: `anchor-name`, `position-anchor`, `anchor()`, and `anchor-size()`. An absolutely positioned element binds its `top` / `left` insets to an anchor edge (`top: anchor(--x bottom)`) and its size to the anchor box (`width: anchor-size(--x width)`), composing inside `calc()`. The anchor and the positioned element must share a parent. v6 has no anchor system on native.',
    caveats: [
      '`bottom` / `right` and logical-side insets, `position-area`, `position-try*`, `@position-try`, and `anchor-scope` are not mapped on native; they fall back to the declared value with a dev-warn.',
    ],
  },
  {
    id: 'scroll-driven-animations',
    title: 'scroll-timeline / view-timeline / animation-timeline',
    category: 'animation',
    nativeV6: 'no',
    nativeV7: 'partial',
    summary:
      'Web pass-through. On React Native, v7 binds `@keyframes` progress to a styled ScrollView via `animation-timeline: scroll()` and to subject visibility via `view()`, with named `scroll-timeline` and `animation-range`. Opacity and transform keyframes run on the UI thread. v6 does not parse the scroll-driven syntax on native.',
    caveats: [
      '`scroll(root)` / `scroll(self)`, `view-timeline-inset`, and infinite iteration counts are inactive on native with a dev-warn.',
      'View subjects must be direct children of the styled scroll container.',
      'Requires the default Animated adapter (the Reanimated CSS layer is time-based).',
      'No caniuse entry yet; track spec maturity before relying on it in production.',
    ],
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
      'v7 polyfills the `text-wrap` shorthand and both longhands (`text-wrap-mode`, `text-wrap-style`) on React Native. `nowrap` (and the shorthand) set `numberOfLines: 1` on `<Text>`. `balance` and `pretty` map to Android `textBreakStrategy` (API 23+); `stable` is a no-op. iOS has no platform line-breaking control so style keywords warn there. v6 dropped the property on native.',
    caveats: [
      'On web, all four values pass through in both versions.',
      'Dev-mode warns per style keyword that has no iOS or cross-platform support (`balance` / `pretty` / `stable` on iOS).',
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
      'Pass-through on web (Chrome 123+). v7 polyfills `field-sizing: content` on `<TextInput>` by setting `multiline: true`, which engages the native height-fitting measure pass on each platform. `fixed` is a no-op. Author-supplied `min-height` / `max-height` still bound the field. v7 dev-warns when the caller explicitly passes `multiline={false}` since that undoes it. Stock RN has no `field-sizing` surface on either platform.',
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
      'Pass-through on web. React Native applies EXIF orientation at decode time on both platforms (matching the web default of `from-image`), but does not expose the CSS property; there is no way to override with `none` or a specific angle.',
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
