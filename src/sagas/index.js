import { fork } from 'redux-saga/effects';
import { handleSetRoutine, handleDeleteRoutine } from './routineSaga'

export default function* rootSaga() {
  yield fork(handleSetRoutine);
  yield fork(handleDeleteRoutine);
};