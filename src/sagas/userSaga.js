import { call, put, take } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { successLogin } from '../actions/users';
import * as firebase from 'firebase';
import db from '../configs/firebase';

export function* handleLogin() {
  while (true) {
    const action = yield take("LOGIN");
    const {payload, error} = yield call(login, action.email, action.password);
    if (payload && !error) {
      yield put(successLogin(payload));
    } else {
      console.log(error);
    }
  }
}

const login = async (email, password) => {
  try {
    let uid = null;
    await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      AsyncStorage.setItem('uid', JSON.stringify(user.user.uid));
      uid = user.user.uid;
    }).catch((error) => {
      console.log(error);
      throw new Error(error);
    });
    return { payload: uid};
  } catch (error) {
    console.log(error);
    return { error };
  }
}