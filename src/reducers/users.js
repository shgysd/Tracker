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
    case SIGNUP:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLoading: true
      }
    case LOGIN:
      return {
        ...state,
        email: action.email,
        password: action.password,
        isLoading: true
      }
    case SUCCESS_LOGIN:
      return {
        ...state,
        uid: action.uid,
        isLoading: false,
        email: '',
        password: '',
      }
    case SIGNOUT:
      return {
        ...state,
        uid: null
      }
    case SUCCESS_SIGNOUT:
      return {
        ...state,
        uid: null,
        isLoading: false,
        email: '',
        password: ''
      }
    case IS_LOGGEDIN:
      return {
        ...state,
        isLoading: true
      }
    case SUCCESS_IS_LOGGEDIN:
      return {
        ...state,
        uid: action.uid,
        isLoading: false
      }
    case FAILURE_IS_LOGGEDIN:
      return {
        ...state,
        uid: action.uid,
        isLoading: false
      }
    default:
      return state;
  }
}

export default reducer;