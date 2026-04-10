import styled, {
  createGlobalStyle,
  css,
  keyframes,
  StyleSheetManager,
  ThemeProvider,
  withTheme,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

const IGNORED_PROPS = new Set(Object.getOwnPropertyNames(Function));
const STYLED_TAGS = (Object.getOwnPropertyNames(styled) as (keyof typeof styled)[]).filter(
  tag => !IGNORED_PROPS.has(String(tag))
);

function createHijackedStyled(scopeId: string) {
  const getComponentId = (key: string) => `sc-${scopeId}-${key}`;

  const hijacked = (...args: Parameters<typeof styled>) => {
    const target = args[0];
    const name =
      (typeof target === 'function' && (target.displayName || target.name)) ||
      (typeof target === 'string' && target) ||
      'ext';
    return styled(...args).withConfig({
      componentId: getComponentId(name),
    });
  };

  STYLED_TAGS.forEach(tag => {
    Object.defineProperty(hijacked, tag, {
      get() {
        return styled[tag].withConfig({
          componentId: getComponentId(String(tag)),
        });
      },
    });
  });

  return hijacked;
}

export function createScope(id: string) {
  return {
    createGlobalStyle,
    css,
    keyframes,
    styled: createHijackedStyled(id),
    ThemeProvider,
    StyleSheetManager,
    withTheme,
    stylisRTLPlugin,
  };
}
