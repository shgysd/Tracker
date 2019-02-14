import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOGIN,
  SUCCESS_LOGIN,
  SIGNOUT,
  SUCCESS_SIGNOUT
} from '../consistants/actionTypes';

export const changeLoginEmail = (email) => {
  return {
    type: CHANGE_LOGIN_EMAIL,
    email: email
  };
}

export const changeLoginPassword = (password) => {
  return {
    type: CHANGE_LOGIN_PASSWORD,
    password: password
  };
}

export const login = (email, password) => {
  return {
    type: LOGIN,
    email, email,
    password: password
  };
}

export const successLogin = (user) => {
  return {
    type: SUCCESS_LOGIN,
    user: user
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