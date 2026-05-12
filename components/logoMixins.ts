import { css } from 'styled-components';

/**
 * Editorial display treatment for brand logos on a list-of-users surface.
 * Flattens any source SVG to a black silhouette on light backgrounds and a
 * white silhouette on dark. Source SVGs remain trademark-faithful, this
 * runs only at render time.
 */
export const logoMonochromeMixin = css`
  filter: brightness(0);

  @media (prefers-color-scheme: dark) {
    html:not(.light) & {
      filter: brightness(0) invert(1);
    }
  }

  html.dark & {
    filter: brightness(0) invert(1);
  }
`;
