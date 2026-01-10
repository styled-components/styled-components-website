import styled, {
  createGlobalStyle,
  css,
  keyframes,
  StyleSheetManager,
  ThemeProvider,
  withTheme,
} from 'styled-components';
import stylisRTLPlugin from 'stylis-plugin-rtl';

// mimic babel plugin's behaviour to support SSR
const hash = 'runner';
const componentIdCache = new Map<string, number>();

const getComponentId = (key: string) => {
  if (!componentIdCache.has(key)) {
    componentIdCache.set(key, componentIdCache.size);
  }
  return `sc-${hash}-${componentIdCache.get(key)}`;
};

const hijackedStyled = (...args: Parameters<typeof styled>) => {
  return styled(...args).withConfig({
    componentId: getComponentId('base'),
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

export const reset = () => {
  componentIdCache.clear();
};

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
