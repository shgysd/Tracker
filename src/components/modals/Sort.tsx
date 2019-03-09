import * as React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  toggleSortScreen,
  sortByCompleted,
  sortByCreated,
  sortByName,
} from '../../actions/routines';
import { StateTypes } from '../../common/types';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 56,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-end',
  },
  innerContainer: {
    height: 180,
    width: 180,
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
  sortContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  sortText: {
    fontSize: 20,
    color: '#fafafa',
    textAlign: 'right',
    paddingRight: 24,
  },
});

interface PropTypes {
  sortScreenVisible: boolean;
  sortByCompleted: () => void;
  sortByCreated: () => void;
  sortByName: () => void;
}

class Sort extends React.Component<PropTypes> {
  render() {
    return (
      <Modal
        visible={false}
        onRequestClose={() => {}}
        transparent animationType="fade"
      >
        <TouchableWithoutFeedback onPress={() => {}}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.innerContainer}>
                <TouchableWithoutFeedback onPress={() => this.props.sortByCompleted}>
                  <View
                    style={styles.sortContainer}
                  >
                    <Text style={styles.sortText}>Completed</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.sortByCreated}>
                  <View
                    style={styles.sortContainer}
                  >
                    <Text style={styles.sortText}>Created</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.props.sortByName}>
                  <View
                    style={styles.sortContainer}
                  >
                    <Text style={styles.sortText}>Name</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const mapStateToProps = (state: StateTypes) => {
  return ({
  });
};

const mapDispatchToProps = (dispatch: any) => {
  return ({
    toggleSortScreen: (visible: boolean) => dispatch(toggleSortScreen(visible)),
    sortByCompleted: () => dispatch(sortByCompleted()),
    sortByCreated: () => dispatch(sortByCreated()),
    sortByName: () => dispatch(sortByName()),
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
