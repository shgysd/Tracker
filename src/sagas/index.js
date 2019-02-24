import { fork } from 'redux-saga/effects';
import { handleSetRoutine, handleDeleteRoutine, handleUpdateProgress } from './routineSaga';
import { handleLogin, handleSignOut, handleSignUp } from './userSaga';

function* rootSaga() {
  yield fork(handleSetRoutine);
  yield fork(handleDeleteRoutine);
  yield fork(handleUpdateProgress);

  yield fork(handleLogin);
  yield fork(handleSignOut);
  yield fork(handleSignUp);
}

export default rootSaga;
