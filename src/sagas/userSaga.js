import { call, put, take } from 'redux-saga/effects';
import * as firebase from 'firebase';

import { successLogin, successSignOut, successSignUp } from '../actions/users';

export function* handleLogin() {
  while (true) {
    const action = yield take("LOGIN");
    const { uid, error } = yield call(login, action.email, action.password);
    if (uid && !error) {
      yield put(successLogin(uid));
    } else {
      console.log(error);
    }
  }
}

const login = async (email, password) => {
  try {
    const uid = await firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
      return user.user.uid;
    }).catch((error) => {
      throw new Error(error);
    });
    return { uid };
  } catch (error) {
    console.log(error);
    return { error };
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

export function* handleSignUp() {
  while (true) {
    const action = yield take("SIGNUP");
    const { uid, error } = yield call(signUp, action.email, action.password);
    if (uid && !error) {
      yield put(successSignUp(uid));
    } else {
      console.log(error);
    }
  }
}

const signUp = async (email, password) => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        throw new Error(error);
      });
    return { uid: result.user.uid };
  } catch (error) {
    console.log(error);
    return { error };
  }
}
