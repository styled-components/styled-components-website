import React from 'react';
import renderer from 'react-test-renderer';
import { mockRouter } from '../../utils/test-utils';
import NextPage from '../../components/NextPage';

mockRouter();

test('NextPage renders correctly', () => {
  const tree = renderer.create(<NextPage href="" />).toJSON();

  expect(tree).toMatchSnapshot();
});
