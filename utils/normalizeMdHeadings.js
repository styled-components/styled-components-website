const firstHeadingMatch = /^(\s*)(#+)(\s.+)$/m
const allHeadingsMatch = /^(\s*)(#+)(\s.+)$/mg

const warningMessage = `
normalizeMdHeadings() - Invalid starting level:

Please use a value greater than 0.
No changes have been made to your markdown.
`

// dict of created headings to keep from calling Array().fill().join() more than needed.
const headingsDict = {}

const getHeading = (level = 1) => {
  // prevent attempts at getting/making a heading < 1
  level = Math.max(level, 1)

  // if heading level hasn't been made before, make and add to dict
  if (!headingsDict[level]) {
    headingsDict[level] = Array(level)
    .fill('#')
    .join('')
  }

  return headingsDict[level]
}

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
    `${leadingSpace}${getHeading(level.length + modifier)}${content}`
  ))

}

export default normalizeMdHeadings
