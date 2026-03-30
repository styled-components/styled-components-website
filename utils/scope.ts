import styled, {
  createGlobalStyle,
  css,
  keyframes,
  StyleSheetManager,
  ThemeProvider,
  withTheme,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

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

  const ignoredProps = Object.getOwnPropertyNames(Function);
  (Object.getOwnPropertyNames(styled) as (keyof typeof styled)[]).forEach(tag => {
    if (ignoredProps.includes(String(tag))) return;
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
