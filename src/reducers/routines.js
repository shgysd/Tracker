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
  SUCCESS_UPDATE_PROGRESS
} from '../consistants/actionTypes'

const initialState = {
  counter: 0,
  routines: [],
  inputModalVisible: false,
  detailModalVisible: false,
  selectedRoutine: null
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
    default:
      return state;
  }
};

export default reducer;