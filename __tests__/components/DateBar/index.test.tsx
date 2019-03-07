import * as Enzyme from 'enzyme';
import * as React from 'react';
import enzymeToJson from 'enzyme-to-json';

import DateBar from '../../../src/components/DateBar';

test('renders without errors', () => {
  const wrapper = Enzyme.shallow(<DateBar />);
  expect(enzymeToJson(wrapper)).toMatchSnapshot();
});
