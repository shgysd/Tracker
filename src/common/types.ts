export interface StateTypes {
  _persist: {
    rehydrated: boolean;
    version: number;
  };
  lists: {
    createListVisible: boolean,
    tasks: [],
  };
  routines: {
    headerReducer: {
      createScreenVisible: boolean;
      sortScreenVisible: boolean;
    };
    routineReducer: {
      routines: Array<RoutineTypes>;
      count: number;
      detailModalVisible: boolean;
      inputModalVisible: boolean;
      sortModalVisible: boolean;
      name: string;
      progressModalVisible: boolean;
      selectedRoutine: RoutineTypes;
    };
  };
  users: {
    email: string;
    errorMessage: object;
    isLoading: boolean;
    password: string;
    uid: string;
  };
}

export interface ProgressTypes {
  count: number;
  date: string;
}

export interface RoutineTypes {
  name: string;
  count: number;
  progress: Array<ProgressTypes>;
  key: string;
  createdAt: string;
}

export interface ToggleScreen {
  visible: boolean;
  type: string;
}

export interface HeaderReducerStateTypes {
  createScreenVisible: boolean;
  sortScreenVisible: boolean;
}

export type HeaderReducerActionTypes =
  | ToggleScreen;
