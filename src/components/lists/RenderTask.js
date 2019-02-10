import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default class RenderTask extends React.Component {
  state = {
    progress: 0
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onSetStatus(this.props.index)}>
        <View style={styles.itemContainer}><Text style={this.props.tasks.item.status ? styles.itemDone : styles.item}>{this.props.tasks.item.name}</Text></View>
      </TouchableOpacity>
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
      flex: 1,
      paddingLeft: 16
    },
    textItem: {
      color: "#ff9922"
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
    },
    itemContainer: {
      width: "100%",
      height: 56,
      marginBottom: 2,
      backgroundColor: "#333",
      justifyContent: "center",
      paddingLeft: 16
    },
    item: {
      color: "#fafafa",
      fontSize: 18
    },
    itemDone: {
      color: "#fafafa",
      fontSize: 18,
      textDecorationLine: "line-through"
    }
});