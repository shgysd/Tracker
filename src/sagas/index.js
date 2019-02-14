import { fork } from 'redux-saga/effects';
import { handleSetRoutine, handleDeleteRoutine, handleUpdateProgress, handleGetRoutine,  } from './routineSaga'
import { handleLogin } from './userSaga';

export default function* rootSaga() {
  yield fork(handleSetRoutine);
  yield fork(handleDeleteRoutine);
  yield fork(handleUpdateProgress);
  yield fork(handleGetRoutine);

  yield fork(handleLogin);
};