import React from 'react';
import renderer from 'react-test-renderer';
import NextPage from '../../components/NextPage';

test('NextPage renders correctly', () => {
  const tree = renderer.create(<NextPage href="" title="" />).toJSON();

  expect(tree).toMatchSnapshot();
});
