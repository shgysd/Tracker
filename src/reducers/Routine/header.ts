import {
  TOGGLE_CREATE_SCREEN,
  TOGGLE_SORT_SCREEN,
} from '../../consistants/actionTypes';
import {
  HeaderReducerStateTypes,
  HeaderReducerActionTypes,
} from '../../common/types';

const initialState: HeaderReducerStateTypes = {
  createScreenVisible: false,
  sortScreenVisible: false,
};

const headerReducer = (
  state = initialState,
  action: HeaderReducerActionTypes,
): HeaderReducerStateTypes => {
  switch (action.type) {
    case TOGGLE_CREATE_SCREEN:
      return {
        ...state,
        createScreenVisible: action.visible,
      };
    case TOGGLE_SORT_SCREEN:
      return {
        ...state,
        sortScreenVisible: action.visible,
      };
    default:
      return state;
  }
};

export default headerReducer;
