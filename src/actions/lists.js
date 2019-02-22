import {
  ADD_TASK,
} from '../consistants/actionTypes';

const addTask = name => (
  {
    type: ADD_TASK,
    name,
  }
);

export default addTask;
