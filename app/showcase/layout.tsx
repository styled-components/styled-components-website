import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Showcase',
  description: 'Awesome websites built with styled-components',
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
