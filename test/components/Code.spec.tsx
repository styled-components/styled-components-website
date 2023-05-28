import React from 'react';
import renderer from 'react-test-renderer';
import Code from '../../components/Code';

test('Code renders correctly', () => {
  const tree = renderer.create(<Code />).toJSON();

  expect(tree).toMatchSnapshot();
});
