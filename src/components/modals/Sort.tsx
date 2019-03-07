import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

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

const Sort = (props) => {
  const {
    visible,
    handleVisible,
    sortByCompleted,
    sortByCreated,
    sortByName,
  } = props;
  return (
    <Modal visible={visible} onRequestClose={() => {}} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={handleVisible}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.innerContainer}>
              <TouchableWithoutFeedback onPress={sortByCompleted}>
                <View
                  style={styles.sortContainer}
                >
                  <Text style={styles.sortText}>Completed</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={sortByCreated}>
                <View
                  style={styles.sortContainer}
                >
                  <Text style={styles.sortText}>Created</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={sortByName}>
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
};

Sort.defaultProps = {
  handleVisible: null,
  visible: false,
  sortByCreated: null,
  sortByCompleted: false,
  sortByName: null,
};

Sort.propTypes = {
  handleVisible: PropTypes.func,
  visible: PropTypes.bool,
  sortByCompleted: PropTypes.func,
  sortByName: PropTypes.func,
  sortByCreated: PropTypes.func,
};

export default Sort;
