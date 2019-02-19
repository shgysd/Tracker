import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOGIN,
  SIGNOUT,
  SIGNUP,
  SUCCESS_LOGIN,
  SUCCESS_SIGNOUT,
  SUCCESS_SIGNUP
} from '../consistants/actionTypes'

const initialState = {
  email: '',
  password: '',
  uid: null,
  isLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGIN_EMAIL:
      return {
        ...state,
        email: action.email
      }
    case CHANGE_LOGIN_PASSWORD:
      return {
        ...state,
        password: action.password
      }
    case LOGIN:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLoading: true
      }
    case SIGNOUT:
      return {
        ...state,
        uid: null,
        isLoading: false
      }
    case SIGNUP:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLoading: false
      }
    case SUCCESS_LOGIN:
      return {
        ...state,
        uid: action.uid,
        isLoading: false,
        email: '',
        password: '',
      }
    case SUCCESS_SIGNOUT:
      return {
        ...state,
        uid: null,
        isLoading: false,
        email: '',
        password: ''
      }
    case SUCCESS_SIGNUP:
      return {
        ...state,
        uid: action.uid,
        isLoading: false,
        email: '',
        password: ''
      }
    default:
      return state;
  }
}

export default reducer;
