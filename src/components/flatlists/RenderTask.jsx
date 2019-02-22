import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  renderItem: {
    width: '100%',
    height: 56,
    marginBottom: 2,
    backgroundColor: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  textItem: {
    color: '#ff9922',
  },
  dateContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
  },
  numberContainer: {
    flex: 1,
  },
  innerNumberContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  numberItem: {
    color: '#f92',
    position: 'absolute',
    top: 14,
  },
  itemContainer: {
    width: '100%',
    height: 56,
    marginBottom: 2,
    backgroundColor: '#333',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  item: {
    color: '#fafafa',
    fontSize: 18,
  },
  itemDone: {
    color: '#fafafa',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
});

const RenderTask = (props) => {
  const { onSetStatus, index, tasks } = props;
  return (
    <TouchableOpacity onPress={() => onSetStatus(index)}>
      <View style={styles.itemContainer}>
        <Text style={tasks.item.status ? styles.itemDone : styles.item}>
          {tasks.item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

RenderTask.defaultProps = {
  onSetStatus: null,
  index: null,
  tasks: null,
};

RenderTask.propTypes = {
  onSetStatus: PropTypes.func,
  index: PropTypes.number,
  tasks: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default RenderTask;
