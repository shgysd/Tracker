import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import routinesReducer from '../reducers/routines';
import usersReducer from '../reducers/users';
import rootSaga from '../sagas';

const rootReducer = combineReducers({
  routines: routinesReducer,
  users: usersReducer
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