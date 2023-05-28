import React from 'react';
import renderer from 'react-test-renderer';
import NextPage from '../../components/NextPage';

jest.mock('next/router');

test('NextPage renders correctly', () => {
  const tree = renderer.create(<NextPage href="" />).toJSON();

  expect(tree).toMatchSnapshot();
});
