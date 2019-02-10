import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TextInput, Button, Picker } from 'react-native';

export default class AddRoutine extends React.Component {

  state = {
    name: "",
    count: 1
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
      <Modal visible={this.props.visible} onRequestClose={this.handleCloseModal} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={ this.handleCloseModal }>
          <View style={styles.modalContainer} >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Create Routine</Text>
                <TextInput
                  value={this.state.name}
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={this.handleChangeText}
                />
                <View style={styles.pickerContainer}>
                  <Text style={{flex: 1,color: "#eee", fontSize: 18, paddingLeft: 4, paddingTop: 12}}>Daily Count</Text>
                  <Picker
                    selectedValue={this.state.count}
                    style={{flex: 1, color: "#eee", alignItems: "center"}}
                    onValueChange={this.handleChangeCount}
                  >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                    <Picker.Item label="7" value="7" />
                  </Picker>
                </View>
                <Button style={styles.save} color="#222" title="SAVE" onPress={ this.handleCreateRoutine } />
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
    height: 240,
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