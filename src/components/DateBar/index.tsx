import * as React from 'react';
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

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

const getDateView = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = [];
  for (let i = 0; i < 5; i += 1) {
    date.push(
      <View key={i} style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.time}>{days[moment().subtract(i, 'days').day()]}</Text>
        <Text style={styles.time}>{moment().subtract(i, 'days').date()}</Text>
      </View>,
    );
  }
  return date;
};

const date = () => (
  <View style={styles.dateContainer}>
    <View style={styles.dateLeftContainer} />
    <View style={styles.dateRightContainer}>
      {getDateView()}
    </View>
  </View>
);

export default date;
