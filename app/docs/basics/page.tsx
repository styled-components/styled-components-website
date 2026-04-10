import { Metadata } from 'next';
import DocsLayout from '@/components/DocsLayout';
import DocsPageNav from '@/components/DocsPageNav';

import Motivation from '@/sections/basics/motivation.mdx';
import Installation from '@/sections/basics/installation.mdx';
import GettingStarted from '@/sections/basics/getting-started.mdx';
import AdaptingBasedOnProps from '@/sections/basics/adapting-based-on-props.mdx';
import ExtendingStyles from '@/sections/basics/extending-styles.mdx';
import StylingAnyComponents from '@/sections/basics/styling-any-component.mdx';
import PassedProps from '@/sections/basics/passed-props.mdx';
import ComingFromCSS from '@/sections/basics/coming-from-css.mdx';
import AttachingAdditionalProps from '@/sections/basics/attaching-additional-props.mdx';
import Animations from '@/sections/basics/animations.mdx';
import ReactNative from '@/sections/basics/react-native.mdx';

export const metadata: Metadata = {
  title: 'The Basics',
  description: 'Get Started with styled-components basics.',
};

export default function BasicsPage() {
  return (
    <DocsLayout title="The Basics">
      <Motivation />
      <Installation />
      <GettingStarted />
      <AdaptingBasedOnProps />
      <ExtendingStyles />
      <StylingAnyComponents />
      <PassedProps />
      <ComingFromCSS />
      <AttachingAdditionalProps />
      <Animations />
      <ReactNative />
      <DocsPageNav current="basics" />
    </DocsLayout>
  );
}
