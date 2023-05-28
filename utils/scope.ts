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
let counter = 0;

const hijackedStyled = (...args: Parameters<typeof styled>) => {
  return styled(...args).withConfig({
    componentId: `sc-${hash}-${counter++}`,
  });
};

const ignoredProps = Object.getOwnPropertyNames(Function);
(Object.getOwnPropertyNames(styled) as (keyof typeof styled)[]).forEach(tag => {
  if (ignoredProps.includes(tag)) return;
  Object.defineProperty(hijackedStyled, tag, {
    get() {
      return styled[tag].withConfig({
        componentId: `sc-${hash}-${counter++}`,
      });
    },
  });
});

export const reset = () => {
  counter = 0;
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
