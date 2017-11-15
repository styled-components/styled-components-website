# `styled-components.com`

The `styled-components` website. Built with Next.js, Preact and (of course) styled-components!

## Contributing

Thank you so much for wanting to contribute to the website! We could really use a hand at making it the best it can be, see [the issues](https://github.com/styled-components/styled-components-website/issues) for some ideas on what to do.

If you've never worked with the technologies used in this repo, here are some links that may help:

- [**Learn Next.js**](https://learnnextjs.com/)
- [Next.js documentation](https://github.com/zeit/next.js)
- [react-markings documentation](https://github.com/Thinkmill/react-markings)
- [styled-components documentation](https://styled-components.com) (this very website!)

### Running locally

To develop the website locally, you'll want to run the development server:

```sh
# Download the repo
git clone https://github.com/styled-components/styled-components-website
# Enter the repo
cd styled-components-website
# Install the dependencies
npm install
# Start local development
npm run dev
```

> Note: This requires Node.js and npm to be set up locally, see [nodejs.org](https://nodejs.org) for more information.

### Folder structure

This is what each folder correlates to:

```sh
styled-components-website
├── components/  # Shared components
├── pages/       # The actual pages, mostly containing layout; the directory directly correlates to the URL. (e.g. pages/docs/basics.js === styled-components.com/docs/basics)
├── sections/    # The content, written in Markdown
├── static/      # Assets
├── test/        # Tests
├── utils/       # Various utilities use across the site
└── vendor/      # Cached dependencies
```

### Got stuck?

Feel free to ping us on [Spectrum](https://spectrum.chat/styled-components/website) if you get stuck somewhere while trying to make this website better, let's resolve it together!
