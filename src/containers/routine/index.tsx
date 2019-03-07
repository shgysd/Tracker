import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import DateBar from '../../components/DateBar';
import AddRoutine from './AddRoutine';
import Sort from '../../components/modals/Sort';
import Progress from '../../components/modals/Progress';
import RenderRoutine from '../../components/flatlists/RenderRoutine';
import Detail from '../../components/modals/Detail';

import {
  setInputModalVisible,
  setDetailModalVisible,
  setSortModalVisible,
  setProgressModalVisible,
  addRoutine, deleteRoutine,
  updateProgress,
  completeProgress,
  sortByName,
  sortByCreated,
  sortByCompleted,
} from '../../actions/routines';

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: '#111',
    height: 48,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  dateLeftContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  dateRightContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  time: {
    color: '#777',
    fontSize: 11,
  },
  icon: {
    marginLeft: 12,
  },
  homeContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  mainContainer: {
    backgroundColor: '#222',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    width: '100%',
  },
});

interface ProgressTypes {
  count: number;
  date: string;
}

interface RoutineTypes {
  name: string;
  count: number;
  progress: Array<ProgressTypes>;
  key: string;
  createdAt: string;
}

interface PropTypes {
  routines: Array<RoutineTypes>;
  selectedRoutine: RoutineTypes;
  inputModalVisible: boolean;
  sortModalVisible: boolean;
  detailModalVisible: boolean;
  progressModalVisible: boolean;
  setInputModalVisible: (inputModalVisible: boolean) => {visible: boolean, type: string};
  setSortModalVisible: (sortModalVisible: boolean) => {visible: boolean, type: string};
  setProgressModalVisible: (progressModalVisible: boolean) => {visible: boolean, type: string};
  setDetailModalVisible: (
    detailModalVisible: boolean,
    routine: RoutineTypes,
  ) => {visible: boolean, type: string};
  sortByName: () => {type: string};
  sortByCreated: () => {type: string};
  sortByCompleted: () => {type: string};
  uid: string;
  addRoutine: (
    name: string,
    count: number,
    key: string,
    uid: string,
  ) => {
    name: string;
    count: number;
    key: string;
    uid: string;
    type: string;
  };
  deleteRoutine: (
    key: string,
    uid: string,
  ) => {
    key: string;
    uid: string;
    type: string;
  };
  updateProgress: (
    key: string,
    date: string,
    routines: Array<RoutineTypes>,
    uid: string,
  ) => {
    key: string;
    date: string;
    routines: Array<RoutineTypes>;
    uid: string;
    type: string;
  };
  completeProgress: (
    key: string,
    date: string,
    routines: Array<RoutineTypes>,
    uid: string,
  ) => {
    key: string;
    date: string;
    routines: Array<RoutineTypes>;
    uid: string;
    type: string;
  };
}

interface StateTypes {
  _persist: {
    rehydrated: boolean;
    version: number;
  };
  lists: {
    createListVisible: boolean,
    tasks: [],
  };
  routines: {
    routines: Array<RoutineTypes>;
    count: number;
    detailModalVisible: boolean;
    inputModalVisible: boolean;
    sortModalVisible: boolean;
    name: string;
    progressModalVisible: boolean;
    selectedRoutine: RoutineTypes;
  };
  users: {
    email: string;
    errorMessage: object;
    isLoading: boolean;
    password: string;
    uid: string;
  };
}

class Routine extends React.Component<PropTypes> {
  handleSetInputModalVisible = (): void => {
    const { setInputModalVisible: handleSetInputModalVisible, inputModalVisible } = this.props;
    handleSetInputModalVisible(!inputModalVisible);
  }

  handleSetDetailModalVisible = (visible: boolean, routine: RoutineTypes): void => {
    const { setDetailModalVisible: _setDetailModalVisible } = this.props;
    _setDetailModalVisible(visible, routine);
  }

  generateKey = (length: number): string => {
    const keyLength:number = length;
    const characters:string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const cl:number = characters.length;
    let key:string = '';
    for (let i = 0; i < keyLength; i += 1) {
      key += characters[Math.floor(Math.random() * cl)];
    }
    return key;
  }

  addRoutine = (name: string, count: number): void => {
    const { addRoutine: _addRoutine, uid } = this.props;
    if (name.length > 0) {
      _addRoutine(name, count, this.generateKey(16), uid);
    }
  }

  deleteRoutine = (key: string): void => {
    const { deleteRoutine: _deleteRoutine, uid } = this.props;
    _deleteRoutine(key, uid);
  }

  setProgress = (key: string, date: string): void => {
    const { updateProgress: _updateProgress, routines, uid } = this.props;
    _updateProgress(key, date, routines, uid);
  }

  completeProgress = (key: string, date: string): void => {
    const { completeProgress: _completeProgress, routines, uid } = this.props;
    _completeProgress(key, date, routines, uid);
  }

  render() {
    const {
      inputModalVisible: _inputModalVisible,
      setInputModalVisible: _setInputModalVisible,
      sortModalVisible: _sortModalVisible,
      setSortModalVisible: _setSortModalVisible,
      routines,
      sortByName: _sortByName,
      sortByCreated: _sortByCreated,
      sortByCompleted: _sortByCompleted,
      detailModalVisible,
      setProgressModalVisible: _setProgressModalVisible,
      progressModalVisible: _progressModalVisible,
      selectedRoutine: _selectedRoutine,
      inputModalVisible,
    } = this.props;
    return (
      <View style={styles.homeContainer}>
        <Header
          inputModalVisible={_inputModalVisible}
          setInputModalVisible={_setInputModalVisible}
          sortModalVisible={_sortModalVisible}
          setSortModalVisible={_setSortModalVisible}
        />
        <DateBar />
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.listContainer}
            data={routines}
            renderItem={routine => (
              <RenderRoutine
                routine={routine}
                handleProgress={this.setProgress}
                handleShowDetail={this.handleSetDetailModalVisible}
                visible={detailModalVisible}
              />
            )}
          />
        </View>
        <Sort
          visible={_sortModalVisible}
          handleVisible={() => _setSortModalVisible(!_sortModalVisible)}
          sortByName={() => _sortByName()}
          sortByCreated={() => _sortByCreated()}
          sortByCompleted={() => _sortByCompleted()}
        />
        <AddRoutine
          visible={_inputModalVisible}
          handleVisible={() => _setInputModalVisible(!_inputModalVisible)}
          createRoutine={this.addRoutine}
        />
        <Detail
          visible={detailModalVisible}
          handleShowDetail={this.handleSetDetailModalVisible}
          setProgressModalVisible={
            () => _setProgressModalVisible(!_progressModalVisible)
          }
          selectedRoutine={_selectedRoutine}
          deleteRoutine={this.deleteRoutine}
          handleVisible={() => _setInputModalVisible(!inputModalVisible)}
        />
        <Progress
          visible={_progressModalVisible}
          selectedRoutine={_selectedRoutine}
          setProgressModalVisible={
            () => _setProgressModalVisible(!_progressModalVisible)
          }
          completeProgress={this.completeProgress}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: StateTypes) => {
  return ({
    uid: state.users.uid,
    routines: state.routines.routines,
    inputModalVisible: state.routines.inputModalVisible,
    detailModalVisible: state.routines.detailModalVisible,
    sortModalVisible: state.routines.sortModalVisible,
    progressModalVisible: state.routines.progressModalVisible,
    selectedRoutine: state.routines.selectedRoutine,
  });
};

const mapDispatchToProps = (dispatch: any) => ({
  addRoutine: (
    name: string,
    count: number,
    key: string,
    uid: string,
  ) => dispatch(addRoutine(name, count, key, uid)),
  deleteRoutine: (key: string, uid: string) => dispatch(deleteRoutine(key, uid)),
  updateProgress: (
    key: string,
    date: string,
    routines: Array<RoutineTypes>,
    uid: string,
  ) => dispatch(updateProgress(key, date, routines, uid)),
  completeProgress: (
    key: string,
    date: string,
    routines: Array<RoutineTypes>,
    uid: string,
  ) => dispatch(completeProgress(key, date, routines, uid)),
  setInputModalVisible: (visible: boolean) => dispatch(setInputModalVisible(visible)),
  setDetailModalVisible: (
    visible: boolean,
    routine: RoutineTypes,
  ) => dispatch(setDetailModalVisible(visible, routine)),
  setSortModalVisible: (visible: boolean) => dispatch(setSortModalVisible(visible)),
  setProgressModalVisible: (visible: boolean) => dispatch(setProgressModalVisible(visible)),
  sortByName: () => dispatch(sortByName()),
  sortByCreated: () => dispatch(sortByCreated()),
  sortByCompleted: () => dispatch(sortByCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routine);
