import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import routinesReducer from '../reducers/routines';
import listsReducer from '../reducers/lists';
import usersReducer from '../reducers/users';
import rootSaga from '../sagas';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  routines: routinesReducer,
  lists: listsReducer,
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    persistedReducer,
    applyMiddleware(
      sagaMiddleware,
    ),
  );
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
