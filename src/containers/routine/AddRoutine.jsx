import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Picker,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeRoutineTitle, changeDefaultCount, submitAddRoutine } from '../../actions/routines';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    height: 240,
    width: '80%',
    backgroundColor: '#333',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#eee',
  },
  textInput: {
    color: '#eee',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ff9922',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 16,
    padding: 4,
  },
  save: {
    marginTop: 32,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
    color: '#eee',
    alignItems: 'center',
  },
  dailyCount: {
    flex: 1,
    color: '#eee',
    fontSize: 18,
    paddingLeft: 4,
    paddingTop: 12,
  },
});

class AddRoutine extends React.Component {
  handleCreateRoutine = () => {
    const {
      name,
      count,
      createRoutine,
      submitAddRoutine: _submitAddRoutine,
    } = this.props;
    createRoutine(name, count);
    _submitAddRoutine();
  }

  getPickerItems = (count) => {
    const items = [];
    for (let i = 1; i <= count; i += 1) {
      items.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return items;
  }

  render() {
    const {
      visible,
      handleVisible,
      name,
      count,
      changeRoutineTitle: _changeRoutineTitle,
      changeDefaultCount: _changeDefaultCount,
    } = this.props;
    return (
      <Modal visible={visible} onRequestClose={() => handleVisible(!visible)} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => handleVisible(!visible)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                <Text style={styles.title}>Create Routine</Text>
                <TextInput
                  value={name}
                  placeholder="Name"
                  style={styles.textInput}
                  onChangeText={value => _changeRoutineTitle(value)}
                />
                <View style={styles.pickerContainer}>
                  <Text style={styles.dailyCount}>Daily Count</Text>
                  <Picker
                    selectedValue={count}
                    style={styles.picker}
                    onValueChange={value => _changeDefaultCount(value)}
                  >
                    {this.getPickerItems(10)}
                  </Picker>
                </View>
                <Button style={styles.save} color="#222" title="SAVE" onPress={this.handleCreateRoutine} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

AddRoutine.defaultProps = {
  name: null,
  count: null,
  visible: null,
  createRoutine: null,
  submitAddRoutine: null,
  handleVisible: null,
  changeRoutineTitle: null,
  changeDefaultCount: null,
};

AddRoutine.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number,
  visible: PropTypes.bool,
  createRoutine: PropTypes.func,
  submitAddRoutine: PropTypes.func,
  handleVisible: PropTypes.func,
  changeRoutineTitle: PropTypes.func,
  changeDefaultCount: PropTypes.func,
};

const mapStateToProps = state => ({
  name: state.routines.name,
  count: state.routines.count,
});

const mapDispatchToProps = dispatch => ({
  changeRoutineTitle: name => dispatch(changeRoutineTitle(name)),
  changeDefaultCount: count => dispatch(changeDefaultCount(count)),
  submitAddRoutine: () => dispatch(submitAddRoutine()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRoutine);
