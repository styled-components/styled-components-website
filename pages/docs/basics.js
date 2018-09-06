import React from 'react'
import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Motivation from '../../sections/basics/motivation.mdx'
import GettingStarted from '../../sections/basics/getting-started.mdx'
import ComingFromCSS from '../../sections/basics/coming-from-css.mdx'
import Installation from '../../sections/basics/installation.mdx'
import AlternativeInstallation from '../../sections/basics/alternative-installation.mdx'
import PassedProps from '../../sections/basics/passed-props.mdx'
import AdaptingBasedOnProps from '../../sections/basics/adapting-based-on-props.mdx'
import StylingAnyComponents from '../../sections/basics/styling-any-components.mdx'
import ExtendingStyles from '../../sections/basics/extending-styles.mdx'
import AttachingAdditionalProps from '../../sections/basics/attaching-additional-props.mdx'
import Animations from '../../sections/basics/animations.mdx'
import ReactNative from '../../sections/basics/react-native.mdx'

const Basics = () => (
  <DocsLayout title="Basics" description="Get Started with styled-components basics.">
    <Motivation />
    <Installation />
    <AlternativeInstallation />
    <GettingStarted />
    <ComingFromCSS />
    <PassedProps />
    <AdaptingBasedOnProps />
    <StylingAnyComponents />
    <ExtendingStyles />
    <AttachingAdditionalProps />
    <Animations />
    <ReactNative />

    <NextPage
      href="/docs/advanced"
      title="Advanced"
    />
  </DocsLayout>
)

export default Basics
