# Adding icons & sites to the showcase

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
