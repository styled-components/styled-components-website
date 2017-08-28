import md from 'components/md'

const StylelintConfig = () => md`
  ## Stylelint Config

  ### Why

  When using [stylelint-processor-styled-components](https://github.com/styled-components/stylelint-processor-styled-components)
  a couple of stylelint rules throw errors that you cannot prevent. Like
  '[no-empty-source](https://stylelint.io/user-guide/rules/no-empty-source)' or
  '[no-missing-end-of-source-newline](https://stylelint.io/user-guide/rules/no-missing-end-of-source-newline)'.

  This shareable config will automatically disable rules that cause unresolvable conflicts. Besides
  those rules vendor prefixed [properties](https://stylelint.io/user-guide/rules/property-no-vendor-prefix)
  and [values](https://stylelint.io/user-guide/rules/value-no-vendor-prefix) will throw an error since
  styled-components automatically generates vendor prefixes for your css. Note that if you want to
  change any of these rules you can always override them in your stylelint config.

  ### Installation

  \`\`\`
  npm install stylelint-config-styled-components-processor --save-dev
  \`\`\`

  ### Usage

  After installing, add this config to your stylelint config like so:

  \`\`\`
  {
    "extends": "stylelint-config-styled-components-processor"
  }
  \`\`\`

  If you're extending multiple shareable configs, put this config as the last so it overrides the relevant rules in all previous configs:

  \`\`\`
  {
    "extends": [
      "stylelint-config-standard",
      "stylelint-config-styled-components-processor"
    ]
  }
  \`\`\`
  See also the [stylint configuration](https://stylelint.io/user-guide/configuration) for documentation on the various ways
  stylelint can be configured.
`

export default StylelintConfig
