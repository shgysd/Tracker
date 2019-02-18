import React from 'react';
import { StyleSheet, AsyncStorage, View, StatusBar, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { addTask } from '../../actions/lists'

import db from '../../configs/firebase';

import CreateList from '../../components/modals/CreateList';
import RenderTask from '../../components/flatlists/RenderTask';

class List extends React.Component {
  state = {
    tasks: [{name: 1, status: false}],
    createListVisible: false
  };

  setCreateListVisible = (visible) => {
    this.setState({createListVisible: visible});
  }

  setLists = (name) => {
    console.log(1);
    this.props.addTask(name);
  }

  setStatus = (index) => {
    const tasks = this.state.tasks.slice();
    tasks[index].status = !tasks[index].status;
    this.setState({tasks: tasks}, () => {
      AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  async componentWillMount() {

  }

  render() {
    return (
      <View style={styles.homeContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeftContainer}>
            <Ionicons name="md-add" size={24} color="white" onPress={() => { this.setCreateListVisible(!this.state.createListVisible); }} />
          </View>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.props.tasks}
            renderItem={(data) => {
              let { index } = data;
              return (
                <RenderTask onSetStatus={this.setStatus} tasks={data} index={index} />
              )
            }
            }
          />
        </View>
        <CreateList onSetLists={this.setLists} visible={this.state.createListVisible} onSetCreateListVisible={this.setCreateListVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 48,
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    flexDirection: "row"
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
  headerLeftContainer: {
    flex: 1,
    flexDirection: "row"
  },
  time: {
    color: "#777",
    fontSize: 11
  }
});

const mapStateToProps = state => {
  console.log(state);
  return ({
    tasks: state.lists.tasks,
  });
}

const mapDispatchToProps = dispatch => ({
  addTask: (name) => dispatch(addTask(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);