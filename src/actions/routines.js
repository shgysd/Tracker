import {
  SET_INPUT_MODAL_VISIBLE,
  SET_DETAIL_MODAL_VISIBLE,
  SET_SORT_MODAL_VISIBLE,
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
  SUBMIT_ADD_ROUTINE,
  SORT_BY_NAME,
  SORT_BY_CREATED,
  SORT_BY_RATE
} from '../consistants/actionTypes'

export const setInputModalVisible = (visible) => {
  return {
    type: SET_INPUT_MODAL_VISIBLE,
    visible
  };
}

export const setDetailModalVisible = (visible, routine) => {
  return {
    type: SET_DETAIL_MODAL_VISIBLE,
    visible,
    routine
  };
}

export const setSortModalVisible = (visible) => {
  return {
    type: SET_SORT_MODAL_VISIBLE,
    visible
  };
}

export const addRoutine = (name, count) => {
  return {
    type: ADD_ROUTINE,
    name,
    count
  };
}

export const deleteRoutine = (key) => {
  return {
    type: DELETE_ROUTINE,
    key
  };
}

export const updateProgress = (key, date, routines) => {
  return {
    type: UPDATE_PROGRESS,
    key,
    date,
    routines
  };
}

export const successAddRoutine = (routine) => {
  return {
    type: SUCCESS_ADD_ROUTINE,
    routine
  };
}

export const successDeleteRoutine = (key) => {
  return {
    type: SUCCESS_DELETE_ROUTINE,
    key
  };
}

export const successUpdateProgress = (routines) => {
  return {
    type: SUCCESS_UPDATE_PROGRESS,
    routines
  };
}

export const successGetRoutine = (routines) => {
  return {
    type: SUCCESS_GET_ROUTINE,
    routines
  };
}

export const changeRoutineTitle = (name) => {
  return {
    type: CHANGE_ROUTINE_TITLE,
    name
  };
}

export const changeDefaultCount = (count) => {
  return {
    type: CHANGE_DEFAULT_COUNT,
    count
  };
}

export const submitAddRoutine = () => {
  return {
    type: SUBMIT_ADD_ROUTINE
  };
}

export const sortByName = () => {
  return {
    type: SORT_BY_NAME
  };
}

export const sortByCreated = () => {
  return {
    type: SORT_BY_CREATED
  };
}

export const sortByRate = () => {
  return {
    type: SORT_BY_RATE
  };
}
