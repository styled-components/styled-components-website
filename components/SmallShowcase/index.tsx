import { Project } from 'companies-manifest';
import Link from 'next/link';
import styled from 'styled-components';
import { theme } from '../../utils/theme';

export interface SmallShowcaseProps {
  projects: Record<string, Project>;
}

export default function SmallShowcase({ projects }: SmallShowcaseProps) {
  return (
    <Wrapper>
      {Object.values(projects)
        .slice(0, 6)
        .map((project, index) => (
          <Website key={project.title} as={Link} href={`/showcase?item=${project.internalUrl}`} $position={index}>
            <RatioBox>
              <Screenshot style={{ backgroundImage: `url(${project.src})` }} />
              <Label>{project.title}</Label>
            </RatioBox>
          </Website>
        ))}
    </Wrapper>
  );
}

const scaleFactor = [1.8, 1.4, 1];

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 32px;
  padding: 24px;
  transform: translateY(20%);
  margin-top: -96px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
    transform: translateY(28%);
    margin-top: -96px;
    padding: 32px;
  }

  @media (min-width: 800px) {
    width: 120%;
    padding: 0;
    max-width: 1280px;
    margin-top: 0px;
    display: flex;
    transform: translateY(50%);
  }
`;

const Label = styled.label<React.LabelHTMLAttributes<HTMLLabelElement>>`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: max-content;
  max-width: 100%;
  transform: translate(-50%, 50%);
  background-color: ${theme.color.bg};
  color: ${theme.color.text};
  font-family: var(--font-sans);
  padding: 0.25em 1em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 0.4em;
  box-shadow:
    0 10px 20px ${theme.color.shadow},
    0 5px 12px ${theme.color.shadow};
  opacity: 0;
  transition: all ${theme.duration.normal} ease-out;

  @media (min-width: 800px) {
    font-size: 0.65rem;
  }
`;

const Website = styled.div<{ $position: number; as?: React.ElementType; children?: React.ReactNode }>`
  display: block;
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: translate 180ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0ms;
    translate: none;
  }

  &:hover {
    translate: 0 -6px;
  }

  &:hover ${Label} {
    opacity: 1;
  }

  @media (min-width: 800px) {
    padding: 12px;
    z-index: ${props => 2 - Math.abs(props.$position - 2)};
    display: ${props => (props.$position > 4 ? 'none' : 'block')};
    transform: scale(${props => scaleFactor[Math.abs(props.$position - 2)]});

    ${Label} {
      font-size: ${props => `${0.65 / (scaleFactor[Math.abs(props.$position - 2)] ?? 1)}rem`};
    }
  }
`;

const RatioBox = styled.div`
  padding-top: 56.25%;
  position: relative;
  width: 100%;
`;

const Screenshot = styled.div<{ style?: React.CSSProperties }>`
  background-size: cover;
  border-radius: 4px;
  box-shadow:
    0 10px 20px ${theme.color.shadow},
    0 5px 12px ${theme.color.shadow};
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;
