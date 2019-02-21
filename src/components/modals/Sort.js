import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TextInput, Button, Picker } from 'react-native';

const sort = (props) => {
  return (
    <Modal visible={props.visible} onRequestClose={ () => {} } transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={props.handleVisible}>
        <View style={styles.modalContainer} >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.innerContainer}>
              <TouchableWithoutFeedback onPress={ props.sortByCompleted }>
                <View style={styles.sortContainer}><Text style={styles.sortText}>Completed</Text></View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={ props.sortByCreated }>
                <View style={styles.sortContainer}><Text style={styles.sortText}>Created</Text></View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={ props.sortByName }>
                <View style={styles.sortContainer}><Text style={styles.sortText}>Name</Text></View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    paddingTop: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end'
  },
  innerContainer: {
    height: 180,
    width: 180
  },
  title: {
    fontSize: 24,
    color: '#eee'
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
  sortContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sortText: {
    fontSize: 20,
    color: '#fafafa',
    textAlign: 'right',
    paddingRight: 24
  }
});

export default sort;
