import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TextInput, Button, Picker, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import { Ionicons, Feather } from '@expo/vector-icons';

import { changeRoutineTitle, changeDefaultCount, submitAddRoutine } from '../../actions/routines';

class Progress extends React.Component {
  checkComplete = (routine, date) => {
    let style = styles.dateContainer;
    routine.progress.map((item) => {
      if(item.date === date && 0 >= item.count ) {
        style = styles.done;
      }
    });
    return style;
  }

  

  onPress =(count) => {
    this.props.completeProgress(this.props.selectedRoutine.key, moment().subtract(count, 'days').format('MM-DD-YYYY'));
  }

  render() {
    const title = this.props.selectedRoutine ? this.props.selectedRoutine.name : "";
    const weeks = [];
    const selectedRoutine = this.props.selectedRoutine ? this.props.selectedRoutine : null;
    let days = [];
    let count = 0;

    if(selectedRoutine) {
      for(let i = 0; i < 27; i++) { // 27 weeks
        if(i === 0) {
          for(let n = 0; n < moment().day() + 1; n++) {
            console.log(moment(selectedRoutine.createdAt).format('MM-DD-YYYY'), moment().subtract(count, 'days').format('MM-DD-YYYY'));
            days.unshift((
              <TouchableWithoutFeedback onPress={this.onPress.bind(this, count)}>
                <View key={n} style={this.checkComplete(selectedRoutine, moment().subtract(count, 'days').format('MM-DD-YYYY'))}>
                  <Text style={ moment(selectedRoutine.createdAt).format('MM-DD-YYYY') === moment().subtract(count, 'days').format('MM-DD-YYYY') ? styles.createdAt : styles.date }>
                    {moment().subtract(count, 'days').date()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))
            count++;
          }
        } else {
          for(let n = 0; n < 7; n++) {
            days.unshift((
              <TouchableWithoutFeedback onPress={this.onPress.bind(this, count)}>
                <View key={n} style={this.checkComplete(selectedRoutine, moment().subtract(count, 'days').format('MM-DD-YYYY'))}>
                  <Text style={ moment(selectedRoutine.createdAt).format('MM-DD-YYYY') === moment().subtract(count, 'days').format('MM-DD-YYYY') ? styles.createdAt : styles.date }>
                    { moment().subtract(count, 'days').date() }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))
            count++;
          }
        }
        weeks.push((
          <View key={i}>
            {days}
          </View>)
        )
        days = [];
      }
    }

    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.setProgressModalVisible(!this.props.visible)} animationType="slide">
        <View style={styles.headerContainer}>
          <Ionicons name="md-arrow-round-back" size={20} color="white" style={styles.icon} onPress={() => this.props.handleShowDetail(!this.props.visible)} />
        </View>
        <View style={styles.scrollContainer}>
          <View>
            <View style={styles.dayContainer}><Text style={styles.day}>Sun</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Mon</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Tue</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Wed</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Thu</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Fri</Text></View>
            <View style={styles.dayContainer}><Text style={styles.day}>Sat</Text></View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.listContainer}>
            {weeks}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#000",
    height: 48,
    width: "100%",
    flexDirection: "row"
  },
  scrollContainer: {
    backgroundColor: '#111',
    padding: 16,
    height: '100%',
    flexDirection: "row"
  },
  modalContainer: {
    flex:1,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerContainer: {
    height: 480,
    width: "90%",
    backgroundColor: "#333",
    padding: 16
  },
  title: {
    fontSize: 24,
    color: '#eee'
  },
  icon: {
    margin: 14
  },
  textInput: {
    color: '#eee',
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: '#ff9922',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16,
    padding: 4
  },
  save: {
    marginTop: 32
  },
  pickerContainer: {
    flex: 1,
    flexDirection: "row"
  },
  picker: {
    flex: 1,
    color: "#eee",
    alignItems: "center"
  },
  dailyCount: {
    flex: 1,
    color: "#eee",
    fontSize: 18,
    paddingLeft: 4,
    paddingTop: 12
  },
  listContainer: {
    flexDirection: 'row'
  },
  dateContainer: {
    backgroundColor: "#444",
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5
  },
  dayContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5
  },
  createdAt: {
    color: "#f92772"
  },
  date: {
    color: "#999"
  },
  day: {
    color: "#999",
    fontSize: 16
  },
  done: {
    backgroundColor: "#f92",
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5
  },
});

export default Progress;