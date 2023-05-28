import React from 'react';
import renderer from 'react-test-renderer';
import Anchor from '../../components/Anchor';

test('Anchor renders correctly', () => {
  const tree = renderer.create(<Anchor />).toJSON();

  expect(tree).toMatchSnapshot();
});
