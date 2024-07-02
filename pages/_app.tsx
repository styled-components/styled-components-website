import { MDXProvider } from '@mdx-js/react';
import App from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { bodyFont } from '../utils/fonts';
import components from '../utils/mdx-components';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link rel="icon" type="image/png" href="/favicon.png" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />

          <meta name="theme-color" content="#da936a" />
          <meta name="author" content="styled-components" />
        </Head>

        <ResetStyles />

        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </>
    );
  }
}

const ResetStyles = createGlobalStyle`
  *,::after,::before{background-repeat:no-repeat;box-sizing:inherit}::after,::before{text-decoration:inherit;vertical-align:inherit}html{box-sizing:border-box;cursor:default;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}article,aside,footer,header,nav,section{display:block}body{margin:0}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}nav ol,nav ul{list-style:none}pre{font-family:monospace,monospace;font-size:1em}a{text-decoration:none;color:inherit;background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,canvas,iframe,img,svg,video{vertical-align:middle}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}table{border-collapse:collapse}button,input,optgroup,select,textarea{margin:0}button,input,select,textarea{background-color:transparent;color:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button; cursor: pointer}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto;resize:vertical}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[tabindex],a,area,button,input,label,select,summary,textarea{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}[aria-busy=true]{cursor:progress}[aria-controls]{cursor:pointer}[aria-hidden=false][hidden]:not(:focus){clip:rect(0,0,0,0);display:inherit;position:absolute}[aria-disabled]{cursor:default}

  #__next {
    overflow-x: hidden;
  }

  html, body {
    font-size: 16px;
    line-height: 1.6;
    font-family: ${bodyFont};
    font-variant-ligatures: common-ligatures;
    font-style: normal;
    padding: 0;
    margin: 0;
    color: rgb(46, 68, 78);

    -webkit-font-smoothing: subpixel-antialiased;
  }

  body:has(input#toggle:checked) {
    color: rgb(245, 245, 245);
  }

  body:has(input#toggle:checked) h1 {
    color: rgb(245, 245, 245);
  }

  body:has(input#toggle:checked) #panel {
    background-color: #222;
  }

  body:has(input#toggle:checked) #navbar {
    background-color: #444;
  }

  body.sticky {
    overflow: hidden;
  }

  .root {
    position: relative;
    overflow: auto;
  }

  .small {
    color: white;
    font-size: 0.5em;
  }

  .big {
    color: white;
    font-size: 1.4em;
  }

  strong {
    font-weight: 600;
  }

  code {
    background: rgba(10, 10, 12, 0.1);
    border-radius: 2px;
    font-family: ${bodyFont}, monospace;
    padding: 0 0.1em;
  }

  ul, ol {
    padding-left: 0;
  }

  ul ul, ul ol, ol ol, ol ul {
    padding-left: 1.5em;
  }

  ul li, ol li {
    margin-bottom: 0.75em;
    margin-left: 1em;
    line-height: 1.6;
  }

  ::selection {
    background: rgba(245, 184, 61, 0.25);
  }

  @media all and (max-width: 1000px) {
    html, body {
      font-size: 16px;
    }

    li {
      list-style-position: outside;
      margin-left: 1em;
    }
  }
`;
