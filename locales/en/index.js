const yaml = require('js-yaml')
const fs = require('fs')

const translations = yaml.load(fs.readFileSync(__dirname + '/translations.yml'))
const home = yaml.load(fs.readFileSync(__dirname + '/home.yml'))
const docs = yaml.load(fs.readFileSync(__dirname + '/docs.yml'))

export default {
  translations,
  home,
  docs,
}
