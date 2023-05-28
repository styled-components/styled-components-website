import Router from 'next/router';
import { useEffect, useState } from 'react';
const INPUT_ID = 'docs-search-input';

export default function AlgoliaSearch(props: JSX.IntrinsicElements['div']) {
  const [isDocs, setIsDocs] = useState(false);

  useEffect(() => {
    if (process.browser && Router.pathname.startsWith('/docs')) setIsDocs(true);

    if (process.env.NODE_ENV !== 'test') {
      import('@docsearch/js').then(mdl => {
        mdl.default({
          apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
          appId: 'BH4D9OD16A',
          container: '#docs-search-input',
          indexName: 'styled-components',
          placeholder: isDocs ? `Search ...` : `Search docs ...`,
        });
      });
    }
  }, []);

  return <div {...props} id={INPUT_ID} />;
}
