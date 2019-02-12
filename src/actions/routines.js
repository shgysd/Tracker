import { INCREMENT, DECREMENT, SET_INPUT_MODAL_VISIBLE, SET_DETAIL_MODAL_VISIBLE, ADD_ROUTINE, SET_ROUTINE_STORAGE, SUCCESS_ADD_ROUTINE } from '../consistants/actionTypes'

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

export const setRoutineStorage = (name, count) => {
  return {
    type: SET_ROUTINE_STORAGE,
    name: name,
    count: count
  };
}

export const successAddRoutine = (routine) => {
  return {
    type: SUCCESS_ADD_ROUTINE,
    routine: routine
  };
}