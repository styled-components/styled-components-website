'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
const INPUT_ID = 'docs-search-input';

export default function AlgoliaSearch(props: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const [isDocs, setIsDocs] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && pathname.startsWith('/docs')) setIsDocs(true);

    if (process.env.NODE_ENV !== 'test') {
      import('@docsearch/js').then(mdl => {
        const placeholder = isDocs ? `Search ...` : `Search docs ...`;

        mdl.default({
          apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
          appId: 'BH4D9OD16A',
          container: '#docs-search-input',
          indexName: 'styled-components',
          placeholder,
          translations: {
            modal: {
              searchBox: {
                searchInputAriaLabel: 'Search documentation',
                searchInputPlaceholder: placeholder,
              } as any,
            },
          },
        });
      });
    }
  }, [pathname, isDocs]);

  return <div {...props} id={INPUT_ID} />;
}
