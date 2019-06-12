import React from 'react';
import renderer from 'react-test-renderer';
import Text from '../../../components/Nav/Text';

test('Text renders correctly', () => {
  const tree = renderer.create(<Text />).toJSON();

  expect(tree).toMatchSnapshot();
});
