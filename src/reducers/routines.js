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
} from '../consistants/actionTypes';

import moment from 'moment';

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
      const key = generateKey(16);
      const routine = {
        name: action.name,
        count: action.count,
        progress: [],
        key,
        createdAt: moment().format()
      }
      return {
        ...state,
        routines: state.routines.concat(routine),
        inputModalVisible: false
      }
    case DELETE_ROUTINE:
      return state
    case UPDATE_PROGRESS:
      return {
        ...state,
        routines: state.routines.map(routine =>{
          if(routine.key === action.key) {
            const progress = routine.progress.find(item => {
              if(item.date === action.date) {
                if(0 < item.count) {
                  item.count -= 1;
                } else {
                  item.count = routine.count;
                }
              }
              return item.date === action.date;
            });

            if(!progress) {
              routine.progress = routine.progress.concat({ date: action.date, count: routine.count - 1 });
            };
          }
          return routine;
        })
      }
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
        routines: state.routines.filter(item => {
          return item.key !== action.key
        }),
        detailModalVisible: false
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

const generateKey = (length) => {
  const keyLength = length;
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const cl = characters.length;
  let key = "";
  for(let i=0; i < keyLength; i++){
    key += characters[Math.floor(Math.random()*cl)];
  }
  return key;
}

export default reducer;
