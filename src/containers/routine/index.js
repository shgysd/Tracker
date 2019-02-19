import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity, Vibration, AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
import { connect } from 'react-redux';
import { setInputModalVisible, setDetailModalVisible, addRoutine, deleteRoutine, updateProgress, getRoutineFromCache } from '../../actions/routines';

import Header from '../../components/header';
import Date from '../../components/date';
import AddRoutine from './AddRoutine';
import RenderRoutine from '../../components/flatlists/RenderRoutine';
import Detail from '../../components/modals/Detail';

class Routine extends React.Component {
  state = {
    routines: [],
    inputModalVisible: false,
    detailModalVisible: false,
    selectedRoutine: null
  };

  handleSetInputModalVisible = () => {
    Vibration.vibrate(6);
    this.props.setInputModalVisible(!this.props.inputModalVisible);
  };

  handleSetDetailModalVisible = (visible, routine) => {
    this.props.setDetailModalVisible(visible, routine);
  };

  addRoutine = (name, count) => {
    if(name.length > 0) {
      this.props.addRoutine(name, count);
    } else {
      Vibration.vibrate(8);
    };
  };

  deleteRoutine = (key) => {
    this.props.deleteRoutine(key);
  };

  setProgress = (key, date) => {
    Vibration.vibrate(4);
    this.props.updateProgress(key, date, this.props.routines);
  };

  render() {
    return (
      <View style={styles.homeContainer}>
        <Header
          inputModalVisible={this.props.inputModalVisible}
          setInputModalVisible={ this.props.setInputModalVisible }
        />
        <Date />
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.props.routines}
            renderItem={(routine) => (
              <RenderRoutine routine={routine} handleProgress={this.setProgress} handleShowDetail={this.handleSetDetailModalVisible} visible={this.detailModalVisible} />
            )}
          />
        </View>
        <AddRoutine visible={this.props.inputModalVisible} handleVisible={() => this.props.setInputModalVisible(!this.props.inputModalVisible)} createRoutine={this.addRoutine} />
        <Detail visible={this.props.detailModalVisible} handleShowDetail={this.handleSetDetailModalVisible} selectedRoutine={this.props.selectedRoutine} deleteRoutine={this.deleteRoutine} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  dateContainer: {
    backgroundColor: "#111",
    height: 48,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row"
  },
  dateLeftContainer: {
    flex: 1,
    flexDirection: "row",
  },
  dateRightContainer: {
    flex: 1,
    flexDirection: "row",
  },
  time: {
    color: "#777",
    fontSize: 11
  },
  icon: {
    marginLeft: 12
  },
  homeContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  mainContainer: {
    backgroundColor: "#222",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    width: "100%"
  },
});

const mapStateToProps = state => ({
  uid: state.users.uid,
  routines: state.routines.routines,
  inputModalVisible: state.routines.inputModalVisible,
  detailModalVisible: state.routines.detailModalVisible,
  selectedRoutine: state.routines.selectedRoutine
});

const mapDispatchToProps = dispatch => ({
  addRoutine: (name, count) => dispatch(addRoutine(name, count)),
  deleteRoutine: (routine) => dispatch(deleteRoutine(routine)),
  updateProgress: (key, date, routine) => dispatch(updateProgress(key, date, routine)),
  getRoutineFromCache: () => dispatch(getRoutineFromCache()),
  setInputModalVisible: (visible) => dispatch(setInputModalVisible(visible)),
  setDetailModalVisible: (visible, routine) => dispatch(setDetailModalVisible(visible, routine)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routine);
