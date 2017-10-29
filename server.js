const dev = process.env.NODE_ENV !== 'production'
const moduleAlias = require('module-alias')
const path = require('path')

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

const { parse } = require('url')
const express = require('express')
const LRUCache = require('lru-cache')
const next = require('next')

// i18n translations
const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./utils/i18n')
const {
    LANGUAGES,
    TRANSLATIONS,
} = require('./constants/i18n')

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const router = express.Router()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24 // 24h
})

const cachedRender = (req, res, pagePath, queryParams) => {
  const key = `${req.url}`

  if (!dev && ssrCache.has(key)) {
    res.append('X-Cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  app.renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      ssrCache.set(key, html)

      res.append('X-Cache', 'MISS')
      res.send(html)
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}

i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    preload: LANGUAGES,
    languages: LANGUAGES,
    ns: TRANSLATIONS,
    load: 'languageOnly', // we only provide en, de -> no region specific locals like en-US, de-DE
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.yml',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.yml'
    },
    detection: {
      order: ['path', 'querystring', 'header'],
    }
}, () => {
  app.prepare()
    .then(() => {
      const PORT = process.env.PORT || 3000

      const server = express()

      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n))

      // serve locales for client
      server.use('/locales', express.static(__dirname + '/locales'))

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

      server.disable('x-powered-by')

      i18nextMiddleware.addRoute(i18n, '/', LANGUAGES, router, 'get', (req, res) => {
        const lng = req.i18n.languages[0]
        res.redirect(`/${lng}`)
      })

      i18nextMiddleware.addRoute(i18n, '/:lng', LANGUAGES, router, 'get', (req, res) => {
        cachedRender(req, res, '/')
      })

      i18nextMiddleware.addRoute(i18n, '/:lng/docs', LANGUAGES, router, 'get', (req, res) => {
        cachedRender(req, res, '/docs')
      })

      i18nextMiddleware.addRoute(i18n, '/:lng/docs/basics', LANGUAGES, router, 'get', (req, res) => {
        cachedRender(req, res, '/docs/basics')
      })

      i18nextMiddleware.addRoute(i18n, '/:lng/docs/advanced', LANGUAGES, router, 'get', (req, res) => {
        cachedRender(req, res, '/docs/advanced')
      })

      i18nextMiddleware.addRoute(i18n, '/:lng/docs/api', LANGUAGES, router, 'get', (req, res) => {
        cachedRender(req, res, '/docs/api')
      })

      server.get('/sw.js', (req, res) => {
        res.sendFile(path.resolve('./.next/sw.js'))
      })

      server.use('/static', express.static('./static', {
        maxage: '48h',
        index: false,
        redirect: false
      }))

      router.get('*', (req, res) => {
        const parsedUrl = parse(req.url, true)
        handle(req, res, parsedUrl)
      })

      server.use('/', router)

      server.listen(PORT, err => {
        if (err) {
          throw err
        }

        console.log(`> Ready on http://localhost:${PORT}`)
      })
    })
})
