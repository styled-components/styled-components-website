# styled-components RSC Best Practices (v6.3.3+)

| Do | Don't |
|---|---|
| Use static styles | Use dynamic interpolations (serialization overhead) |
| Use data attributes for variants (`&[data-size='lg']`) | Use props for discrete style variants |
| Use CSS custom properties via inline `style` prop | Rely on `ThemeProvider` (no-op in RSC) |
| Use build-time CSS variable generation for theming | Use runtime theme context |
| Let styled-components auto-detect RSC environment | Add `'use client'` directive unnecessarily |
| Trust automatic inline `<style>` tag injection | Manually configure CSS delivery in RSC |
| Set CSS vars on parent to cascade to children | Pass theme props through component tree |
