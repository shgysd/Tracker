import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, FlatList, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { connect } from 'react-redux';
import { increment, decrement, setInputModalVisible, setDetailModalVisible, addRoutine } from '../actions/routines'

import db from '../configs/firebase';

import AddRoutine from '../components/modals/AddRoutine';
import RenderItem from '../components/lists/RenderRoutine';
import Detail from '../components/modals/Detail';

class Routine extends React.Component {
  state = {
    routines: [],
    inputModalVisible: false,
    detailModalVisible: false,
    selectedRoutine: null
  };

  setInputModalVisible = (visible) => {
    this.props.setInputModalVisible(visible);
  }

  setDetailModalVisible = (visible, routine) => {
    this.props.setDetailModalVisible(visible, routine);
  }

  setRoutine = async (name, count) => {
    // const uid = await AsyncStorage.getItem('uid');
    // const routines = this.state.routines.slice();
    // const createdAt = moment().format();

    // if(uid) {
    //   db.ref('Users/' + uid + '/routines/').push({
    //     name: name,
    //     count: count,
    //     progress: [], 
    //     key: Math.random().toString(),
    //     createdAt: createdAt
    //   }).then(routine => {
    //     routines.push({name: name, count: count, progress: [], key: routine.key, createdAt: createdAt});
    //     this.setState({routines: routines}, () => {
    //       AsyncStorage.setItem('routines', JSON.stringify(routines)).then(() => {
    //         db.ref('Users/' + uid + '/routines/').child(routine.key).set({name: name, count: count, progress: [], key: routine.key, createdAt: createdAt});
    //       }).catch((err) => {
    //         console.log(err);
    //       });
    //     });
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // } else {
    //   routines.push({name: name, count: count, progress: [], key: Math.random().toString(), createdAt: createdAt});
    //   this.setState({routines: routines}, () => {
    //     AsyncStorage.setItem('routines', JSON.stringify(routines)).catch((err) => {
    //       console.log(err);
    //     });
    //   });
    // }

    this.props.addRoutine(name, count);
    this.props.setInputModalVisible(false);
  }

  deleteRoutine = async (routine, visible) => {
    const uid = await AsyncStorage.getItem('uid');
    Alert.alert(
      'Alert Title',
      'Would you really like to delete?',
      [
        {text: 'NO', onPress: () => {}},
        {text: 'YES', onPress: () => {
          const routines = this.state.routines.slice();
          const newRoutines = routines.filter(item => {
            return item.key !== routine.key
          });
      
          this.setState({routines: newRoutines}, () => {
            AsyncStorage.setItem('routines', JSON.stringify(newRoutines)).then(() => {
              if(uid) {
                db.ref('Users/' + uid + '/routines/').child(routine.key).remove();
              }
            });
          });

          this.setDetailModalVisible(visible)
        }}
      ]
    );
  }

  setProgress = async (key, date) => {
    const uid = await AsyncStorage.getItem('uid');
    let newRoutine = null;
    const routines = this.state.routines.map(routine =>{
      if(routine.key === key) {
        const progress = routine.progress.find(item => {
          if(item.date === date) {
            if(0 < item.count) {
              item.count -= 1;
            } else {
              item.count = routine.count;
            }
          }
          return item.date === date;
        });

        if(!progress) {
          routine.progress.push({ date: date, count: routine.count - 1 });
        };

        newRoutine = routine;
      }
      return routine;
    });
    this.setState({routines: routines}, () => {
      AsyncStorage.setItem('routines', JSON.stringify(routines));
      db.ref('Users/' + uid + '/routines/').child(newRoutine.key).set(newRoutine);
    });
  }


  async componentWillMount() {
    const uid = await AsyncStorage.getItem('uid');
    await AsyncStorage.getItem('routines').then(routines => {
      if(routines) {
        this.setState({ routines: JSON.parse(routines) });
      } else {
        const routines = this.state.routines.slice();
        db.ref('Users/' + uid + '/routines/').on('value', (snapshot) => {
          snapshot.forEach((val) => {
            const progress = val.child('count').progress ? val.child('count').progress : [];
            routines.push({
              name: val.child('name').val(),
              count: val.child('count').val(),
              progress: progress, 
              key: val.child('key').val(),
              createdAt: val.child('createdAt').val()
            })
          })
          this.setState({routines: routines}, () => {
            AsyncStorage.setItem('routines', JSON.stringify(routines));
          });
        });
      }
    });
  }

  render() {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = [];
    for(let i = 0; i < 5;i++) {
      date.push(
        <View key={i} style={{flex:1, alignItems: "center"}}>
          <Text style={styles.time}>{days[moment().subtract(i, "days").day()]}</Text>
          <Text style={styles.time}>{moment().subtract(i, "days").date()}</Text>
        </View>
      )
    }
    return (
      <View style={styles.homeContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeftContainer}>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name="md-add" size={28} color="white" onPress={() => { this.setInputModalVisible(!this.state.inputModalVisible); }} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerRightContainer}>
            {date}
          </View>
        </View>
        <View style={styles.mainContainer}>
          <FlatList
            style={styles.listContainer}
            data={this.props.routines}
            renderItem={(routine) => (
              <RenderItem routine={routine} handleProgress={this.setProgress} handleShowDetail={this.setDetailModalVisible} visible={this.detailModalVisible} />
            )}
          />
        </View>
        <AddRoutine visible={this.props.inputModalVisible} handleVisible={this.setInputModalVisible} createRoutine={this.setRoutine} />
        <Detail visible={this.props.detailModalVisible} handleShowDetail={this.setDetailModalVisible} selectedRoutine={this.props.selectedRoutine} deleteRoutine={this.deleteRoutine} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 48,
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
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
    flexDirection: "row",
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: "row",
  },
  time: {
    color: "#777",
    fontSize: 11
  },
  icon: {
    marginLeft: 12
  }
});

const mapStateToProps = state => {
return ({
  routines: state.routines.routines,
  inputModalVisible: state.routines.inputModalVisible,
  detailModalVisible: state.routines.detailModalVisible,
  selectedRoutine: state.routines.selectedRoutine
});
}
const mapDispatchToProps = dispatch => ({
  addRoutine: (name, count) => dispatch(addRoutine(name, count)),
  setInputModalVisible: (visible) => dispatch(setInputModalVisible(visible)),
  setDetailModalVisible: (visible, routine) => dispatch(setDetailModalVisible(visible, routine)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routine)