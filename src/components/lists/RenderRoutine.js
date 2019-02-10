import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import moment from 'moment';

export default class RenderItem extends React.Component {

  progressScreen = () => {
    const progress = [];

    for(let i = 0; i < 5; i++) {
      let date = moment().subtract(i, 'days').format('MM-DD-YYYY');
      let count = this.props.routine.item.count;

      this.props.routine.item.progress.map((progress) => {
        if(progress.date === date) {
          count = progress.count;
        };
      });

      const countText = count ? count : <Entypo name="check" size={20} color="#f92" />;

      progress.push(
        <View key={i} style={styles.numberContainer}>
          <TouchableOpacity onPress={() => this.props.handleProgress(this.props.routine.item.key ,date)}>
            <View style={styles.innerNumberContainer}>
              <Progress.Circle progress={1 - count / this.props.routine.item.count} size={28} indeterminate={false} borderWidth={1} borderColor={"#f92"} color={"#f92"} />
              <Text style={styles.numberItem}>{ countText }</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }

    return progress;
  }

  render() {
    return (
      <View style={styles.renderItem}>
        <View style={styles.textContainer}>
          <TouchableOpacity onPress={() => this.props.handleShowDetail(!this.props.visible, this.props.routine.item)}>
            <View style={styles.touchArea}>
              <Text style={styles.textItem}>{this.props.routine.item.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.dateContainer}>
          {this.progressScreen()}
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
    renderItem: {
        width: "100%",
        height: 56,
        marginBottom: 2,
        backgroundColor: "#333",
        flexDirection: "row",
        alignItems: "center",
        flexDirection: "row"
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