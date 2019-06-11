import React from 'react';
import renderer from 'react-test-renderer';
import NavLinks from '../../../components/Nav/NavLinks';

test('NavLinks renders correctly', () => {
  const tree = renderer.create(<NavLinks />).toJSON();

  expect(tree).toMatchSnapshot();
});
