import {
  SET_INPUT_MODAL_VISIBLE,
  SET_DETAIL_MODAL_VISIBLE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_PROGRESS,
  GET_ROUTINE_FROM_CACHE,
  SUCCESS_ADD_ROUTINE,
  SUCCESS_DELETE_ROUTINE,
  SUCCESS_UPDATE_PROGRESS,
  SUCCESS_GET_ROUTINE,
  CHANGE_ROUTINE_TITLE,
  CHANGE_DEFAULT_COUNT,
  SUBMIT_ADD_ROUTINE
} from '../consistants/actionTypes'

export const increment = () => {
  return {
    type: INCREMENT
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
}

export const setInputModalVisible = (visible) => {
  return {
    type: SET_INPUT_MODAL_VISIBLE,
    visible: visible
  };
}

export const setDetailModalVisible = (visible, routine) => {
  return {
    type: SET_DETAIL_MODAL_VISIBLE,
    visible: visible,
    routine: routine
  };
}

export const addRoutine = (name, count) => {
  return {
    type: ADD_ROUTINE,
    name: name,
    count: count
  };
}

export const deleteRoutine = (routine) => {
  return {
    type: DELETE_ROUTINE,
    routine: routine
  };
}

export const updateProgress = (key, date, routines) => {
  return {
    type: UPDATE_PROGRESS,
    key: key,
    date: date,routines
  };
}

export const getRoutineFromCache = () => {
  return {
    type: GET_ROUTINE_FROM_CACHE,
  };
}

export const successAddRoutine = (routine) => {
  return {
    type: SUCCESS_ADD_ROUTINE,
    routine: routine
  };
}

export const successDeleteRoutine = (routine) => {
  return {
    type: SUCCESS_DELETE_ROUTINE,
    routine: routine
  };
}

export const successUpdateProgress = (routines) => {
  return {
    type: SUCCESS_UPDATE_PROGRESS,
    routines: routines
  };
}

export const successGetRoutine = (routines) => {
  return {
    type: SUCCESS_GET_ROUTINE,
    routines: routines
  };
}

export const changeRoutineTitle = (name) => {
  return {
    type: CHANGE_ROUTINE_TITLE,
    name: name
  };
}

export const changeDefaultCount = (count) => {
  return {
    type: CHANGE_DEFAULT_COUNT,
    count: count
  };
}

export const submitAddRoutine = () => {
  return {
    type: SUBMIT_ADD_ROUTINE
  };
}