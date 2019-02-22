import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    height: 48,
    width: '100%',
    flexDirection: 'row',
  },
  scrollContainer: {
    backgroundColor: '#111',
    padding: 16,
    height: '100%',
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: 480,
    width: '90%',
    backgroundColor: '#333',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#eee',
  },
  icon: {
    margin: 14,
  },
  textInput: {
    color: '#eee',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ff9922',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16,
    padding: 4,
  },
  save: {
    marginTop: 32,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    color: '#eee',
    alignItems: 'center',
  },
  dailyCount: {
    flex: 1,
    color: '#eee',
    fontSize: 18,
    paddingLeft: 4,
    paddingTop: 12,
  },
  listContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    backgroundColor: '#444',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
  dayContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
  createdAt: {
    color: '#f92772',
  },
  date: {
    color: '#999',
  },
  day: {
    color: '#999',
    fontSize: 16,
  },
  done: {
    backgroundColor: '#f92',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
});

class Progress extends React.Component {
  constructor(props) {
    super(props);

    this.count = 0;
  }

  checkComplete = (routine, date) => {
    const result = routine.progress.filter(item => item.date === date && item.count >= 0);
    let value = styles.dateContainer;
    if (result.length > 0) {
      if (result[0].count === 0) {
        value = styles.done;
      }
    }
    return value;
  }

  onPress = (count) => {
    const {
      selectedRoutine,
      completeProgress,
    } = this.props;
    completeProgress(selectedRoutine.key, moment().subtract(count, 'days').format('MM-DD-YYYY'));
  }

  render() {
    const {
      selectedRoutine,
      visible,
      setProgressModalVisible,
      handleShowDetail,
    } = this.props;
    const weeks = [];
    let days = [];
    let count = 0;

    if (selectedRoutine) {
      for (let i = 0; i < 27; i += 1) { // 27 weeks
        if (i === 0) {
          for (let n = 0; n < moment().day() + 1; n += 1) {
            days.unshift((
              <TouchableWithoutFeedback onPress={this.onPress.bind(this, count)} key={count}>
                <View key={n} style={this.checkComplete(selectedRoutine, moment().subtract(count, 'days').format('MM-DD-YYYY'))}>
                  <Text style={moment(selectedRoutine.createdAt).format('MM-DD-YYYY') === moment().subtract(count, 'days').format('MM-DD-YYYY') ? styles.createdAt : styles.date}>
                    {moment().subtract(count, 'days').date()}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ));
            count += 1;
            this.count = count;
          }
        } else {
          for (let n = 0; n < 7; n += 1) {
            days.unshift((
              <TouchableWithoutFeedback onPress={this.onPress.bind(this, count)} key={count}>
                <View key={n} style={this.checkComplete(selectedRoutine, moment().subtract(count, 'days').format('MM-DD-YYYY'))}>
                  <Text style={moment(selectedRoutine.createdAt).format('MM-DD-YYYY') === moment().subtract(count, 'days').format('MM-DD-YYYY') ? styles.createdAt : styles.date}>
                    { moment().subtract(count, 'days').date() }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ));
            count += 1;
          }
        }
        weeks.push((
          <View key={i}>
            {days}
          </View>));
        days = [];
      }
    }

    return (
      <Modal visible={visible} onRequestClose={() => setProgressModalVisible(!visible)} animationType="slide">
        <View style={styles.headerContainer}>
          <Ionicons name="md-arrow-round-back" size={20} color="white" style={styles.icon} onPress={() => handleShowDetail(!visible)} />
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.listContainer}
          >
            {weeks}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

Progress.defaultProps = {
  handleShowDetail: null,
  visible: false,
  selectedRoutine: null,
  setProgressModalVisible: false,
  completeProgress: null,
};

Progress.propTypes = {
  handleShowDetail: PropTypes.func,
  visible: PropTypes.bool,
  setProgressModalVisible: PropTypes.func,
  completeProgress: PropTypes.func,
  selectedRoutine: PropTypes.shape({
    item: PropTypes.shape({
      name: PropTypes.string,
      count: PropTypes.number,
      progress: PropTypes.array,
      key: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  }),
};

export default Progress;
