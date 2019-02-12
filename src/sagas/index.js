import { call, put, fork, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { successAddRoutine } from '../actions/routines';
import moment from 'moment';

import db from '../configs/firebase';

const setRoutine = async (name, count) => {
  try {
    const uid = await AsyncStorage.getItem('uid');
    const item = await AsyncStorage.getItem('routines');
    const routines = item ? JSON.stringify(item) : [];
    const routine = {
      name: name,
      count: count,
      progress: [],
      key: Math.random().toString(),
      createdAt: moment().format()
    };

    if(uid) {
      db.ref('Users/' + uid + '/routines/').push(routine).then(routine => {
        routine.key = routine.key;
        routines.push(routine);
      })
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      return { payload: routine };
    } else {
      routines.push(routine);
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      return { payload: routine };
    }
  } catch (error) {
    console.log(error);
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