import elementToText from './elementToText';

const titleToDash = (title: React.ReactNode) =>
  elementToText(title)
    .toLowerCase()
    .replace(/[^\w\d\s.-]/g, '')
    .replace(/\s+/g, '-');

export default titleToDash;
