import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  Vibration,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/header';
import Date from '../../components/date';
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

class Routine extends React.Component {
  handleSetInputModalVisible = () => {
    const { setInputModalVisible: handleSetInputModalVisible, inputModalVisible } = this.props;
    Vibration.vibrate(6);
    handleSetInputModalVisible(!inputModalVisible);
  };

  handleSetDetailModalVisible = (visible, routine) => {
    const { setDetailModalVisible: _setDetailModalVisible } = this.props;
    _setDetailModalVisible(visible, routine);
  };

  addRoutine = (name, count) => {
    const { addRoutine: _addROutine } = this.props;
    if (name.length > 0) {
      _addROutine(name, count);
    } else {
      Vibration.vibrate(8);
    }
  };

  deleteRoutine = (key) => {
    const { deleteRoutine: _deleteRoutine } = this.props;
    _deleteRoutine(key);
  };

  setProgress = (key, date) => {
    const { updateProgress: _updateProgress } = this.props;
    Vibration.vibrate(4);
    _updateProgress(key, date);
  };

  completeProgress = (key, date) => {
    const { completeProgress: _completeProgress } = this.props;
    Vibration.vibrate(4);
    _completeProgress(key, date);
  };

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
        <Date />
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.listContainer}
            data={routines}
            renderItem={routine => (
              <RenderRoutine
                routine={routine}
                handleProgress={this.setProgress}
                handleShowDetail={this.handleSetDetailModalVisible}
                visible={this.detailModalVisible}
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

Routine.defaultProps = {
  addRoutine: null,
  deleteRoutine: null,
  updateProgress: null,
  completeProgress: null,
  setDetailModalVisible: null,
  setInputModalVisible: null,
  inputModalVisible: false,
  setSortModalVisible: null,
  sortModalVisible: null,
  routines: null,
  sortByName: null,
  sortByCreated: null,
  sortByCompleted: null,
  detailModalVisible: null,
  setProgressModalVisible: null,
  progressModalVisible: null,
  selectedRoutine: null,
};

Routine.propTypes = {
  addRoutine: PropTypes.func,
  deleteRoutine: PropTypes.func,
  updateProgress: PropTypes.func,
  completeProgress: PropTypes.func,
  setDetailModalVisible: PropTypes.func,
  setInputModalVisible: PropTypes.func,
  setSortModalVisible: PropTypes.func,
  inputModalVisible: PropTypes.bool,
  sortModalVisible: PropTypes.bool,
  routines: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    progress: PropTypes.array,
    key: PropTypes.string,
    createdAt: PropTypes.string,
  })),
  sortByName: PropTypes.func,
  sortByCreated: PropTypes.func,
  sortByCompleted: PropTypes.func,
  detailModalVisible: PropTypes.bool,
  setProgressModalVisible: PropTypes.func,
  progressModalVisible: PropTypes.bool,
  selectedRoutine: PropTypes.shape({
    name: PropTypes.string,
    count: PropTypes.number,
    progress: PropTypes.array,
    key: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  uid: state.users.uid,
  routines: state.routines.routines,
  inputModalVisible: state.routines.inputModalVisible,
  detailModalVisible: state.routines.detailModalVisible,
  sortModalVisible: state.routines.sortModalVisible,
  progressModalVisible: state.routines.progressModalVisible,
  selectedRoutine: state.routines.selectedRoutine,
});

const mapDispatchToProps = dispatch => ({
  addRoutine: (name, count) => dispatch(addRoutine(name, count)),
  deleteRoutine: routine => dispatch(deleteRoutine(routine)),
  updateProgress: (key, date, routine) => dispatch(updateProgress(key, date, routine)),
  completeProgress: (key, date, routine) => dispatch(completeProgress(key, date, routine)),
  setInputModalVisible: visible => dispatch(setInputModalVisible(visible)),
  setDetailModalVisible: (visible, routine) => dispatch(setDetailModalVisible(visible, routine)),
  setSortModalVisible: visible => dispatch(setSortModalVisible(visible)),
  setProgressModalVisible: visible => dispatch(setProgressModalVisible(visible)),
  sortByName: () => dispatch(sortByName()),
  sortByCreated: () => dispatch(sortByCreated()),
  sortByCompleted: () => dispatch(sortByCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routine);
