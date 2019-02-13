import { SET_INPUT_MODAL_VISIBLE, SET_DETAIL_MODAL_VISIBLE, ADD_ROUTINE, DELETE_ROUTINE, SUCCESS_ADD_ROUTINE, SUCCESS_DELETE_ROUTINE } from '../consistants/actionTypes'

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