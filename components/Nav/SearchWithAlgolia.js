import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import Search from './Search';

export default function AlgoliaSearch({ className, requestModalClose }) {
  const [isDocs, setIsDocs] = useState(false);

  useEffect(() => {
    if (process.browser && Router.pathname.startsWith('/docs')) setIsDocs(true);

    if (process.env.NODE_ENV !== 'test') {
      import('docsearch.js').then(mdl => {
        mdl.default({
          apiKey: '79886fb59ad3ebe2002b481cffbbe7cb',
          indexName: 'styled-components',
          inputSelector: '#docs-search-input',
          debug: true, // Set debug to true if you want to inspect the dropdown
          handleSelected: (input, event, suggestion) => {
            // original handleselect
            requestModalClose();
            input.setVal('');
            window.location.assign(suggestion.url);
          },
        });
      });
    }
  }, [requestModalClose]);

  return <Search isDocs={isDocs} className={className} />;
}
