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
  similarWebGlobalRank: number;
  style: React.HTMLAttributes<HTMLElement>['style'];
}

const companies: Company[] = [
  {
    key: 'https://www.imdb.com',
    similarWebGlobalRank: 54,
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
    similarWebGlobalRank: 114,
    name: 'BBC',
    logo: CompanyLogos.BBCLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://spotify.com',
    similarWebGlobalRank: 111,
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
    similarWebGlobalRank: 239,
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
    similarWebGlobalRank: 300,
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
    similarWebGlobalRank: 533,
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
    similarWebGlobalRank: 783,
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
    similarWebGlobalRank: 830,
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
    similarWebGlobalRank: 1079,
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
    similarWebGlobalRank: 1509,
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
    similarWebGlobalRank: 2001,
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
    similarWebGlobalRank: 2203,
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
    similarWebGlobalRank: 3075,
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
    similarWebGlobalRank: 5628,
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
    similarWebGlobalRank: 6221,
    name: 'UnderArmour',
    logo: CompanyLogos.UnderArmourLogo,
    style: {
      height: '2.3rem',
    },
    projects: {},
  },
  {
    key: 'https://www.shpock.com',
    similarWebGlobalRank: 11112,
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
    similarWebGlobalRank: 17576,
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
    key: 'https://www.welcometothejungle.com/',
    similarWebGlobalRank: 23268,
    name: 'Welcome to the jungle',
    logo: CompanyLogos.WelcomeUILogo,
    style: {},
    projects: {
      welcomeui: {
        title: 'Welcome UI',
        link: 'https://www.welcome-ui.com',
        src: '/screenshots/thumbnails/welcome-ui.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'welcome-ui',
      },
    },
  },
  {
    key: 'https://www.volkswagen.de/de.html',
    similarWebGlobalRank: 75049,
    name: 'Volkswagen',
    logo: CompanyLogos.VolkswagenLogo,
    style: {
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'http://taskade.com/',
    similarWebGlobalRank: 136144,
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
    key: 'https://prisma.io',
    similarWebGlobalRank: 183831,
    name: 'Prisma',
    logo: CompanyLogos.PrismaLogo,
    style: {},
    projects: {
      prisma: {
        title: 'Prisma',
        link: 'https://prisma.io/',
        repo: 'https://github.com/prisma/prisma',
        src: '/screenshots/thumbnails/prisma.io.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'prisma',
      },
    },
  },
  {
    key: 'https://www.redbullmusicacademy.com/',
    similarWebGlobalRank: 470372,
    name: 'Red Bull Music',
    logo: CompanyLogos.RedBullLogo,
    style: {},
    projects: {
      redbull: {
        title: 'Red Bull Music',
        link: 'https://www.redbullmusicacademy.com/',
        src: '/screenshots/thumbnails/redbullmusicacademy.com.png',
        width: 1280,
        height: 720,
        internalUrl: 'redbull',
      },
    },
  },
];

export default companies;

export const sortedCompanies = companies.sort((a, b) => a.similarWebGlobalRank - b.similarWebGlobalRank);

export interface SortedProject extends Project {
  owner: Company['name'];
}

export const sortedProjects = sortedCompanies.reduce(
  (projects, company) => ({
    ...projects,
    ...Object.entries(company.projects || {}).reduce(
      (projects, [name, project]) => ({
        ...projects,
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
