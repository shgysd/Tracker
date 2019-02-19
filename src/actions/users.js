import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  SIGNUP,
  LOGIN,
  SUCCESS_LOGIN,
  SIGNOUT,
  SUCCESS_SIGNOUT,
  IS_LOGGEDIN,
  SUCCESS_IS_LOGGEDIN,
  FAILURE_IS_LOGGEDIN
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

export const signUp = () => {
  return {
    type: SIGNUP
  };
}

export const login = (email, password) => {
  return {
    type: LOGIN,
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

export const signOut = () => {
  return {
    type: SIGNOUT
  };
}

export const successSignOut = () => {
  return {
    type: SUCCESS_SIGNOUT
  };
}

export const isLoggedin = () => {
  return {
    type: IS_LOGGEDIN
  };
}

export const successIsLoggedin = (uid) => {
  return {
    type: SUCCESS_IS_LOGGEDIN,
    uid
  };
}

export const failureIsLoggedin = (uid) => {
  return {
    type: FAILURE_IS_LOGGEDIN,
    uid
  };
}