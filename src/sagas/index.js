import { call, put, fork, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { successAddRoutine } from '../actions/routines';
import moment from 'moment';

const setRoutine = async (name, count) => {
  try {
    await AsyncStorage.removeItem('routines');
    const item = await AsyncStorage.getItem('routines');
    if(item) {
      const routines = JSON.parse(item);
      routines.push({
        name: name,
        count: count,
        progress: [],
        key: Math.random().toString(),
        createdAt: moment().format()
      });
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      const payload = await AsyncStorage.getItem('routines');
      return { payload: JSON.parse(payload) };
    } else {
      const routines = [];
      const routine = {
        name: name,
        count: count,
        progress: [],
        key: Math.random().toString(),
        createdAt: moment().format()
      };
      routines.push(routine);
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      return { payload: routine };
    }
  } catch (error) {
    console.log(error);
    return { error }
  }
}

function* handleSetRoutine() {
  while (true) {
    const action = yield take("ADD_ROUTINE");
    const {payload, error} = yield call(setRoutine, action.name, action.count);
    console.log(payload);
    if (payload && !error) {
      yield put(successAddRoutine(payload));
    } else {
      console.log(error);
    }
  }
}

export default function* rootSaga() {
  yield fork(handleSetRoutine);
};