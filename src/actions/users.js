import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOGIN,
  SIGNOUT,
  SIGNUP,
  SUCCESS_LOGIN,
  SUCCESS_SIGNOUT,
  SUCCESS_SIGNUP
} from '../consistants/actionTypes';

export const changeLoginEmail = (email) => {
  return {
    type: CHANGE_LOGIN_EMAIL,
    email
  };
}

export const changeLoginPassword = (password) => {
  return {
    type: CHANGE_LOGIN_PASSWORD,
    password
  };
}

export const login = (email, password) => {
  return {
    type: LOGIN,
    email,
    password
  };
}

export const signOut = () => {
  return {
    type: SIGNOUT
  };
}

export const signUp = (email, password) => {
  return {
    type: SIGNUP,
    email,
    password
  };
}

export const successLogin = (uid) => {
  return {
    type: SUCCESS_LOGIN,
    uid
  };
}

export const successSignOut = () => {
  return {
    type: SUCCESS_SIGNOUT
  };
}

export const successSignUp = (uid) => {
  return {
    type: SUCCESS_SIGNUP,
    uid
  };
}
