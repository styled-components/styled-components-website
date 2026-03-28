import styled, {
  createGlobalStyle,
  css,
  keyframes,
  StyleSheetManager,
  ThemeProvider,
  withTheme,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

// Deterministic component IDs for live editor SSR — must produce the same
// ID on server and client regardless of render order or evaluation timing.
const getComponentId = (key: string) => `sc-runner-${key}`;

const hijackedStyled = (...args: Parameters<typeof styled>) => {
  // For styled(Component) extensions, derive a stable ID from the component
  const target = args[0];
  const name =
    (typeof target === 'function' && (target.displayName || target.name)) ||
    (typeof target === 'string' && target) ||
    'ext';
  return styled(...args).withConfig({
    componentId: getComponentId(name),
  });
};

const ignoredProps = Object.getOwnPropertyNames(Function);
(Object.getOwnPropertyNames(styled) as (keyof typeof styled)[]).forEach(tag => {
  if (ignoredProps.includes(String(tag))) return;
  Object.defineProperty(hijackedStyled, tag, {
    get() {
      return styled[tag].withConfig({
        componentId: getComponentId(String(tag)),
      });
    },
  });
});

const baseScope = {
  createGlobalStyle,
  css,
  keyframes,
  styled: hijackedStyled,
  ThemeProvider,
  StyleSheetManager,
  withTheme,
  stylisRTLPlugin,
};

export default baseScope;
