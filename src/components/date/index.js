import React from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, TouchableOpacity, Vibration, AsyncStorage } from 'react-native';
import moment from 'moment';

const date = (props) => {
  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateLeftContainer}>

      </View>
      <View style={styles.dateRightContainer}>
        {getDateView()}
      </View>
  </View>
  );
};

const getDateView = () => {
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
  return date;
}

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

export default date;
