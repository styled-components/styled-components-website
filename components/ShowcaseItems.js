import styled from "styled-components"

const sites = [
  {
    name: "Target",
    url: "https://www.target.com",
    image: "www.target.com.png"
  },
  {
    name: "Patreon",
    url: "https://patreon.com",
    image: "patreon.com.png"
  },
  {
    name: "Lego Store",
    url: "https://shop.lego.com",
    image: "shop.lego.com.png"
  },
  {
    name: "Ticketmaster",
    url: "https://www.ticketmaster.co.uk",
    image: "www.ticketmaster.co.uk.png"
  },
  {
    name: "Atlassian Atlaskit",
    url: "https://atlaskit.atlassian.com",
    image: "atlaskit.atlassian.com.png"
  },
  {
    name: "Typeform",
    url: "https://typeform.com",
    image: "typeform.com.png"
  },
  {
    name: "Coinbase",
    url: "https://coinbase.com",
    image: "coinbase.com.png"
  },
  {
    name: "Spectrum",
    url: "https://spectrum.chat",
    image: "spectrum.chat.png"
  },
  {
    name: "Vogue",
    url: "https://vogue.de",
    image: "vogue.de.png"
  },
  {
    name: "TSM",
    url: "https://tsm.gg",
    image: "tsm.gg.png"
  },
  {
    name: "Invision",
    url: "https://invisionapp.com",
    image: "invisionapp.com.png"
  }
]

const ShowcaseItem = styled(({ name, url, image, ...props }) =>
  <div {...props}>
    <h2>
      <a href={url}>
        {name}
      </a>
    </h2>
    <div className="screenshot" style={{backgroundImage: `url(/static/screenshots/${image})`}} />
  </div>
)`
  flex-basis: 50%;
  padding: 16px;

  .screenshot {
    width: 100%;
    height: 200px;
    background-size: cover;
  }
`

const ShowcaseItems = styled(p =>
  <div {...p}>
    {sites.map((site, i) => <ShowcaseItem {...site} key={i} />)}
  </div>
)`
  display: flex;
  flex-wrap: wrap;
`
export default ShowcaseItems
