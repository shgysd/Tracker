import { call, put, take } from 'redux-saga/effects';
import { AsyncStorage, Alert } from 'react-native';
import { successAddRoutine, successDeleteRoutine, successUpdateProgress, successGetRoutine } from '../actions/routines';
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
    const { response, error } = yield call(deleteRoutine);
    if ( response === 'YES' && !error ) {
      yield put(successDeleteRoutine(action.key));
    } else {
      console.log(error);
    }
  }
}

const deleteRoutine = async () => {
  try {
    const response = await AsyncAlert();
    return { response };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const AsyncAlert = async () => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      'Alert Title',
      'Are you sure to delete this routine?',
      [
        {text: 'NO', onPress: () => { resolve("NO"); }},
        {text: 'YES', onPress: () => { resolve("YES");}}
      ]
    );
  });
};

export function* handleUpdateProgress() {
  while (true) {
    const action = yield take("UPDATE_PROGRESS");
    const {payload, error} = yield call(updateProgress, action.key, action.date, action.routines);
    if (payload && !error) {
      yield put(successUpdateProgress(payload));
    } else {
      console.log(error);
    }
  }
}

export function* handleGetRoutine() {
  while (true) {
    const action = yield take("GET_ROUTINE_FROM_CACHE");
    const {payload, error} = yield call(getRoutineFromCache);
    if (payload && !error) {
      yield put(successGetRoutine(payload));
    } else {
      console.log(error);
    }
  }
}

const generateKey = (length) => {
  const keyLength = length;
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const cl = characters.length;
  let key = "";
  for(let i=0; i < keyLength; i++){
    key += characters[Math.floor(Math.random()*cl)];
  }
  return key;
}

const addRoutine = async (name, count) => {
  try {
    const uid = await AsyncStorage.getItem('uid');
    const item = await AsyncStorage.getItem('routines');
    const routines = item ? JSON.parse(item) : [];
    const key = generateKey(16);
    const routine = {
      name: name,
      count: count,
      progress: [],
      key: key,
      createdAt: moment().format()
    };

    if(uid) {
      await AsyncStorage.setItem('routines', JSON.stringify(routines));
      db.ref('Users/' + uid + '/routines/').push(routine);
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



const updateProgress = async (key, date, items) => {
  try {
    const uid = await AsyncStorage.getItem('uid');
    let newRoutine = null;
    const routines = items.map(routine =>{
      if(routine.key === key) {
        const progress = routine.progress.find(item => {
          if(item.date === date) {
            if(0 < item.count) {
              item.count -= 1;
            } else {
              item.count = routine.count;
            }
          }
          return item.date === date;
        });

        if(!progress) {
          routine.progress.push({ date: date, count: routine.count - 1 });
        };

        newRoutine = routine;
      }
      return routine;
    });
    AsyncStorage.setItem('routines', JSON.stringify(routines));
    if(uid) {
      db.ref('Users/' + uid + '/routines/').child(newRoutine.key).set(newRoutine);
    }
    return { payload: routines };
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const getRoutineFromCache = async () => {
  try {
    const item = await AsyncStorage.getItem('routines');
    const routines = JSON.parse(item);
    if(routines) {
      return { payload: routines };
    } else {
      return { payload: [] };
    }
  } catch (error) {
    console.log(error);
    return { error };
  }
}