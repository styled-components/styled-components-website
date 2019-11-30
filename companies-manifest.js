import {
  AirBnBLogo,
  ArtsyLogo,
  AtlassianLogo,
  AutodeskLogo,
  Auth0Logo,
  BBCLogo,
  BraveLogo,
  BirchboxLogo,
  BlaBlaCarLogo,
  BlockchainLogo,
  BloombergLogo,
  BlueTomatoLogo,
  CasperLogo,
  ChangeOrgLogo,
  CoinbaseLogo,
  CultureTripLogo,
  DisneyPlusLogo,
  DoorDashLogo,
  EddieBauerLogo,
  EurostarLogo,
  EuroVisionLogo,
  GeniusLogo,
  GitHubLogo,
  GoogleLogo,
  HuffpostLogo,
  IdeoLogo,
  InVisionLogo,
  JaneLogo,
  KiwiComLogo,
  LegoLogo,
  MagicLeapLogo,
  MoleskineLogo,
  PatreonLogo,
  RedditLogo,
  SeatGeekLogo,
  SesameLogo,
  ShpockLogo,
  SmartLogo,
  TargetLogo,
  TicketmasterLogo,
  TinderLogo,
  TypeformLogo,
  TruliaLogo,
  UnderArmourLogo,
  VimeoLogo,
  VogueLogo,
  XingLogo,
  LyftLogo,
  VolkswagenLogo,
  FramerLogo,
  PricelineLogo,
} from './components/CompanyLogos';

const companies = [
  {
    key: 'https://www.autodesk.com',
    similarWebGlobalRank: 1425,
    logo: AutodeskLogo,
    style: {
      bottom: '-0.1rem',
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'https://www.airbnb.com',
    similarWebGlobalRank: 20,
    logo: AirBnBLogo,
    style: {
      bottom: '0.3rem',
      height: '2.5rem',
    },
    projects: {
      airbnb: {
        title: 'Airbnb Cereal',
        link: 'https://airbnb.design/cereal/',
        src: '/static/screenshots/thumbnails/airbnb.design-cereal.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'airbnb',
      },
    },
  },
  {
    key: 'https://www.artsy.net',
    similarWebGlobalRank: 17576,
    logo: ArtsyLogo,
    style: {
      bottom: '0.16rem',
      height: '2.25rem',
    },
    projects: {},
  },
  {
    key: 'https://www.atlassian.com/',
    similarWebGlobalRank: 2505,
    logo: AtlassianLogo,
    style: {
      height: '1.75rem',
    },
    projects: {
      atlaskit: {
        title: 'AtlasKit',
        link: 'https://atlaskit.atlassian.com',
        src: '/static/screenshots/thumbnails/atlaskit.atlassian.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'atlaskit',
      },
    },
  },
  {
    key: 'https://auth0.com',
    similarWebGlobalRank: 5628,
    logo: Auth0Logo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.bbc.com/',
    similarWebGlobalRank: 114,
    logo: BBCLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.blablacar.fr',
    similarWebGlobalRank: 3803,
    logo: BlaBlaCarLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://brave.com/',
    similarWebGlobalRank: 13395,
    logo: BraveLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.bloomberg.com',
    similarWebGlobalRank: 507,
    logo: BloombergLogo,
    style: {
      bottom: '-0.2rem',
      height: '1.75rem',
    },
    projects: {},
  },
  {
    key: 'https://www.blue-tomato.com',
    similarWebGlobalRank: 21322,
    logo: BlueTomatoLogo,
    style: {
      bottom: '0.75rem',
      height: '3.3rem',
    },
    projects: {},
  },
  {
    key: 'http://casper.com/',
    similarWebGlobalRank: 33785,
    logo: CasperLogo,
    style: {
      bottom: '-0.2rem',
    },
    projects: {
      casper: {
        title: 'Casper',
        link: 'https://casper.com/',
        src: '/static/screenshots/thumbnails/casper.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'casper',
      },
    },
  },
  {
    key: 'https://theculturetrip.com',
    similarWebGlobalRank: 4945,
    logo: CultureTripLogo,
    style: {
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'https://www.coinbase.com',
    similarWebGlobalRank: 2001,
    logo: CoinbaseLogo,
    style: {
      bottom: '0.3rem',
      height: '2rem',
    },
    projects: {
      coinbase: {
        title: 'Coinbase',
        link: 'https://coinbase.com',
        src: '/static/screenshots/thumbnails/coinbase.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'coinbase',
      },
    },
  },
  {
    key: 'https://www.disneyplus.com/',
    similarWebGlobalRank: 7707,
    logo: DisneyPlusLogo,
    style: {
      bottom: '0.4rem',
      height: '3rem',
    },
    projects: {
      disneyplus: {
        title: 'Disney+',
        link: 'https://www.disneyplus.com/',
        src: '/static/screenshots/thumbnails/www.disneyplus.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'disneyplus',
      },
    },
  },
  {
    key: 'https://www.doordash.com/',
    similarWebGlobalRank: 2831,
    logo: DoorDashLogo,
    style: {
      bottom: '-0.2rem',
    },
    projects: {},
  },
  {
    key: 'https://eurovision.tv/',
    similarWebGlobalRank: 38132,
    logo: EuroVisionLogo,
    style: {
      bottom: '0.1rem',
      height: '2.5rem',
    },
    projects: {},
  },
  {
    key: 'https://eddiebauer.com',
    similarWebGlobalRank: 11625,
    logo: EddieBauerLogo,
    style: {
      bottom: '0.1rem',
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'https://github.com/',
    similarWebGlobalRank: 76,
    logo: GitHubLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.huffpost.com',
    similarWebGlobalRank: 950,
    logo: HuffpostLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.ideo.com',
    similarWebGlobalRank: 117384,
    logo: IdeoLogo,
    style: {
      bottom: '-0.15rem',
      height: '1.5rem',
    },
    projects: {},
  },
  {
    key: 'https://www.invisionapp.com',
    similarWebGlobalRank: 2368,
    logo: InVisionLogo,
    style: {
      bottom: '0.1rem',
      height: '2.25rem',
    },
    projects: {
      invision: {
        title: 'Invision',
        link: 'https://invisionapp.com',
        src: '/static/screenshots/thumbnails/invisionapp.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'invision',
      },
    },
  },
  {
    key: 'https://www.kiwi.com',
    similarWebGlobalRank: 4612,
    logo: KiwiComLogo,
    style: {
      bottom: '0.3rem',
      height: '2.75rem',
    },
    projects: {},
  },
  {
    key: 'https://www.lego.com',
    similarWebGlobalRank: 2008,
    logo: LegoLogo,
    style: {},
    projects: {
      'lego-store': {
        title: 'Lego Store',
        link: 'https://lego.com',
        src: '/static/screenshots/thumbnails/lego.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'lego-store',
      },
    },
  },
  {
    key: 'https://www.magicleap.com/',
    similarWebGlobalRank: 119765,
    logo: MagicLeapLogo,
    style: {
      bottom: '1rem',
      height: '4rem',
    },
    projects: {},
  },
  {
    key: 'https://www.moleskine.com',
    similarWebGlobalRank: 70404,
    logo: MoleskineLogo,
    style: {
      bottom: '-0.15rem',
      height: '1.3rem',
    },
    projects: {
      moleskinestudio: {
        title: 'Moleskine Digital Studio',
        link: 'https://moleskinestudio.com/',
        src: '/static/screenshots/thumbnails/moleskinestudio.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'moleskine',
      },
    },
  },
  {
    key: 'https://www.patreon.com/',
    similarWebGlobalRank: 533,
    logo: PatreonLogo,
    style: {},
    projects: {
      patreon: {
        title: 'Patreon',
        link: 'https://patreon.com',
        src: '/static/screenshots/thumbnails/patreon.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'patreon',
      },
    },
  },
  {
    key: 'https://www.reddit.com/',
    similarWebGlobalRank: 20,
    logo: RedditLogo,
    style: {
      bottom: '0.15rem',
    },
    projects: {},
  },
  {
    key: 'https://seatgeek.com',
    similarWebGlobalRank: 7292,
    logo: SeatGeekLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.sesamegifts.com/',
    similarWebGlobalRank: 500301,
    logo: SesameLogo,
    style: {},
    projects: {},
  },
  {
    key: 'https://www.shpock.com',
    similarWebGlobalRank: 11112,
    logo: ShpockLogo,
    style: {
      bottom: '0.4rem',
      height: '3rem',
    },
    projects: {},
  },
  {
    key: 'https://smart.com',
    similarWebGlobalRank: 70739,
    logo: SmartLogo,
    style: {
      bottom: '0.1rem',
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'https://www.target.com',
    similarWebGlobalRank: 300,
    logo: TargetLogo,
    style: {},
    projects: {
      target: {
        title: 'Target',
        link: 'https://www.target.com',
        src: '/static/screenshots/thumbnails/www.target.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'target',
      },
    },
  },
  {
    key: 'https://www.ticketmaster.com/',
    similarWebGlobalRank: 1079,
    logo: TicketmasterLogo,
    style: {
      height: '1.7rem',
    },
    projects: {
      ticketmaster: {
        title: 'Ticketmaster',
        link: 'https://www.ticketmaster.co.uk',
        src: '/static/screenshots/thumbnails/www.ticketmaster.co.uk.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'ticketmaster',
      },
    },
  },
  {
    key: 'https://tinder.com/',
    similarWebGlobalRank: 561,
    logo: TinderLogo,
    style: {
      bottom: '0.2rem',
    },
    projects: {
      swipelife: {
        title: 'Swipelife',
        link: 'https://swipelife.tinder.com/',
        src: '/static/screenshots/thumbnails/swipelife.tinder.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'swipelife',
      },
    },
  },
  {
    key: 'https://www.typeform.com',
    similarWebGlobalRank: 3279,
    logo: TypeformLogo,
    style: {
      bottom: '0.15rem',
      height: '2.35rem',
    },
    projects: {},
  },
  {
    key: 'https://www.underarmour.com',
    similarWebGlobalRank: 6221,
    logo: UnderArmourLogo,
    style: {
      height: '2.3rem',
    },
    projects: {},
  },
  {
    key: 'https://www.vimeo.com',
    similarWebGlobalRank: 239,
    logo: VimeoLogo,
    style: {
      bottom: '0.3rem',
      height: '2.1rem',
    },
    projects: {},
  },
  {
    key: 'https://www.vogue.com',
    similarWebGlobalRank: 3075,
    logo: VogueLogo,
    style: {
      height: '1.8rem',
    },
    projects: {
      vogue: {
        title: 'Vogue',
        link: 'https://vogue.de',
        src: '/static/screenshots/thumbnails/vogue.de.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'vogue',
      },
    },
  },
  {
    key: 'https://www.xing.com',
    similarWebGlobalRank: 2203,
    logo: XingLogo,
    style: {
      bottom: '0.7rem',
      height: '2.5rem',
    },
    projects: {},
  },
  {
    key: 'https://jane.com',
    similarWebGlobalRank: 21426,
    logo: JaneLogo,
    style: {
      height: '2.0rem',
    },
    projects: {},
  },
  {
    key: 'https://google.com',
    similarWebGlobalRank: 1,
    logo: GoogleLogo,
    style: {
      height: '2.3rem',
    },
    projects: {},
  },
  {
    key: 'https://genius.com',
    similarWebGlobalRank: 366,
    logo: GeniusLogo,
    style: {
      height: '1.5rem',
    },
    projects: {},
  },
  {
    key: 'https://www.eurostar.com',
    similarWebGlobalRank: 11380,
    logo: EurostarLogo,
    style: {
      height: '2.3rem',
    },
    projects: {},
  },
  {
    key: 'http://change.org/',
    similarWebGlobalRank: 551,
    logo: ChangeOrgLogo,
    style: {
      bottom: '-0.2rem',
    },
    projects: {},
  },
  {
    key: 'https://www.trulia.com/',
    similarWebGlobalRank: 257,
    logo: TruliaLogo,
    style: {
      bottom: '0.1rem',
    },
    projects: {},
  },
  {
    key: 'https://birchbox.com/',
    similarWebGlobalRank: 38199,
    logo: BirchboxLogo,
    style: {
      height: '1.3rem',
      bottom: '-0.2rem',
    },
    projects: {},
  },
  {
    key: 'https://blockchain.com/',
    similarWebGlobalRank: 4797,
    logo: BlockchainLogo,
    style: {
      height: '1.3rem',
    },
    projects: {},
  },
  {
    key: 'https://www.volkswagen.de/de.html',
    similarWebGlobalRank: 75049,
    logo: VolkswagenLogo,
    style: {
      height: '2rem',
    },
    projects: {},
  },
  {
    key: 'https://spectrum.chat',
    similarWebGlobalRank: 95528,
    logo: null,
    style: {},
    projects: {
      spectrum: {
        title: 'Spectrum',
        link: 'https://spectrum.chat',
        src: '/static/screenshots/thumbnails/spectrum.chat.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'spectrum',
      },
    },
  },
  {
    key: 'https://tsm.gg',
    similarWebGlobalRank: 273875,
    logo: null,
    style: {},
    projects: {
      tsm: {
        title: 'TSM',
        link: 'https://tsm.gg',
        src: '/static/screenshots/thumbnails/tsm.gg.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'tsm',
      },
    },
  },
  {
    key: 'https://fortnitemaster.com',
    similarWebGlobalRank: 332652,
    logo: null,
    style: {},
    projects: {
      fortnitemaster: {
        title: 'Fornite Master',
        link: 'https://fortnitemaster.com/',
        src: '/static/screenshots/thumbnails/fortnitemaster.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'fortnitemaster',
      },
    },
  },
  {
    key: 'https://prisma.io',
    similarWebGlobalRank: 183831,
    logo: null,
    style: {},
    projects: {
      prisma: {
        title: 'Prisma',
        link: 'https://prisma.io/',
        src: '/static/screenshots/thumbnails/prisma.io.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'prisma',
      },
    },
  },
  {
    key: 'https://www.lyft.com/',
    similarWebGlobalRank: 3783,
    logo: LyftLogo,
    style: {
      height: '2.3rem',
    },
    projects: {
      lyft: {
        title: 'Lyft',
        link: 'https://www.lyft.com',
        src: '/static/screenshots/thumbnails/lyft.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'lyft',
      },
    },
  },
  {
    key: 'https://framer.com/',
    similarWebGlobalRank: 185723,
    logo: FramerLogo,
    style: {},
    projects: {
      framer: {
        title: 'Framer',
        link: 'https://framer.com',
        src: '/static/screenshots/thumbnails/framer.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'framer',
      },
    },
  },
  {
    key: 'https://www.priceline.com/',
    similarWebGlobalRank: 1509,
    logo: PricelineLogo,
    style: {},
    projects: {
      priceline: {
        title: 'Priceline',
        link: 'https://www.priceline.com/',
        src: '/static/screenshots/thumbnails/priceline.com.jpg',
        width: 1280,
        height: 720,
        internalUrl: 'priceline',
      },
    },
  },
];

export default companies;

// sorting logic: the more popular a website, the higher it gets listed
export const sortedCompanies = companies.sort((a, b) => a.similarWebGlobalRank - b.similarWebGlobalRank);
export const sortedProjects = sortedCompanies.reduce((projects, company) => ({ ...projects, ...company.projects }), {});
