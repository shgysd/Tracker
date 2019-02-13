import { SET_INPUT_MODAL_VISIBLE, SET_DETAIL_MODAL_VISIBLE, ADD_ROUTINE, DELETE_ROUTINE, SUCCESS_ADD_ROUTINE, SUCCESS_DELETE_ROUTINE } from '../consistants/actionTypes'
import moment from 'moment';

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
    default:
      return state;
  }
};

export default reducer;