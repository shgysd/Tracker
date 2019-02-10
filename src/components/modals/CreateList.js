import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TextInput, Button, Picker } from 'react-native';

export default class AddRoutine extends React.Component {

  state = {
    name: ""
  }

  handleCloseModal = () => {
    this.props.handleVisible(!this.props.visible);
  }

  handleCreateRoutine = () => {
    this.props.createRoutine(this.state.name, this.state.count);
    this.setState({
      name: "",
      count: 1
    });
  }

  handleChangeText = (value) => {
    this.setState({
      name: value
    });
  };

  handleChangeCount = (value) => {
    this.setState({
      count: value
    });
  };

  render() {
    return (
      <Modal visible={this.props.visible} onRequestClose={ () => this.props.onSetCreateListVisible(!this.props.visible) } transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={ () => this.props.onSetCreateListVisible(!this.props.visible) }>
          <View style={styles.modalContainer} >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Create New List</Text>
                <TextInput
                  value={this.state.name}
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={this.handleChangeText}
                />
                <Button style={styles.save} color="#222" title="SAVE" onPress={ () => this.props.onSetLists(this.state.name) } />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex:1,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: 180,
    width: "80%",
    backgroundColor: "#333",
    padding: 16
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
  }
});