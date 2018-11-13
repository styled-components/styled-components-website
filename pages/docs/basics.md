import DocsLayout from '../../components/DocsLayout'
import NextPage from '../../components/NextPage'

import Motivation from '../../sections/basics/motivation.md'
import GettingStarted from '../../sections/basics/getting-started.md'
import ObjectStyles from '../../sections/basics/object-styles.md'
import ComingFromCSS from '../../sections/basics/coming-from-css.md'
import Installation from '../../sections/basics/installation.md'
import PassedProps from '../../sections/basics/passed-props.md'
import AdaptingBasedOnProps from '../../sections/basics/adapting-based-on-props.md'
import StylingAnyComponents from '../../sections/basics/styling-any-components.md'
import ExtendingStyles from '../../sections/basics/extending-styles.md'
import AttachingAdditionalProps from '../../sections/basics/attaching-additional-props.md'
import Animations from '../../sections/basics/animations.md'
import ReactNative from '../../sections/basics/react-native.md'

export default ({ children }) => (
  <DocsLayout title="Basics" description="Get Started with styled-components basics.">
    {children}
  </DocsLayout>
)

<Motivation />
<Installation />
<GettingStarted />
<ObjectStyles />
<AdaptingBasedOnProps />
<ExtendingStyles />
<StylingAnyComponents />
<PassedProps />
<ComingFromCSS />
<AttachingAdditionalProps />
<Animations />
<ReactNative />

<NextPage href="/docs/advanced" title="Advanced" />
