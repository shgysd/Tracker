import {
  SET_INPUT_MODAL_VISIBLE,
  SET_DETAIL_MODAL_VISIBLE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_PROGRESS,
  GET_ROUTINE_FROM_CACHE,
  SUCCESS_ADD_ROUTINE,
  SUCCESS_DELETE_ROUTINE,
  SUCCESS_GET_ROUTINE,
  SUCCESS_UPDATE_PROGRESS,
  CHANGE_ROUTINE_TITLE,
  CHANGE_DEFAULT_COUNT,
  SUBMIT_ADD_ROUTINE
} from '../consistants/actionTypes'

const initialState = {
  routines: [],
  inputModalVisible: false,
  detailModalVisible: false,
  selectedRoutine: null,
  name: "",
  count: 1
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INPUT_MODAL_VISIBLE:
      return {
        ...state,
        inputModalVisible: action.visible
      }
    case SET_DETAIL_MODAL_VISIBLE:
      return {
        ...state,
        detailModalVisible: action.visible,
        selectedRoutine: action.routine
      }
    case ADD_ROUTINE:
      return state;
    case DELETE_ROUTINE:
      return state
    case UPDATE_PROGRESS:
      return state
    case GET_ROUTINE_FROM_CACHE:
      return state
    case SUCCESS_ADD_ROUTINE:
      return {
        ...state,
        routines: state.routines.concat(action.routine)
      }
    case SUCCESS_DELETE_ROUTINE:
      return {
        ...state,
        detailModalVisible: false,
        routines: state.routines.filter(val => {
          return val.key !== action.routine.key
        })
      }
    case SUCCESS_UPDATE_PROGRESS:
      return {
        ...state,
        routines: action.routines
      }
    case SUCCESS_GET_ROUTINE:
      return {
        ...state,
        routines: action.routines
      }
    case CHANGE_ROUTINE_TITLE:
      return {
        ...state,
        name: action.name
      }
    case CHANGE_DEFAULT_COUNT:
      return {
        ...state,
        count: action.count
      }
    case SUBMIT_ADD_ROUTINE:
      return {
        ...state,
        name: "",
        count: 1
      }
    default:
      return state;
  }
};

export default reducer;