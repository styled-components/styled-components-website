import elementToText from './elementToText'

const titleToDash = title => (
  elementToText(title)
    .trim()
    .toLowerCase()
    .replace(/[^\w\d\s]/g, '')
    .replace(/\s+/g, '-')
)

export default titleToDash
