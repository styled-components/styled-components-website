import { Video } from './motivation.js'

## Motivation

**styled-components is the result of wondering how we could enhance CSS for styling React component systems.** By focussing on a single use case we managed to optimize the writing experience for developers as well as the output for end users.

Specifically, styled-components enables:

- **Automatic critical CSS**: styled-components keeps track of which components are rendered on a page and injects their styles and nothing else, fully automatically.
- **No class name bugs**: styled-components generates unique class names for your styles. You never have to worry about duplication, overlap or misspellings.
- **Easier deletion of CSS**: it can be hard to know whether a class name is used somewhere in your codebase. styled-components makes it obvious, as every bit of styling is tied to a specific component. If the component is unused (which tooling can detect) and gets deleted, all its styles get deleted with it.

This talk by Max Stoiber is a really thorough introduction to styled-components
and goes through what the motivations behind its creation were, along with some
other information to get started with.

<Video />
