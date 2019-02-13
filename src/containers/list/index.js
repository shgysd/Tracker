import React from 'react';
import { StyleSheet, AsyncStorage, View, StatusBar, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import db from '../../configs/firebase';

import CreateList from '../../components/modals/CreateList';
import RenderTask from '../../components/flatlists/RenderTask';

export default class Todo extends React.Component {
  state = {
    tasks: [{name: 1, status: false}],
    createListVisible: false
  };

  setCreateListVisible = (visible) => {
    this.setState({createListVisible: visible});
  }

  setLists = async (name) => {
    const uid = await AsyncStorage.getItem('uid');
    const tasks = this.state.tasks.slice();
    const createdAt = moment().format();

    tasks.push({ name: name, status: false});
    this.setState({tasks: tasks}, () => {
      AsyncStorage.setItem('tasks', JSON.stringify(tasks)).then(() => {
        if(uid) {
          db.ref('Users/' + uid + '/tasks/').push({
            name: name,
            status: false,
            createdAt: createdAt
          });
        };
      });
    });
  }

  setStatus = (index) => {
    const tasks = this.state.tasks.slice();
    tasks[index].status = !tasks[index].status;
    this.setState({tasks: tasks}, () => {
      AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  async componentWillMount() {
    const uid = await AsyncStorage.getItem('uid');
    await AsyncStorage.getItem('tasks').then((tasks) => {
      if(tasks) {
        this.setState({ tasks: JSON.parse(tasks)});
      } else {
        const tasks = this.state.tasks.slice();
        db.ref('Users/' + uid + '/tasks/').on('value', (snapshot) => {
          snapshot.forEach((val) => {
            tasks.push({
              name: val.child('name').val(),
              status: val.child('status').val()
            })
          })
          this.setState({tasks: tasks});
        });
      }
    }).catch((error) => {
      const { code, message } = error;
      console.log(message);
    });
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
            data={this.state.tasks}
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