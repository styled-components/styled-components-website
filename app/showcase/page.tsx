import styled, { css } from 'styled-components';
import { ArrowOutward } from '@styled-icons/material';
import { sortedCompanies, sortedProjects, SortedProject } from '@/companies-manifest';
import Footer from '@/components/Footer';
import ShowcaseTile from '@/components/ShowcaseTile';
import { mobile, phone } from '@/utils/media';
import { theme, font } from '@/utils/theme';

export const metadata = {
  title: 'Showcase',
  description: 'Production interfaces shipping styled-components today: IMDb, Spotify, Coinbase, Vogue, and more.',
};

const companyByOwner = new Map(sortedCompanies.map(c => [c.name, c]));

function pickLogo(project: SortedProject) {
  return companyByOwner.get(project.owner)?.logo;
}

function isColorFaithful(project: SortedProject) {
  return companyByOwner.get(project.owner)?.colorFaithful ?? false;
}

export default function Showcase() {
  const projects = Object.values(sortedProjects);
  const [featured, ...rest] = projects;

  return (
    <>
      <Page>
        <Wrapper>
          <Intro>
            <h1>Out in the world.</h1>
            <Lede>You've probably used a few of these this week.</Lede>
          </Intro>

          {featured && (
            <ShowcaseTile
              project={featured}
              Logo={pickLogo(featured)}
              colorFaithful={isColorFaithful(featured)}
              featured
              priority
              index={0}
            />
          )}

          <Grid aria-label="Production sites built with styled-components">
            {rest.map((project, i) => (
              <ShowcaseTile
                key={project.internalUrl ?? project.link}
                project={project}
                Logo={pickLogo(project)}
                colorFaithful={isColorFaithful(project)}
                index={i + 1}
              />
            ))}
          </Grid>

          <ShareRow>
            <span>Shipping something with styled-components?</span>
            <ShareLink
              href="https://github.com/styled-components/styled-components-website/issues/new?template=company-showcase-request.md&title=Add+%5Bproject%5D+by+%5Bcompany%5D+to+showcase"
              target="_blank"
              rel="noopener noreferrer"
            >
              Submit it for the wall
              <ArrowOutward />
            </ShareLink>
          </ShareRow>
        </Wrapper>
      </Page>
      <Footer />
    </>
  );
}

const Page = styled.div`
  padding: 96px 0 64px;
  color: ${theme.color.text};

  ${mobile(css`
    padding: 72px 0 48px;
  `)}

  ${phone(css`
    padding: 56px 0 32px;
  `)}
`;

const Wrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  padding: 0 64px;
  display: flex;
  flex-direction: column;
  gap: 48px;

  ${mobile(css`
    padding: 0 32px;
    gap: 40px;
  `)}

  ${phone(css`
    padding: 0 20px;
    gap: 32px;
  `)}
`;

const Intro = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 60ch;

  h1 {
    font-family: ${font.display};
    font-weight: ${theme.fontWeight.display};
    font-size: clamp(2.5rem, 6vw, 4rem);
    line-height: 1.02;
    letter-spacing: -0.03em;
    margin: 0;
  }
`;

const Lede = styled.p`
  margin: 0;
  font-size: ${theme.text.md};
  line-height: 1.55;
  color: ${theme.color.textSecondary};
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 56px 32px;

  ${mobile(css`
    grid-template-columns: repeat(2, 1fr);
    gap: 48px 24px;
  `)}

  ${phone(css`
    grid-template-columns: 1fr;
    gap: 40px;
  `)}
`;

const ShareRow = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  padding: 32px 0 0;
  border-top: 1px solid ${theme.color.border};
  color: ${theme.color.textSecondary};
  font-size: ${theme.text.base};
`;

const ShareLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${theme.color.text};
  font-weight: ${theme.fontWeight.semibold};
  text-decoration: none;
  border-bottom: 1px solid ${theme.color.linkUnderline};
  padding-bottom: 2px;
  transition:
    border-color 180ms ease,
    transform 180ms ${theme.ease.out};

  svg {
    height: 16px;
    transition: transform 180ms ${theme.ease.out};
  }

  &:hover {
    border-bottom-color: ${theme.color.linkUnderlineHover};

    svg {
      transform: translate(2px, -2px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`;
