import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import moment from 'moment';

interface Props {
  handleShowDetail: any,
  handleProgress: any,
  routine: any,
  visible: boolean
}

const RenderRoutine = (props: Props) => (
  <View style={styles.renderItem}>
    <View style={styles.textContainer}>
      <TouchableOpacity onPress={() => props.handleShowDetail(!props.visible, props.routine.item)}>
        <View style={styles.touchArea}>
          <Text style={styles.textItem}>{props.routine.item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
    <View style={styles.dateContainer}>
      {progressScreen(props)}
    </View>
  </View>
);

const progressScreen = (props: Props) => {
  const progress = [];

  for(let i = 0; i < 5; i++) {
    let date = moment().subtract(i, 'days').format('MM-DD-YYYY');
    let count = props.routine.item.count;

    props.routine.item.progress.map((progress: {[key: string]: string}) => {
      if(progress.date === date) {
        count = progress.count;
      };
    });

    const countText = count ? count : <Entypo name="check" size={20} color="#f92" />;

    progress.push(
      <View key={i} style={styles.numberContainer}>
        <TouchableOpacity onPress={() => props.handleProgress(props.routine.item.key ,date)}>
          <View style={styles.innerNumberContainer}>
            <Progress.Circle progress={1 - count / props.routine.item.count} size={28} indeterminate={false} borderWidth={1} borderColor={"#f92"} color={"#f92"} />
            <Text style={styles.numberItem}>{ countText }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return progress;
}

const styles = StyleSheet.create({
    renderItem: {
        width: "100%",
        height: 56,
        marginBottom: 2,
        backgroundColor: "#333",
        flexDirection: "row",
        alignItems: "center"
    },
    textContainer: {
      flex: 1
    },
    textItem: {
      color: "#ff9922"
    },
    touchArea: {
      height: 56,
      paddingLeft: 16,
      justifyContent: 'center',
    },
    dateContainer: {
      flex: 1,
      flexDirection: "row",
      height: 48
    },
    numberContainer: {
      flex: 1,
    },
    innerNumberContainer: {
      alignItems: "center",
      paddingTop: 10
    },
    numberItem: {
      color: "#f92",
      position: "absolute",
      top: 14,
    }
});

export default RenderRoutine;
