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

export const setInputModalVisible = (visible: boolean) => {
  return {
    type: SET_INPUT_MODAL_VISIBLE,
    visible: visible
  };
}

export const setDetailModalVisible = (visible: boolean, routine: object) => {
  return {
    type: SET_DETAIL_MODAL_VISIBLE,
    visible: visible,
    routine: routine
  };
}

export const addRoutine = (name: string, count: number) => {
  return {
    type: ADD_ROUTINE,
    name: name,
    count: count
  };
}

export const deleteRoutine = (routine: object) => {
  return {
    type: DELETE_ROUTINE,
    routine: routine
  };
}

export const updateProgress = (key: string, date: string, routines: object) => {
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

export const successAddRoutine = (routine: object) => {
  return {
    type: SUCCESS_ADD_ROUTINE,
    routine: routine
  };
}

export const successDeleteRoutine = (routine: object) => {
  return {
    type: SUCCESS_DELETE_ROUTINE,
    routine: routine
  };
}

export const successUpdateProgress = (routines: object) => {
  return {
    type: SUCCESS_UPDATE_PROGRESS,
    routines: routines
  };
}

export const successGetRoutine = (routines: object) => {
  return {
    type: SUCCESS_GET_ROUTINE,
    routines: routines
  };
}

export const changeRoutineTitle = (name: object) => {
  return {
    type: CHANGE_ROUTINE_TITLE,
    name: name
  };
}

export const changeDefaultCount = (count: object) => {
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