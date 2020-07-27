# `styled-components.com`

The `styled-components` website. Built with Next.js, Preact and (of course) styled-components!

## Contributing

Thank you so much for wanting to contribute to the website! We could really use a hand at making it the best it can be, see [the issues](https://github.com/styled-components/styled-components-website/issues) for some ideas on what to do.

If you've never worked with the technologies used in this repo, here are some links that may help:

- [**Learn Next.js**](https://learnnextjs.com/)
- [Next.js documentation](https://github.com/zeit/next.js)
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

### Updating the visual diffs

If you add a new section or materially change the website, it probably will trigger the image comparison diff snapshot to fail. These can be updated via:

```sh
yarn test -u
```

### Adding sites the showcase

When adding new sites to the showcase section, follow these steps:

1. Download the site logo as an svg
2. In `components/CompanyLogos.js`, add your new logo
3. Be sure to convert HTML svg items to their React version. i.e. `fill-rule` should be `fillRule`
4. Take a 1280x720px screenshot of your website . You can do this [in Chrome](https://zapier.com/blog/full-page-screenshots-in-chrome/) or with the help of an extension
5. Compress the image with a tool like [TinyPNG](https://tinypng.com/) or [Squoosh.app](https://squoosh.app/). Keep it less than 300kb if possible
6. Save that image with a filename like this: `mywebsite.com.jpg` and add it to the `public/screenshots/thumbnails/` directory
7. Then add the new site to the company manifest at `companies-manifest.js`. You can copy a previous site, but here is a template:

```
{
    key: 'https://www.jimdo.com/',
    similarWebGlobalRank: 4810,
    name: 'Jimdo',
    logo: JimdoLogo,
    style: {},
    projects: {
      jimdo: {
        title: 'Jimdo',
        link: 'https://www.jimdo.com/',
        src: '/screenshots/thumbnails/jimdo.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'jimdo',
      },
    },
  },
```

8. Don't forget to add your site name to the object inside projects too
9. Check that your page works ok at `http://localhost:3000/showcase?item=NEW_SITE`

Once you've done that, you can make your pull request.

### Folder structure

This is what each folder correlates to:

```sh
styled-components-website
├── components/  # Shared components
├── pages/       # The actual pages, mostly containing layout; the directory directly correlates to the URL. (e.g. pages/docs/basics.js === styled-components.com/docs/basics)
├── sections/    # The content, written in Markdown
├── public/      # Assets
├── test/        # Tests
├── utils/       # Various utilities use across the site
└── vendor/      # Cached dependencies
```

### Got stuck?

Feel free to ping us on [Spectrum](https://spectrum.chat/styled-components/website) if you get stuck somewhere while trying to make this website better, let's resolve it together!
