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
  SUCCESS_GET_ROUTINE,
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

export const addRoutine = (name, count) => (
  {
    type: ADD_ROUTINE,
    name,
    count,
  }
);

export const deleteRoutine = key => (
  {
    type: DELETE_ROUTINE,
    key,
  }
);

export const updateProgress = (key, date) => (
  {
    type: UPDATE_PROGRESS,
    key,
    date,
  }
);

export const completeProgress = (key, date) => (
  {
    type: COMPLETE_PROGRESS,
    key,
    date,
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

export const successGetRoutine = routines => (
  {
    type: SUCCESS_GET_ROUTINE,
    routines,
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
