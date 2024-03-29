import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

// Proxy imageshield.io images
const proxyMap: Record<string, string> = {
  'npm-v.svg': 'https://img.shields.io/npm/v/styled-components.svg',
  'size.svg': 'https://img.shields.io/badge/gzip%20size-12.4%20kB-brightgreen.svg',
  'downloads.svg': 'https://img.shields.io/npm/dm/styled-components.svg?maxAge=3600',
  'stars.svg':
    'https://img.shields.io/github/stars/styled-components/styled-components.svg?style=social&label=Star&maxAge=3600',
};

export default function serveProxiedRequest(req: NextApiRequest, res: NextApiResponse) {
  const { asset } = req.query;

  if (!asset) return res.status(404);

  const remoteUrl = proxyMap[Array.isArray(asset) ? asset[0] : asset];

  // Check if we want to proxy this
  if (typeof remoteUrl === 'undefined') {
    return res.status(404).end('Not Found');
  }

  return axios
    .get(remoteUrl, {
      responseType: 'arraybuffer',
    })
    .then(({ data, headers }) => {
      // Cache the response for one hour
      res.setHeader('cache-control', 's-maxage=3600,stale-while-revalidate');

      const contentType = headers['content-type'];
      res.setHeader('content-type', contentType);
      res.end(data, 'binary');
    })
    .catch(() => {
      // Failed to download image
      res.status(500).send('Error');
    });
}
