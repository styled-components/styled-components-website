import 'jest-styled-components';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Router from 'next/router';

// Mock next/router, otherwise <Link prefetch> breaks tests
const mockedRouter = { push: () => {}, prefetch: () => {} };

// @ts-expect-error mock
Router.router = mockedRouter;

Enzyme.configure({ adapter: new Adapter() });
