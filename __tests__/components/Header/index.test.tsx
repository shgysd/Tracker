import * as Enzyme from 'enzyme';
import * as React from 'react';
import enzymeToJson from 'enzyme-to-json';

import Header from '../../../src/components/Header';

test('renders without errors', () => {
  const wrapper = Enzyme.shallow(<Header />);
  expect(enzymeToJson(wrapper)).toMatchSnapshot();
});
