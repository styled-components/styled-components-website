import React from 'react';
import renderer from 'react-test-renderer';
import NavSeparator from '../../../components/Nav/NavSeparator';

test('NavSeparator renders correctly', () => {
  const tree = renderer.create(<NavSeparator />).toJSON();

  expect(tree).toMatchSnapshot();
});
