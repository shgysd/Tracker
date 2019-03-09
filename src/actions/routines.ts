import {
  TOGGLE_CREATE_SCREEN,
  TOGGLE_SORT_SCREEN,
  SET_DETAIL_MODAL_VISIBLE,
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
import {
  ToggleScreen,
  RoutineTypes,
} from '../common/types';

export const toggleCreateScreen = (visible: boolean): ToggleScreen => ({
  visible,
  type: TOGGLE_CREATE_SCREEN,
});

export const toggleSortScreen = (visible: boolean): ToggleScreen => ({
  visible,
  type: TOGGLE_SORT_SCREEN,
});

export const setDetailModalVisible = (visible: boolean, routine: RoutineTypes) => ({
  visible,
  routine,
  type: SET_DETAIL_MODAL_VISIBLE,
});

export const setProgressModalVisible = (visible: boolean) => ({
  visible,
  type: SET_PROGRESS_MODAL_VISIBLE,
});

export const addRoutine = (name: string, count: number, key: string, uid: string) => ({
  name,
  count,
  key,
  uid,
  type: ADD_ROUTINE,
});

export const deleteRoutine = (key: string, uid: string) => ({
  key,
  uid,
  type: DELETE_ROUTINE,
});

export const updateProgress = (key: string, date: string, routines: any, uid: string) => ({
  key,
  date,
  routines,
  uid,
  type: UPDATE_PROGRESS,
});

export const completeProgress = (key: string, date: string, routines: any, uid: string) => ({
  key,
  date,
  routines,
  uid,
  type: COMPLETE_PROGRESS,
});

export const successAddRoutine = (routine: any) => ({
  routine,
  type: SUCCESS_ADD_ROUTINE,
});

export const successDeleteRoutine = (key: string) => ({
  key,
  type: SUCCESS_DELETE_ROUTINE,
});

export const successUpdateProgress = (routines: any) => ({
  routines,
  type: SUCCESS_UPDATE_PROGRESS,
});

export const failureAddRoutine = (error: any) => ({
  error,
  type: FAILURE_ADD_ROUTINE,
});

export const failureDeleteRoutine = (error: any) => ({
  error,
  type: FAILURE_DELETE_ROUTINE,
});

export const failureUpdateProgress = (error: any) => ({
  error,
  type: FAILURE_UPDATE_PROGRESS,
});

export const changeRoutineTitle = (name: string): {name: string, type: string} => ({
  name,
  type: CHANGE_ROUTINE_TITLE,
});

export const changeDefaultCount = (count: number): {count: number, type: string} => ({
  count,
  type: CHANGE_DEFAULT_COUNT,
});

export const submitAddRoutine = (): {type: string} => ({
  type: SUBMIT_ADD_ROUTINE,
});

export const sortByName = () => ({
  type: SORT_BY_NAME,
});

export const sortByCreated = () => ({
  type: SORT_BY_CREATED,
});

export const sortByCompleted = () => ({
  type: SORT_BY_COMPLETED,
});
