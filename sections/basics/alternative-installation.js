import md from 'components/md'

const AlternativeInstallation = () => md`
    ## Alternative Installation

    If you're not using a module bundler or package manager we also have a global ("UMD") build hosted on the [unpkg](http://unpkg.com) CDN. Simply add the following \`<script>\` tag to the bottom of your HTML file:

    \`\`\`
    <script src="https://unpkg.com/styled-components/dist/styled-components.min.js" type="text/javascript"></script>
    \`\`\`

    Alternatively you can install \`styled-components\` with [bower](https://bower.io):

    \`\`\`
    bower install styled-components=https://unpkg.com/styled-components/dist/styled-components.min.js
    \`\`\`

    Once you've added \`styled-components\` you will have access to the global \`window.styled\` variable.
`

export default AlternativeInstallation
