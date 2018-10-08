### `enzymeFind` | v4

A convenience method for finding instances of a particular styled component within an enyzme wrapper.

```jsx
import { mount } from 'enzyme'
import styled, { enzymeFind } from 'styled-components/test-utils'

const Foo = styled.div`
  color: red;
`

const wrapper = mount(
  <div>
    <Foo>bar</Foo>
  </div>
)

enzymeFind(wrapper, Foo)
```
