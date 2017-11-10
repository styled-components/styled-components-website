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

    await page.setRequestInterceptionEnabled(true);
    await page.setViewport({ width: 600, height: 400, deviceScaleFactor: 1 })
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
    await app.close()
  })

  const assertPage = async (docPage) => {
    await page.goto(`http://localhost:${PORT}/docs/${docPage.pathname}`)
    await page.addStyleTag({ content: globalCss })

    const screenshot = await page.screenshot({ fullPage: true })

    expect(screenshot).toMatchImageSnapshot({
      customSnapshotIdentifier: docPage.title,
      customSnapshotsDir: resolve(__dirname, '__image_snapshots__'),
      failureThreshold: '0.05',
      failureThresholdType: 'percent'
    })
  }

  it('renders all pages correctly', async () => {
    for (const docPage of docs.pages) {
      await assertPage(docPage)
    }
  })
})
