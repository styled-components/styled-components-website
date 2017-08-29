import NextHead from 'next/head'
import { Component } from 'react'

const defaultTitle = 'styled-components'
const defaultDescription = 'Visual primitives for the component age. Use the best bits of ES6 and CSS to style your apps without stress 💅'
const defaultImage = 'https://www.styled-components.com/static/atom.png'

// const CreateMarkup = text => ({ __html: text })


export default class SeoHead extends Component {
  render() {
    const props = this.props
    return (
      <NextHead>
        <title>
          {props.title || defaultTitle}
        </title>

        <meta name="description" content={props.description || defaultDescription} />

        {/* Open Graph */}
        <link itemProp="url" href="https://styled-components.com/"/>
        <meta itemProp="name" content={props.title || defaultTitle} />
        <meta itemProp="description" content={props.description || defaultDescription} />
        <meta itemProp="image" content="/static/atom.png" />


        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title || defaultTitle} />
        <meta property="og:url" content={props.url || ''} />
        <meta property="og:image" content={props.image || defaultImage} />
        <meta property="og:image:height" content="652" />
        <meta property="og:image:width" content="652" />
        <meta property="og:description" content={props.description || defaultDescription} />
        <meta property="og:site_name" content="styled-components" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mxstbr" />
        <meta name="twitter:title" content={props.title || defaultTitle} />
        <meta name="twitter:description" content={props.description || defaultDescription} />
        <meta name="twitter:creator" content="@mxstbr" />
        <meta name="twitter:image" content={props.image || defaultImage} />
        <meta name="twitter:url" content={props.url || ''} />
        <meta name="twitter:image:src" content="https://styled-components.com/static/meta.png" />

        <link rel="canonical" href={`https://www.styled-components.com${props.canonical || props.url || ''}`} />

        {props.children}

        <link rel="shortcut icon" href="/static/atom.png" />
        <link rel="icon" href="/static/atom.png" />
        
        
        {/*<script
          type="application/ld+json"
          dangerouslySetInnerHTML={CreateMarkup(
            JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'WebSite',
              url: '',
              potentialAction: [
                {
                  '@type': 'SearchAction',
                  target: '',
                  'query-input': 'required name=search_term_string'
                }
              ]
            })
          )}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={CreateMarkup(
            JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Organization',
              name: '',
              url: '',
              logo: '',
              sameAs: []
            })
          )}
        /> */}
      </NextHead>
    )
  }
}
