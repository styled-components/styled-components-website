export interface Author {
  github?: string;
  twitter?: string;
  website?: string;
  websiteHost?: string;
}

const authors: Record<string, Author> = {
  'Evan Jacobs': {
    github: 'quantizor',
    twitter: 'quantizor',
    website: 'https://quantizor.dev',
  },
  'Max Stoiber': {
    github: 'mxstbr',
    twitter: 'mxstbr',
    website: 'https://mxstbr.com',
  },
  'Chase McCoy': {
    github: 'chasemccoy',
    twitter: 'chase_mccoy',
    website: 'https://chsmc.org',
  },
  'Scott Spence': {
    github: 'spences10',
    twitter: 'spaborern',
    website: 'https://scottspence.com',
  },
  'Andreas Reiterer': {
    github: 'areiterer',
    twitter: 'a_reiterer',
    website: 'https://www.andreasreiterer.at',
  },
  'Eugene Gluhotorenko': {
    github: 'gevgeny',
    twitter: 'egluhotorenko',
    website: 'https://e.gluhotorenko.com',
  },
  'Adam Gruber': {
    github: 'adamgruber',
  },
  'Alan B Smith': {
    github: 'alanbsmith',
    twitter: '_alanbsmith',
  },
  'Matt Granmoe': {
    github: 'granmoe',
  },
  'Zach Sherman': {
    github: 'zsherman',
    website: 'https://www.zach.sh',
  },
};

// Precompute websiteHost to avoid URL parsing at render time
for (const author of Object.values(authors)) {
  if (author.website) {
    author.websiteHost = new URL(author.website).hostname.replace('www.', '');
  }
}

export function getAuthor(name: string): Author {
  return authors[name] ?? {};
}
