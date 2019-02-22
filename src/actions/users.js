import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOGIN,
  SIGNOUT,
  SIGNUP,
  SUCCESS_LOGIN,
  SUCCESS_SIGNOUT,
  SUCCESS_SIGNUP,
} from '../consistants/actionTypes';

export const changeLoginEmail = email => (
  {
    type: CHANGE_LOGIN_EMAIL,
    email,
  }
);

export const changeLoginPassword = password => (
  {
    type: CHANGE_LOGIN_PASSWORD,
    password,
  }
);

export const login = (email, password) => (
  {
    type: LOGIN,
    email,
    password,
  }
);

export const signOut = () => (
  {
    type: SIGNOUT,
  }
);

export const signUp = (email, password) => (
  {
    type: SIGNUP,
    email,
    password,
  }
);

export const successLogin = uid => (
  {
    type: SUCCESS_LOGIN,
    uid,
  }
);

export const successSignOut = () => (
  {
    type: SUCCESS_SIGNOUT,
  }
);

export const successSignUp = uid => (
  {
    type: SUCCESS_SIGNUP,
    uid,
  }
);
