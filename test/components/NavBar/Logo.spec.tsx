import React from 'react';
import renderer from 'react-test-renderer';
import Logo from '../../../components/Nav/Logo';

test('Logo renders correctly', () => {
  const tree = renderer.create(<Logo />).toJSON();

  expect(tree).toMatchSnapshot();
});
