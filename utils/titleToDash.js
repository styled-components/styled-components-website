import elementToText from './elementToText';

const titleToDash = title =>
  elementToText(title)
    .toLowerCase()
    .replace(/[^\w\d\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/(-$)|(^-)/g,'')


export default titleToDash;
