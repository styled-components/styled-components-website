import elementToText from './elementToText'

const titleToDash = title => (
  elementToText(title)
    .toLowerCase()
    .replace(/[^\w\d\s]/, '')
    .split(' ')
    .join('-')
)

export default titleToDash
