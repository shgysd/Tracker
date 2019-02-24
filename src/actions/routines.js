import {
  SET_INPUT_MODAL_VISIBLE,
  SET_DETAIL_MODAL_VISIBLE,
  SET_SORT_MODAL_VISIBLE,
  SET_PROGRESS_MODAL_VISIBLE,
  ADD_ROUTINE,
  DELETE_ROUTINE,
  UPDATE_PROGRESS,
  COMPLETE_PROGRESS,
  SUCCESS_ADD_ROUTINE,
  SUCCESS_DELETE_ROUTINE,
  SUCCESS_UPDATE_PROGRESS,
  FAILURE_ADD_ROUTINE,
  FAILURE_DELETE_ROUTINE,
  FAILURE_UPDATE_PROGRESS,
  CHANGE_ROUTINE_TITLE,
  CHANGE_DEFAULT_COUNT,
  SUBMIT_ADD_ROUTINE,
  SORT_BY_NAME,
  SORT_BY_CREATED,
  SORT_BY_COMPLETED,
} from '../consistants/actionTypes';

export const setInputModalVisible = visible => (
  {
    type: SET_INPUT_MODAL_VISIBLE,
    visible,
  }
);

export const setDetailModalVisible = (visible, routine) => (
  {
    type: SET_DETAIL_MODAL_VISIBLE,
    visible,
    routine,
  }
);

export const setSortModalVisible = visible => (
  {
    type: SET_SORT_MODAL_VISIBLE,
    visible,
  }
);

export const setProgressModalVisible = visible => (
  {
    type: SET_PROGRESS_MODAL_VISIBLE,
    visible,
  }
);

export const addRoutine = (name, count, key, uid) => (
  {
    type: ADD_ROUTINE,
    name,
    count,
    key,
    uid,
  }
);

export const deleteRoutine = (key, uid) => (
  {
    type: DELETE_ROUTINE,
    key,
    uid,
  }
);

export const updateProgress = (key, date, routines, uid) => (
  {
    type: UPDATE_PROGRESS,
    key,
    date,
    routines,
    uid,
  }
);

export const completeProgress = (key, date, routines, uid) => (
  {
    type: COMPLETE_PROGRESS,
    key,
    date,
    routines,
    uid,
  }
);

export const successAddRoutine = routine => (
  {
    type: SUCCESS_ADD_ROUTINE,
    routine,
  }
);

export const successDeleteRoutine = key => (
  {
    type: SUCCESS_DELETE_ROUTINE,
    key,
  }
);

export const successUpdateProgress = routines => (
  {
    type: SUCCESS_UPDATE_PROGRESS,
    routines,
  }
);

export const failureAddRoutine = error => (
  {
    type: FAILURE_ADD_ROUTINE,
    error,
  }
);

export const failureDeleteRoutine = error => (
  {
    type: FAILURE_DELETE_ROUTINE,
    error,
  }
);

export const failureUpdateProgress = error => (
  {
    type: FAILURE_UPDATE_PROGRESS,
    error,
  }
);

export const changeRoutineTitle = name => (
  {
    type: CHANGE_ROUTINE_TITLE,
    name,
  }
);

export const changeDefaultCount = count => (
  {
    type: CHANGE_DEFAULT_COUNT,
    count,
  }
);

export const submitAddRoutine = () => (
  {
    type: SUBMIT_ADD_ROUTINE,
  }
);

export const sortByName = () => (
  {
    type: SORT_BY_NAME,
  }
);

export const sortByCreated = () => (
  {
    type: SORT_BY_CREATED,
  }
);

export const sortByCompleted = () => (
  {
    type: SORT_BY_COMPLETED,
  }
);
