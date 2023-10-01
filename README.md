# `styled-components.com`

The `styled-components` website made for documentation, showcasing, and enabling users with knowledge on the Styled Components library. 
Built with Next.js, Preact and (of course) styled-components!
> Styled Components is a feature-packed library for adding CSS and JavaScript styling to web applications with ease. 

## Table of Contents

* [Contributing Guideline](#contributing-guideline)
* [Building A Development Server](#building-a-development-server)
* [Folder Structure](#folder-structure)

## Contributing Guideline

Thank you so much for wanting to contribute to the website! We could really use a hand at making it the best it can be, see [the issues](https://github.com/styled-components/styled-components-website/issues) for some ideas on what to do. If you are new to contributing, you can find issues marked as 'good first issue' [here](https://github.com/styled-components/styled-components-website/contribute).

If you've never worked with the technologies used in this repo, here are some links that may help:

- [**Learn Next.js**](https://nextjs.org/learn)
- [Next.js documentation](https://github.com/vercel/next.js)
- [Markdown/MDX with Next.js](https://nextjs.org/blog/markdown)
- [styled-components documentation](https://styled-components.com) (this very website!)

Please follow the standard Github contributing guideline [found here](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) when making a contribution. 

### Code Formatting

The code in this repository uses the prettier-extension for formatting. You can find the configuration file .prettierrc in main.
_See [prettier.io](https://prettier.io/) for more information_.

## Building a Development Server

Before starting, please install [Node.js](https://nodejs.org/en). You will require this to install dependencies using Yarn. Please use a forked repository if contributing. 

### Running locally

To develop the website locally, you'll want to run the development server:

```sh
# Download the repo 
git clone https://github.com/styled-components/styled-components-website
# Enter the repo
cd styled-components-website
# Install the dependencies
yarn install
# Start local development
yarn dev
```

> Note: This requires Node.js and yarn to be set up locally, see [nodejs.org](https://nodejs.org) for more information.

### Updating the visual diffs

If you add a new section or materially change the website, it probably will trigger the image comparison diff snapshot to fail. These can be updated via:

```sh
yarn test -u
```

## Folder structure

A general overview of what each folder correlates to:

```sh
styled-components-website
├── components/  # Shared components
├── pages/       # The actual pages, mostly containing layout; the directory directly correlates to the URL. (e.g. pages/docs/basics.js === styled-components.com/docs/basics)
├── sections/    # The content, written in Markdown
├── public/      # Assets
├── test/        # Tests
├── utils/       # Various utilities use across the site
```
**More information for each folder:**

[**components/**](https://github.com/styled-components/styled-components-website/tree/main/components)
The ```components/``` directory contains reusable React components including things such as buttons, navigation bars, footers, and other UI elements. Styling for these components is integrated using Styled Components library.

[**pages/**](https://github.com/styled-components/styled-components-website/tree/main/pages)
The ```pages/``` directory is where the actual web pages of your website are defined. In Next.js (as mentioned previously documentation), the directory structure often directly correlates to the URL structure of your website. This allows server-side rendering and route handling by Next.js. 

[**sections/**](https://github.com/styled-components/styled-components-website/tree/main/sections)
The ```sections/``` directory contains markdown content for each page. You will find a separate .mdx file for each subheading in a page. This is also where interactive JavaScript and React components are rendered, hence the 'mdx' file extension. _Read more about using mdx file extension at [mdx-js](https://mdxjs.com/)._ 

[**public/**](https://github.com/styled-components/styled-components-website/tree/main/public)
The ```public/``` directory stores assests including images and fonts. Placing assets in this directory allow for optimized cache mechanisms resulting in faster page loading. 

[**test/**](https://github.com/styled-components/styled-components-website/tree/main/test)
The ```test/``` directory contains various testing for rendering components, routing, and utility functions. Tests use various libraries including [Jest](https://jestjs.io/)'s testing framework and [react-test-renderer](https://legacy.reactjs.org/docs/test-renderer.html) to perform various test (i.e. Snapshot Test for UI component rendering). Inside also contains a [test](https://github.com/styled-components/styled-components-website/blob/main/test/utils/elementToText.spec.tsx) for [elementToText](https://github.com/styled-components/styled-components-website/blob/main/utils/elementToText.ts) utility function. 

[**utils/**](https://github.com/styled-components/styled-components-website/tree/main/utils)
The ```utils/``` directory contains various utility functions and modules that are used throughout the website's codebase. These utilities serve various purposes including data manipulation (colors/fonts), CSS formatting (media queries, rem), API interactions, and URL formatting functions. 