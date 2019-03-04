import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store/configureStore';
import Navigator from './src/components/navigatiors';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Navigator />
    </PersistGate>
  </Provider>
  );
};

export default App;
