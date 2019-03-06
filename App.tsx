import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from './src/store/configureStore';
import Routine from './src/containers/Routine';

console.disableYellowBox = true;

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routine />
      </PersistGate>
    </Provider>
  );
};

export default App;
