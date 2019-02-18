import {
  ADD_TASK
} from '../consistants/actionTypes';

const initialState = {
  tasks: [],
  createListVisible: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: state.tasks.concat({name: action.name, status: false})
      }
    default:
      return state;
  }
};

export default reducer;
