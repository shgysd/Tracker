import { call, put, take } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { successLogin, successSignOut, successIsLoggedin, failureIsLoggedin } from '../actions/users';
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

export function* handleSignOut() {
  while (true) {
    const action = yield take("SIGNOUT");
    const {payload, error} = yield call(signOut);
    if (payload && !error) {
      yield put(successSignOut(payload));
    } else {
      console.log(error);
    }
  }
}

export function* handleIsLoggedin() {
  while (true) {
    const action = yield take("IS_LOGGEDIN");
    const {payload, error} = yield call(isLoggedin);
    if (payload && !error) {
      yield put(successIsLoggedin(payload));
    } else {
      yield put(failureIsLoggedin(payload));
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

const signOut = async () => {
  try {
    await firebase.auth().signOut().catch(error => {
      console.log(error);
      throw new Error(error);
    });
    await AsyncStorage.removeItem('uid').catch(error => {
      console.log(error);
      throw new Error(error);
    });
    await AsyncStorage.removeItem('routines');
    return { payload: "ok"};
  } catch (error) {
    console.log(error);
    return { error };
  }
}

const isLoggedin = async () => {
  try {
    let uid = null;
    await AsyncStorage.getItem('uid').then((id) => {
      if(id) {
        uid = id;
      }
    }).catch(error => {
      console.log(error);
      throw new Error(error);
    });
    return { payload: uid};
  } catch (error) {
    console.log(error);
    return { error };
  }
}