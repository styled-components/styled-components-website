import { join, resolve } from 'path'
import { launch } from 'puppeteer'
import { toMatchImageSnapshot } from 'jest-image-snapshot'
import next from 'next'

import docs from '../pages/docs.json'

expect.extend({ toMatchImageSnapshot })
jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000

const globalCss = `
  * {
    -webkit-animation: unset !important;
    animation: unset !important;
    font-family: 'Arial' !important;
    font-smooth: never !important;
  }

  pre, pre * {
    font-family: 'Courier' !important;
  }
`

const PORT = process.env.PORT || 12345

describe('Pages', () => {
  let errors = []
  let browser
  let page
  let app

  beforeAll(async () => {
    app = next({
      dir: '.',
      dev: false,
      quiet: true,
      conf: {}
    })

    await app.start(PORT, 'localhost')
    browser = await launch({
      executablePath: process.env.GOOGLE_CHROME_BINARY || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-lcd-text']
    })
    page = await browser.newPage()

    page.on('request', req => {
      if (!req.url.startsWith(`http://localhost:${PORT}`) && !req.url.endsWith('fonts.css')) {
        req.abort()
      } else {
        req.continue()
      }
    })

    page.on('pageerror', err => {
      errors.push(err)
    })

    await page.setRequestInterceptionEnabled(true);
    await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 1 })
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
    await app.close()
  })

  beforeEach(() => {
    errors = []
  })

  const assertPage = (docPage, isFirst) => {
    const message = isFirst ? `should match ${docPage.title} snapshot` : `should render ${docPage.title} until the end of the docs page`;

    it(message, async () => {
      await page.goto(`http://localhost:${PORT}/docs/${docPage.pathname}`)
      await page.addStyleTag({ content: globalCss })

      const element = await page.$('.end-of-docs')
      expect(element).not.toBe(null)

      // We'll only test the first page for a matching screenshot
      if (isFirst) {
        const screenshot = await page.screenshot({ fullPage: true })

        expect(screenshot).toMatchImageSnapshot({
          customSnapshotIdentifier: docPage.title,
          customSnapshotsDir: resolve(__dirname, '__image_snapshots__'),
          failureThreshold: '0.06',
          failureThresholdType: 'percent'
        })
      }

      expect(errors).toEqual([])
    })
  }

  for (let i = 0; i < docs.pages.length; i++) {
    const docPage = docs.pages[i]
    assertPage(docPage, i === 0)
  }
})
