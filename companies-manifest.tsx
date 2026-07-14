import * as CompanyLogos from './components/CompanyLogos';

export interface Project {
  height: number;
  internalUrl?: string;
  link: string;
  repo?: string;
  src: string;
  title: string;
  width: number;
}

export interface Company {
  key: string;
  logo?: React.ComponentType;
  name: string;
  projects: Record<string, Project>;
  /**
   * Tranco rank (https://tranco-list.eu/). Tranco aggregates Cisco
   * Umbrella, Majestic, Farsight, Cloudflare Radar, and CrUX into a
   * single global popularity ranking that resists day-to-day churn.
   * Used only to sort the showcase grid: lower = more prominent.
   */
  globalRank: number;
  style: React.HTMLAttributes<HTMLElement>['style'];
  /**
   * Render the logo in its source trademark colors instead of the
   * default monochrome silhouette. Use for multi-color marks (Warner
   * Bros shield, etc.) where the monochrome flatten kills inner
   * detail. White-on-X marks (Auth0, LATAM) should leave this false
   * since they need the brightness/invert treatment to be visible
   * on a light background.
   */
  colorFaithful?: boolean;
}

const companies: Company[] = [
  {
    key: 'https://www.imdb.com',
    globalRank: 245,
    name: 'IMDb',
    logo: CompanyLogos.IMDbLogo,
    style: {},
    projects: {
      imdb: {
        title: 'The Internet Movie Database',
        link: 'https://imdb.com/',
        src: '/screenshots/thumbnails/imdb.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'imdb',
      },
    },
  },
  {
    key: 'https://www.bbc.com/',
    globalRank: 200,
    name: 'BBC',
    logo: CompanyLogos.BBCLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://spotify.com',
    globalRank: 63,
    name: 'Spotify',
    logo: CompanyLogos.SpotifyLogo,
    style: {
      bottom: '0.3rem',
      height: '2.5rem',
    },
    projects: {
      spotify: {
        title: 'Spotify',
        link: 'https://spotify.com/',
        src: '/screenshots/thumbnails/spotify.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'spotify',
      },
    },
  },
  {
    key: 'https://www.vimeo.com',
    globalRank: 66,
    name: 'Vimeo',
    logo: CompanyLogos.VimeoLogo,
    style: {
      bottom: '0.3rem',
      height: '2.1rem',
    },
    projects: {},
  },
  {
    key: 'https://www.target.com',
    globalRank: 584,
    name: 'Target',
    logo: CompanyLogos.TargetLogo,
    style: {},
    projects: {
      target: {
        title: 'Target',
        link: 'https://www.target.com',
        src: '/screenshots/thumbnails/www.target.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'target',
      },
    },
  },
  {
    key: 'https://www.patreon.com/',
    globalRank: 541,
    name: 'Patreon',
    logo: CompanyLogos.PatreonLogo,
    style: {},
    projects: {
      patreon: {
        title: 'Patreon',
        link: 'https://patreon.com',
        src: '/screenshots/thumbnails/patreon.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'patreon',
      },
    },
  },
  {
    key: 'https://smallpdf.com',
    globalRank: 3522,
    name: 'Smallpdf',
    logo: CompanyLogos.SmallPdfLogo,
    style: {},
    projects: {
      smallpdf: {
        title: 'Smallpdf',
        link: 'https://smallpdf.com',
        src: '/screenshots/thumbnails/smallpdf.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'smallpdf',
      },
    },
  },
  {
    key: 'https://giphy.com/',
    globalRank: 485,
    name: 'Giphy',
    logo: CompanyLogos.GiphyLogo,
    style: {
      bottom: '0.3rem',
      height: '2.5rem',
    },
    projects: {
      giphy: {
        title: 'Giphy',
        link: 'https://giphy.com/',
        src: '/screenshots/thumbnails/giphy.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'giphy',
      },
    },
  },
  {
    key: 'https://www.ticketmaster.com/',
    globalRank: 2365,
    name: 'Ticketmaster',
    logo: CompanyLogos.TicketmasterLogo,
    style: {
      height: '1.7rem',
    },
    projects: {
      ticketmaster: {
        title: 'Ticketmaster',
        link: 'https://www.ticketmaster.co.uk',
        src: '/screenshots/thumbnails/www.ticketmaster.co.uk.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'ticketmaster',
      },
    },
  },
  {
    key: 'https://www.priceline.com/',
    globalRank: 3873,
    name: 'Priceline',
    logo: CompanyLogos.PricelineLogo,
    style: {},
    projects: {
      priceline: {
        title: 'Priceline',
        link: 'https://www.priceline.com/',
        src: '/screenshots/thumbnails/priceline.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'priceline',
      },
    },
  },
  {
    key: 'https://www.coinbase.com',
    globalRank: 2282,
    name: 'Coinbase',
    logo: CompanyLogos.CoinbaseLogo,
    style: {
      bottom: '0.3rem',
      height: '2rem',
    },
    projects: {
      coinbase: {
        title: 'Coinbase',
        link: 'https://coinbase.com',
        src: '/screenshots/thumbnails/coinbase.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'coinbase',
      },
    },
  },
  {
    key: 'https://www.xing.com',
    globalRank: 1006,
    name: 'Xing',
    logo: CompanyLogos.XingLogo,
    style: {
      bottom: '0.7rem',
      height: '2.5rem',
    },
    projects: {},
  },
  {
    key: 'https://www.vogue.com',
    globalRank: 26642,
    name: 'Vogue',
    logo: CompanyLogos.VogueLogo,
    style: {
      height: '1.8rem',
    },
    projects: {
      vogue: {
        title: 'Vogue',
        link: 'https://vogue.de',
        src: '/screenshots/thumbnails/vogue.de.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'vogue',
      },
    },
  },
  {
    key: 'https://auth0.com',
    globalRank: 1777,
    name: 'Auth0',
    logo: CompanyLogos.Auth0Logo,
    style: {},
    projects: {
      auth0: {
        title: 'Auth0',
        link: 'https://auth0.com/',
        src: '/screenshots/thumbnails/auth0.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'auth0',
      },
    },
  },
  {
    key: 'https://www.underarmour.com',
    globalRank: 10980,
    name: 'UnderArmour',
    logo: CompanyLogos.UnderArmourLogo,
    style: {
      height: '2.3rem',
    },
    projects: {},
  },
  {
    key: 'https://www.shpock.com',
    globalRank: 98889,
    name: 'Shpock',
    logo: CompanyLogos.ShpockLogo,
    style: {
      bottom: '0.4rem',
      height: '3rem',
    },
    projects: {},
  },
  {
    key: 'https://www.artsy.net',
    globalRank: 9054,
    name: 'Artsy',
    logo: CompanyLogos.ArtsyLogo,
    style: {
      bottom: '0.16rem',
      height: '2.25rem',
    },
    projects: {
      artsy: {
        title: 'Artsy',
        link: 'https://www.artsy.net/',
        src: '/screenshots/thumbnails/artsy.net.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'artsy',
      },
    },
  },
  {
    key: 'https://www.volkswagen.de/de.html',
    globalRank: 10766,
    name: 'Volkswagen',
    logo: CompanyLogos.VolkswagenLogo,
    style: {
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'http://taskade.com/',
    globalRank: 39854,
    name: 'Taskade',
    logo: CompanyLogos.TaskadeLogo,
    style: {},
    projects: {
      taskade: {
        title: 'Taskade',
        link: 'http://taskade.com/',
        src: '/screenshots/thumbnails/taskade.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'taskade',
      },
    },
  },
  {
    key: 'https://www.redbullmusicacademy.com/',
    globalRank: 85770,
    name: 'Red Bull Music',
    logo: CompanyLogos.RedBullLogo,
    style: {},
    projects: {
      redbull: {
        title: 'Red Bull Music',
        link: 'https://www.redbullmusicacademy.com/',
        src: '/screenshots/thumbnails/redbullmusicacademy.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'redbull',
      },
    },
  },
  {
    key: 'https://www.warnerbros.com',
    globalRank: 1031,
    name: 'Warner Bros.',
    logo: CompanyLogos.WarnerBrosLogo,
    colorFaithful: true,
    style: {},
    projects: {
      warnerbros: {
        title: 'Warner Bros.',
        link: 'https://www.warnerbros.com',
        src: '/screenshots/thumbnails/www.warnerbros.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'warnerbros',
      },
    },
  },
  {
    key: 'https://www.latamairlines.com',
    globalRank: 4703,
    name: 'LATAM Airlines',
    logo: CompanyLogos.LatamLogo,
    style: {},
    projects: {
      latamairlines: {
        title: 'LATAM Airlines',
        link: 'https://www.latamairlines.com',
        src: '/screenshots/thumbnails/latamairlines.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'latamairlines',
      },
    },
  },
  {
    key: 'https://www.northwesternmutual.com',
    globalRank: 7927,
    name: 'Northwestern Mutual',
    logo: CompanyLogos.NorthwesternMutualLogo,
    colorFaithful: true,
    style: {},
    projects: {
      northwesternmutual: {
        title: 'Northwestern Mutual',
        link: 'https://www.northwesternmutual.com',
        src: '/screenshots/thumbnails/northwesternmutual.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'northwesternmutual',
      },
    },
  },
  {
    key: 'https://www.sixt.com',
    globalRank: 14028,
    name: 'SIXT',
    logo: CompanyLogos.SixtLogo,
    style: {},
    projects: {
      sixt: {
        title: 'SIXT',
        link: 'https://www.sixt.com',
        src: '/screenshots/thumbnails/sixt.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'sixt',
      },
    },
  },
  {
    key: 'https://www.northropgrumman.com',
    globalRank: 26708,
    name: 'Northrop Grumman',
    logo: CompanyLogos.NorthropGrummanLogo,
    colorFaithful: true,
    style: {},
    projects: {
      northropgrumman: {
        title: 'Northrop Grumman',
        link: 'https://www.northropgrumman.com',
        src: '/screenshots/thumbnails/northropgrumman.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'northropgrumman',
      },
    },
  },
  {
    key: 'https://www.smh.com.au',
    globalRank: 2224,
    name: 'The Sydney Morning Herald',
    style: {},
    projects: {
      smh: {
        title: 'The Sydney Morning Herald',
        link: 'https://www.smh.com.au',
        src: '/screenshots/thumbnails/smh.com.au.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'smh',
      },
    },
  },
  {
    key: 'https://fortune.com',
    globalRank: 1090,
    name: 'Fortune',
    logo: CompanyLogos.FortuneLogo,
    style: {},
    projects: {
      fortune: {
        title: 'Fortune',
        link: 'https://fortune.com',
        src: '/screenshots/thumbnails/fortune.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'fortune',
      },
    },
  },
  {
    key: 'https://www.entrepreneur.com',
    globalRank: 2314,
    name: 'Entrepreneur',
    logo: CompanyLogos.EntrepreneurLogo,
    style: {},
    projects: {
      entrepreneur: {
        title: 'Entrepreneur',
        link: 'https://www.entrepreneur.com',
        src: '/screenshots/thumbnails/entrepreneur.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'entrepreneur',
      },
    },
  },
  {
    key: 'https://www.liverpoolecho.co.uk',
    globalRank: 10515,
    name: 'Liverpool Echo',
    style: {},
    projects: {
      liverpoolecho: {
        title: 'Liverpool Echo',
        link: 'https://www.liverpoolecho.co.uk',
        src: '/screenshots/thumbnails/liverpoolecho.co.uk.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'liverpoolecho',
      },
    },
  },
  {
    key: 'https://plos.org',
    globalRank: 1120,
    name: 'PLOS',
    logo: CompanyLogos.PLOSLogo,
    style: {},
    projects: {
      plos: {
        title: 'PLOS',
        link: 'https://plos.org',
        src: '/screenshots/thumbnails/plos.org.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'plos',
      },
    },
  },
  {
    key: 'https://wistia.com',
    globalRank: 3377,
    name: 'Wistia',
    style: {},
    projects: {
      wistia: {
        title: 'Wistia',
        link: 'https://wistia.com',
        src: '/screenshots/thumbnails/wistia.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'wistia',
      },
    },
  },
  {
    key: 'https://www.bristolpost.co.uk',
    globalRank: 23277,
    name: 'Bristol Live',
    style: {},
    projects: {
      bristollive: {
        title: 'Bristol Live',
        link: 'https://www.bristolpost.co.uk',
        src: '/screenshots/thumbnails/bristolpost.co.uk.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'bristollive',
      },
    },
  },
  {
    key: 'https://www.formstack.com',
    globalRank: 5974,
    name: 'Formstack',
    style: {},
    projects: {
      formstack: {
        title: 'Formstack',
        link: 'https://www.formstack.com',
        src: '/screenshots/thumbnails/formstack.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'formstack',
      },
    },
  },
  {
    key: 'https://movember.com',
    globalRank: 19471,
    name: 'Movember',
    style: {},
    projects: {
      movember: {
        title: 'Movember',
        link: 'https://movember.com',
        src: '/screenshots/thumbnails/movember.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'movember',
      },
    },
  },
  {
    key: 'https://www.trustwave.com',
    globalRank: 14048,
    name: 'LevelBlue',
    style: {},
    projects: {
      levelblue: {
        title: 'LevelBlue',
        link: 'https://www.trustwave.com',
        src: '/screenshots/thumbnails/trustwave.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'levelblue',
      },
    },
  },
  {
    key: 'https://www.firstnews.co.uk',
    globalRank: 126334,
    name: 'First News',
    style: {},
    projects: {
      firstnews: {
        title: 'First News',
        link: 'https://www.firstnews.co.uk',
        src: '/screenshots/thumbnails/firstnews.co.uk.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'firstnews',
      },
    },
  },
];

export default companies;

export const sortedCompanies = companies.toSorted((a, b) => a.globalRank - b.globalRank);

export interface SortedProject extends Project {
  owner: Company['name'];
}

export const sortedProjects = sortedCompanies.reduce(
  (projects, company) => ({
    ...projects,
    ...Object.entries(company.projects || {}).reduce(
      (companyProjects, [name, project]) => ({
        ...companyProjects,
        [name]: {
          ...project,
          owner: company.name,
        },
      }),
      {}
    ),
  }),
  {} as Record<string, SortedProject>
);
