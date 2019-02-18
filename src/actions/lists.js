import {
  ADD_TASK
} from '../consistants/actionTypes';

export const addTask = (name) => {
  return {
    type: ADD_TASK,
    name
  };
}