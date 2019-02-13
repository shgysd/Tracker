import { fork } from 'redux-saga/effects';
import { handleSetRoutine, handleDeleteRoutine, handleUpdateProgress, handleGetRoutine,  } from './routineSaga'

export default function* rootSaga() {
  yield fork(handleSetRoutine);
  yield fork(handleDeleteRoutine);
  yield fork(handleUpdateProgress);
  yield fork(handleGetRoutine);
};