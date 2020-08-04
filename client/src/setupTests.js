import fetchMock from "jest-fetch-mock";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
 
Enzyme.configure({ adapter: new Adapter() });
fetchMock.enableMocks();