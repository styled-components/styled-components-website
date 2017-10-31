const yaml = require('js-yaml')
const fs = require('fs')

const translations = yaml.load(fs.readFileSync(__dirname + '/translations.yml'))
const nav = yaml.load(fs.readFileSync(__dirname + '/nav.yml'))
const home = yaml.load(fs.readFileSync(__dirname + '/home.yml'))
const docs = yaml.load(fs.readFileSync(__dirname + '/docs.yml'))
const docsBasics = yaml.load(fs.readFileSync(__dirname + '/docsBasics.yml'))
const docsAdvanced = yaml.load(fs.readFileSync(__dirname + '/docsAdvanced.yml'))
const docsApi = yaml.load(fs.readFileSync(__dirname + '/docsApi.yml'))

export default {
  translations,
  nav,
  home,
  docs,
  docsBasics,
  docsAdvanced,
  docsApi,
}
