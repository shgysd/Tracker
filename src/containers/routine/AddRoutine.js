import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, TextInput, Button, Picker } from 'react-native';
import { connect } from 'react-redux';

import { changeRoutineTitle, changeDefaultCount, submitAddRoutine } from '../../actions/routines';

class AddRoutine extends React.Component {
  state = {
    name: "",
    count: 1
  }

  handleCreateRoutine = () => {
    this.props.createRoutine(this.props.name, this.props.count);
    this.props.submitAddRoutine();
  }

  getPickerItems = (count) => {
    const items = [];
    for(let i = 1; i <= count; i++) {
      items.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return items;
  }

  render() {
    return (
      <Modal visible={this.props.visible} onRequestClose={() => this.props.handleVisible(!this.props.visible)} transparent={true} animationType="slide">
        <TouchableWithoutFeedback onPress={ () => this.props.handleVisible(!this.props.visible) }>
          <View style={styles.modalContainer} >
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Create Routine</Text>
                <TextInput
                  value={this.props.name}
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={(value) => this.props.changeRoutineTitle(value)}
                />
                <View style={styles.pickerContainer}>
                  <Text style={styles.dailyCount}>Daily Count</Text>
                  <Picker
                    selectedValue={this.props.count}
                    style={styles.picker}
                    onValueChange={(value) => this.props.changeDefaultCount(value)}
                  >
                    {this.getPickerItems(10)}
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
    alignItems: 'center'
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
  },
  picker: {
    flex: 1,
    color: "#eee",
    alignItems: "center"
  },
  dailyCount: {
    flex: 1,
    color: "#eee",
    fontSize: 18,
    paddingLeft: 4,
    paddingTop: 12
  }
});

const mapStateToProps = state => {
  return ({
    name: state.routines.name,
    count: state.routines.count,
  });
}
const mapDispatchToProps = dispatch => ({
  changeRoutineTitle: (name) => dispatch(changeRoutineTitle(name)),
  changeDefaultCount: (count) => dispatch(changeDefaultCount(count)),
  submitAddRoutine: () => dispatch(submitAddRoutine()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoutine)