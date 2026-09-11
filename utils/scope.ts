import styled, {
  createGlobalStyle,
  css,
  keyframes,
  StyleSheetManager,
  ThemeProvider,
  withTheme,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

type StyledFactory = ReturnType<typeof styled.div>;

function hasWithConfig(value: unknown): value is StyledFactory {
  return (
    typeof value === 'function' && 'withConfig' in value && typeof (value as StyledFactory).withConfig === 'function'
  );
}

/**
 * Live editors need stable, scope-prefixed componentIds so multiple
 * react-live previews on one page don't collide. In styled-components v7,
 * tag shorthands (`styled.a`, `styled.div`, …) are Proxy getters — they are
 * not own properties — so we must forward via Proxy rather than copying
 * Object.getOwnPropertyNames(styled).
 */
function createHijackedStyled(scopeId: string): typeof styled {
  const getComponentId = (key: string) => `sc-${scopeId}-${key}`;

  const hijacked = ((...args: Parameters<typeof styled>) => {
    const target = args[0];
    const name =
      (typeof target === 'function' && (target.displayName || target.name)) ||
      (typeof target === 'string' && target) ||
      'ext';
    return styled(...args).withConfig({
      componentId: getComponentId(name),
    });
  }) as typeof styled;

  return new Proxy(hijacked, {
    get(target, prop, receiver) {
      if (typeof prop === 'symbol' || prop in target) {
        return Reflect.get(target, prop, receiver);
      }

      const factory = Reflect.get(styled, prop);
      if (hasWithConfig(factory)) {
        return factory.withConfig({
          componentId: getComponentId(String(prop)),
        });
      }

      return factory;
    },
    has(target, prop) {
      return prop in target || prop in styled;
    },
  });
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
