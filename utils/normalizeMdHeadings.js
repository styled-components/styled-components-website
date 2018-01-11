const firstHeadingMatch = /^(\s*)(#+)(\s.+)$/m
const allHeadingsMatch = /^(\s*)(#+)(\s.+)$/mg

const warningMessage = `
normalizeMdHeadings() - Invalid starting level:

Please use a value greater than 0.
No changes have been made to your markdown.
`

const createHeading = (level = 1) =>
  Array(Math.max(level, 1))
  .fill('#')
  .join('')

const normalizeMdHeadings = (md, startingLevel = 1) => {
  if (startingLevel < 1) {
    console.warn(warningMessage)
    return md
  }

  const firstHeading = md.match(firstHeadingMatch)

  if (!firstHeading) {
    return md
  }

  const modifier = startingLevel - firstHeading[2].length

  return md.replace(allHeadingsMatch, (match, leadingSpace, level, content) => (
    `${leadingSpace}${createHeading(level.length + modifier)}${content}`
  ))

}

export default normalizeMdHeadings
