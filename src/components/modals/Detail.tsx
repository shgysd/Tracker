import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Button,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import moment from 'moment';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#000',
    height: 48,
    width: '100%',
    flexDirection: 'row',
  },
  homeContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: '#222',
    flex: 1,
  },
  listContainer: {
    flexDirection: 'row',
  },
  title: {
    color: '#fafafa',
    fontSize: 20,
    padding: 12,
  },
  historyContainer: {
    backgroundColor: '#333',
    width: '100%',
    height: 256,
    padding: 16,
    paddingTop: 8,
    marginBottom: 8,
  },
  historyViewContainer: {
    flexDirection: 'row',
  },
  historyEditContainer: {
    flexDirection: 'row',
  },
  historyLeft: {
    flex: 1,
    paddingTop: 8,
  },
  historyRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  history: {
    color: '#999',
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '100',
  },
  dateContainer: {
    backgroundColor: '#444',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
  dayContainer: {
    width: 24,
    height: 24,
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
    fontSize: 9,
  },
  done: {
    backgroundColor: '#f92',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0.5,
  },
  streakContainer: {
    backgroundColor: '#333',
    width: '100%',
    height: 80,
    padding: 16,
    paddingTop: 8,
    marginBottom: 8,
  },
  icon: {
    margin: 14,
  },
  delete: {
    color: '#f44336',
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
  visible: boolean;
  selectedRoutine: RoutineTypes;
  setProgressModalVisible: (visible: boolean, routine: RoutineTypes) => void;
  deleteRoutine: (
    key: string,
  ) => void;
  handleShowDetail: (visible: boolean, routine: RoutineTypes) => void;
}

class Detail extends React.Component<PropTypes> {
  checkComplete = (routine: RoutineTypes, date: string) => {
    const result = routine.progress.filter(item => item.date === date && item.count >= 0);
    let value = styles.dateContainer;
    if (result.length > 0) {
      if (result[0].count === 0) {
        value = styles.done;
      }
    }
    return value;
  }

  getPreviousDate = (count: number) => moment().subtract(count, 'days').format('MM-DD-YYYY');

  getFormatedDate = (date: string) => moment(date).format('MM-DD-YYYY');

  getCreatedDateStyle = (date: string, count: number) => {
    if (this.getFormatedDate(date) === this.getPreviousDate(count)) {
      return styles.createdAt;
    }
    return styles.date;
  }

  render() {
    const {
      selectedRoutine,
      visible,
      setProgressModalVisible,
      deleteRoutine,
      handleShowDetail,
    } = this.props;
    const title = selectedRoutine ? selectedRoutine.name : '';
    const weeks = [];
    let days = [];
    let count = 0;

    if (selectedRoutine) {
      for (let i = 0; i < 27; i += 1) { // 27 weeks
        if (i === 0) {
          for (let n = 0; n < moment().day() + 1; n += 1) {
            days.unshift((
              <View
                key={n}
                style={this.checkComplete(selectedRoutine, this.getPreviousDate(count))}
              >
                <Text style={this.getCreatedDateStyle(selectedRoutine.createdAt, count)}>
                  {moment().subtract(count, 'days').date()}
                </Text>
              </View>
            ));
            count += 1;
          }
        } else {
          for (let n = 0; n < 7; n += 1) {
            days.unshift((
              <View
                key={n}
                style={this.checkComplete(selectedRoutine, this.getPreviousDate(count))}
              >
                <Text style={this.getCreatedDateStyle(selectedRoutine.createdAt, count)}>
                  {moment().subtract(count, 'days').date()}
                </Text>
              </View>
            ));
            count += 1;
          }
        }
        weeks.push((
          <View key={i}>
            {days}
          </View>
        ));
        days = [];
      }
    }

    return (
      <Modal
        visible={visible}
        onRequestClose={() => handleShowDetail(!visible, selectedRoutine)} animationType="slide">
        <View style={styles.homeContainer}>
          <View style={styles.headerContainer}>
            <Ionicons
              name="md-arrow-round-back"
              size={20}
              color="white"
              style={styles.icon}
              onPress={() => handleShowDetail(!visible, selectedRoutine)}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.historyContainer}>
              <View>
                <View style={styles.historyEditContainer}>
                  <View style={styles.historyLeft}>
                    <Text style={styles.history}>History</Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Feather
                      name="edit"
                      size={20}
                      color="#ccc"
                      style={styles.icon}
                      onPress={setProgressModalVisible}
                    />
                  </View>
                </View>
                <View style={styles.historyViewContainer}>
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
              </View>
            </View>
            <View>
              <Button
                color="#111"
                title="DELETE"
                onPress={() => deleteRoutine(selectedRoutine.key)}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default Detail;
