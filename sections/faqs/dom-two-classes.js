import md from 'components/md'

const TwoDomClasses = () => md`
  ## Why does a DOM node have two classes?

  Each node actually has two classes connected to it;

  One is static per component meaning that each instance of a component has this class, but it hasn't any style attached to it. However, it can be used to help the developer smoothly tweak all instances of a class at once.

  The other is dynamic, and it's this class which contains all the styling for specific components of a class. This is the class you usually modify.

`
export default TwoDomClasses
