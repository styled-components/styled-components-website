import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
import 'jest-styled-components';

Enzyme.configure({ adapter: new Adapter() });
