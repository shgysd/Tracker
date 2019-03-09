import { combineReducers } from 'redux';
import moment from 'moment';
import {
  SET_DETAIL_MODAL_VISIBLE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_PROGRESS,
  COMPLETE_PROGRESS,
  SUCCESS_ADD_ROUTINE,
  SUCCESS_DELETE_ROUTINE,
  SUCCESS_UPDATE_PROGRESS,
  CHANGE_ROUTINE_TITLE,
  CHANGE_DEFAULT_COUNT,
  SUBMIT_ADD_ROUTINE,
  SORT_BY_NAME,
  SORT_BY_CREATED,
  SORT_BY_COMPLETED,
} from '../../consistants/actionTypes';
import headerReducer from '../Routine/header';

const initialState = {
  routines: [],
  detailModalVisible: false,
  sortModalVisible: false,
  progressModalVisible: false,
  selectedRoutine: null,
  name: '',
  count: 1,
};

const routineReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROUTINE: {
      const routine = {
        name: action.name,
        count: action.count,
        progress: [],
        key: action.key,
        createdAt: moment().format(),
      };
      return {
        ...state,
        routines: state.routines.concat(routine),
        inputModalVisible: false,
      };
    }
    case DELETE_ROUTINE:
      return state;
    case UPDATE_PROGRESS:
      return {
        ...state,
        routines: state.routines.map((elem) => {
          const routine = elem;
          if (routine.key === action.key) {
            const progress = routine.progress.find((val) => {
              const item = val;
              if (item.date === action.date) {
                if (item.count > 0) {
                  item.count -= 1;
                } else {
                  item.count = routine.count;
                }
              }
              return item.date === action.date;
            });

            if (!progress) {
              routine.progress = routine.progress.concat(
                { date: action.date, count: routine.count - 1 },
              );
            }
          }
          return routine;
        }),
      };
    case COMPLETE_PROGRESS:
      return {
        ...state,
        routines: state.routines.map((elem) => {
          const routine = elem;
          if (routine.key === action.key) {
            const progress = routine.progress.find((val) => {
              const item = val;
              if (item.date === action.date) {
                if (item.count > 0) {
                  item.count = 0;
                } else {
                  item.count = routine.count;
                }
              }
              return item.date === action.date;
            });

            if (!progress) {
              routine.progress = routine.progress.concat(
                { date: action.date, count: routine.count - 1 },
              );
            }
          }
          return routine;
        }),
      };
    case SUCCESS_ADD_ROUTINE:
      return {
        ...state,
      };
    case SUCCESS_DELETE_ROUTINE:
      return {
        ...state,
        routines: state.routines.filter(item => item.key !== action.key),
        detailModalVisible: false,
      };
    case SUCCESS_UPDATE_PROGRESS:
      return state;
    case CHANGE_ROUTINE_TITLE:
      return {
        ...state,
        name: action.name,
      };
    case CHANGE_DEFAULT_COUNT:
      return {
        ...state,
        count: action.count,
      };
    case SUBMIT_ADD_ROUTINE:
      return {
        ...state,
        name: '',
        count: 1,
      };
    case SORT_BY_NAME: {
      const sortByName = state.routines.slice();
      sortByName.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
      return {
        ...state,
        sortModalVisible: false,
        routines: sortByName,
      };
    }
    case SORT_BY_CREATED: {
      const sortByCreated = state.routines.slice();
      sortByCreated.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      return {
        ...state,
        sortModalVisible: false,
        routines: sortByCreated,
      };
    }
    case SORT_BY_COMPLETED: {
      const sortByRate = state.routines.slice();
      sortByRate.sort((a, b) => {
        const completedA = a.progress.filter(value => value.count === 0);
        const completedB = b.progress.filter(value => value.count === 0);

        if (completedA.length < completedB.length) { return 1; }
        if (completedA.length > completedB.length) { return -1; }
        return 0;
      });
      return {
        ...state,
        sortModalVisible: false,
        routines: sortByRate,
      };
    }
    default:
      return state;
  }
};

const rootReducer = combineReducers({ routineReducer, headerReducer });

export default {};
