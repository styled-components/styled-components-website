import React, { isValidElement } from 'react';

const whitespacesRe = /\s+/g;
const _format = (str = '') => str.trim().replace(whitespacesRe, ' ');

const elementToTextRec = (x: React.ReactNode): string => {
  if (Array.isArray(x)) {
    return x.map(elementToTextRec).join('');
  } else if (isValidElement(x)) {
    return elementToTextRec(x.props.children);
  } else if (typeof x === 'string') {
    return x || '';
  }

  return '';
};

const elementToText = (node: React.ReactNode) => _format(elementToTextRec(node));

export default elementToText;
