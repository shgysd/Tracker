import { call, put, take } from 'redux-saga/effects';
import * as firebase from 'firebase';

import {
  successLogin,
  successSignOut,
  successSignUp,
  failureLogin,
  failureSignOut,
  failureSignUp,
} from '../actions/users';

const login = async (email, password) => {
  try {
    const uid = await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => user.user.uid)
      .catch((error) => { throw new Error(error); });
    return { uid };
  } catch (error) {
    return { error };
  }
};

export function* handleLogin() {
  while (true) {
    const action = yield take('LOGIN');
    const { uid, error } = yield call(login, action.email, action.password);
    if (uid && !error) {
      yield put(successLogin(uid));
    } else {
      yield put(failureLogin(error));
    }
  }
}

const signOut = async () => {
  try {
    await firebase.auth().signOut()
      .catch((error) => { throw new Error(error); });
    return { result: 'ok' };
  } catch (error) {
    return { error };
  }
};

export function* handleSignOut() {
  while (true) {
    yield take('SIGNOUT');
    const { result, error } = yield call(signOut);
    if (result && !error) {
      yield put(successSignOut(result));
    } else {
      yield put(failureSignOut(error));
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
    return { error };
  }
};

export function* handleSignUp() {
  while (true) {
    const action = yield take('SIGNUP');
    const { uid, error } = yield call(signUp, action.email, action.password);
    if (uid && !error) {
      yield put(successSignUp(uid));
    } else {
      yield put(failureSignUp(error));
    }
  }
}
