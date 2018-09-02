const dev = process.env.NODE_ENV !== 'production'
const moduleAlias = require('module-alias')

if (!dev) {
  moduleAlias.addAlias('react', 'preact-compat')
  moduleAlias.addAlias('react-dom', 'preact-compat')
}

const { parse } = require('url')
const express = require('express')
const LRUCache = require('lru-cache')
const next = require('next')
const axios = require('axios')

const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 * 24, // 24h
})

const cachedRender = (req, res, pagePath, queryParams) => {
  const key = `${req.url}`

  if (!dev && ssrCache.has(key)) {
    res.append('X-Cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      ssrCache.set(key, html)

      res.append('X-Cache', 'MISS')
      res.send(html)
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams)
    })
}

const cachedProxyServer = (req, res, imgUrl, remoteUrl) => {
  const key = `/proxy/${imgUrl}`

  if (!dev && ssrCache.has(key)) {
    const cached = ssrCache.get(key)
    res.append('X-Cache', 'HIT')
    res.type(cached.contentType)
    res.end(cached.data)
    return
  }

  axios
    .get(remoteUrl, {
      responseType: 'arraybuffer',
    })
    .then(({ data, headers }) => {
      const contentType = headers['content-type']

      // Save to cache for future
      ssrCache.set(key, { data, contentType })
      res.append('X-Cache', 'MISS')

      res.type(contentType)
      res.end(data, 'binary')
    })
    .catch(() => {
      // Failed to download image
      res.status(500).send('Error')
    })
}

const PORT = process.env.PORT || 3000

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by')

  server.get('/docs', (req, res) => {
    cachedRender(req, res, '/docs')
  })

  server.get('/docs/basics', (req, res) => {
    cachedRender(req, res, '/docs/basics')
  })

  server.get('/docs/advanced', (req, res) => {
    cachedRender(req, res, '/docs/advanced')
  })

  server.get('/docs/api', (req, res) => {
    cachedRender(req, res, '/docs/api')
  })

  // Proxy imageshield.io images
  const proxyMap = {
    'npm-v.svg': 'https://img.shields.io/npm/v/styled-components.svg',
    'size.svg':
      'https://img.shields.io/badge/gzip%20size-14.6%20kB-brightgreen.svg',
    'downloads.svg':
      'https://img.shields.io/npm/dm/styled-components.svg?maxAge=3600',
    'stars.svg':
      'https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star&maxAge=3600',
  }

  // Define proxied routes
  server.get('/proxy/:imgUrl', async (req, res, next) => {
    const { imgUrl } = req.params
    const remoteUrl = proxyMap[imgUrl]

    // Check if we want to proxy this
    if (typeof remoteUrl === 'undefined') {
      // Let NextJS handle it (edither a route or 404 error)
      next()
      return
    }

    cachedProxyServer(req, res, imgUrl, remoteUrl)
  })

  server.use(
    '/static',
    express.static('./static', {
      maxage: '48h',
      index: false,
      redirect: false,
    }),
  )

  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  server.listen(PORT, err => {
    if (err) {
      throw err
    }

    console.log(`> Ready on http://localhost:${PORT}`)
  })
})
