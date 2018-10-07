## Why do my DOM nodes have two classes?

Each node actually has two classes connected to it: one is static per component, meaning each element of a styled component has this class. It hasn't any style attached to it. Instead, it's used to quickly identify which styled component a DOM objects belongs to or to make minor changes in the DevTools. It's also used for [component selectors](/docs/advanced#referring-to-other-components). The static class probably will look something like: `.sc-fVOeaW`.

The other is dynamic, meaning it will be different for every element of your styled component with different props, based on what the interpolations result in. It will probably look like `.fVOeaW` (note the lack of "sc" prefix.)

For example, the styled component `<Button />` would render with the same static class every time. If the styles are changed using interpolations, like `<Button secondary />`, then the dynamic class will be a different one, while the static class would remain the same.
