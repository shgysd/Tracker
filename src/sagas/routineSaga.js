import { call, put, take } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { successAddRoutine, successDeleteRoutine } from '../actions/routines';
import moment from 'moment';

import db from '../configs/firebase';

export function* handleSetRoutine() {
  while (true) {
    const action = yield take("ADD_ROUTINE");
    const {payload, error} = yield call(addRoutine, action.name, action.count);
    if (payload && !error) {
      yield put(successAddRoutine(payload));
    } else {
      console.log(error);
    }
  }
}

export function* handleDeleteRoutine() {
  while (true) {
    const action = yield take("DELETE_ROUTINE");
    const {payload, error} = yield call(deleteRoutine, action.routine);
    if (payload && !error) {
      yield put(successDeleteRoutine(payload));
    } else {
      console.log(error);
    }
  }
}

const addRoutine = async (name, count) => {
  try {
    const uid = await AsyncStorage.getItem('uid');
    const item = await AsyncStorage.getItem('routines');
    const routines = item ? JSON.parse(item) : [];
    const routine = {
      name: name,
      count: count,
      progress: [],
      key: Math.random().toString(),
      createdAt: moment().format()
    };

    if(uid) {
      db.ref('Users/' + uid + '/routines/').push(routine).then((item) => {
        routine.key = item.key;
        routines.push(routine);
        db.ref('Users/' + uid + '/routines/').child(routine.key).set(routine).then(() => {
          AsyncStorage.setItem('routines', JSON.stringify(routines));
        })
      });
      return { payload: routine };
    } else {
      routines.push(routine);
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      return { payload: routine };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const deleteRoutine = async (routine) => {
  try {
    const item = await AsyncStorage.getItem('routines');
    const items = JSON.parse(item);
    if(item) {
      const response = await AsyncAlert(items, routine);
      return { payload: routine };
    } else {
      return { payload: routine };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const AsyncAlert = async (items, routine) => {
  const uid = await AsyncStorage.getItem('uid');
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Alert Title',
      'Would you really like to delete?',
      [
        {text: 'NO', onPress: () => { resolve("NO") }},
        {text: 'YES', onPress: () => {
          const routines = items.filter(val => {
            return val.key !== routine.key
          });
      
          AsyncStorage.setItem('routines', JSON.stringify(routines));
          if(uid) {
            db.ref('Users/' + uid + '/routines/').child(routine.key).remove();
          }
          resolve("YES");
        }}
      ]
    );
  });
};