import NextLink from 'next/link';
import type { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

const Section = styled.div`
  display: grid;
  gap: ${theme.space[4]};
  margin: 1.75em 0;

  @media (min-width: ${650 / 16}em) {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 24rem);
    align-items: center;
    gap: ${theme.space[8]};
  }
`;

const Text = styled.div`
  p {
    margin-top: 0;
    text-wrap: balance;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const Card = styled(NextLink)`
  display: block;
  justify-self: start;
  width: 100%;
  max-width: 24rem;
  overflow: hidden;
  line-height: 0;
  text-decoration: none;
  border: 1px solid color-mix(in oklch, ${theme.color.text} 8%, ${theme.color.surface});
  border-radius: ${theme.radius.xl};
  transition:
    border-color ${theme.duration.normal},
    transform ${theme.duration.fast};

  &:hover,
  &:focus-visible {
    border-color: color-mix(in oklab, ${theme.palette[11]} 50%, ${theme.color.border});
    transform: translateY(-1px);
  }

  @media (min-width: ${650 / 16}em) {
    justify-self: stretch;
    max-width: none;
  }
`;

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1200 / 630;
  object-fit: cover;
`;

export default function CompatibilityPreviewCard({ children }: PropsWithChildren) {
  return (
    <Section>
      <Text>{children}</Text>
      <Card href="/docs/compatibility" aria-label="Open the React Native CanIUse compatibility matrix">
        <PreviewImage
          src="/docs/compatibility/opengraph-image"
          alt="React Native CanIUse compatibility matrix preview"
          loading="lazy"
        />
      </Card>
    </Section>
  );
}
