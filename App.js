import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import Navigator from './src/components/navigatiors';

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  };
};
