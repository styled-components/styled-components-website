import renderer from 'react-test-renderer';
import Link, { InlineLink, StyledLink } from '../../components/Link';

test('Link renders correctly', () => {
  const tree = renderer.create(<Link href="/" />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('StyledLink renders correctly', () => {
  const tree = renderer.create(<StyledLink href="/" />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('InlineLink renders correctly', () => {
  const tree = renderer.create(<InlineLink href="/" />).toJSON();

  expect(tree).toMatchSnapshot();
});
