import {
  CHANGE_LOGIN_EMAIL,
  CHANGE_LOGIN_PASSWORD,
  LOGIN,
  SUCCESS_LOGIN
} from '../consistants/actionTypes'

const initialState = {
  email: "",
  password: "",
  uid: null,
  isLoading: true
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
        password: action.password
      }
    case SUCCESS_LOGIN:
      return {
        ...state,
        uid: action.user
      }
    default:
      return state;
  }
}

export default reducer;