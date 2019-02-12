import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import routinesReducer from '../reducers/routines';
import rootSaga from '../sagas';

const rootReducer = combineReducers({
  routines: routinesReducer
});

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    applyMiddleware(
      sagaMiddleware
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;