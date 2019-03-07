import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import moment from 'moment';

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
  },
  textItem: {
    color: '#ff9922',
  },
  touchArea: {
    height: 56,
    paddingLeft: 16,
    justifyContent: 'center',
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
});

interface PropTypes {

}

interface ProgressTypes {
  count: number;
  date: string;
}

const checkCountCompleted = (routine, previousDate: string) => {
  const { count, progress } = routine.item;
  let value = count;
  const result = progress.filter((item: ProgressTypes) => previousDate === item.date);
  if (result.length > 0) {
    if (result[0].count === 0) {
      value = 0;
    } else {
      value = result[0].count;
    }
  }

  return value;
};

const progressScreen = (props) => {
  console.log(props);
  const progress = [];
  const { routine } = props;

  for (let i = 0; i < 5; i += 1) {
    const previousDate = moment().subtract(i, 'days').format('MM-DD-YYYY');
    const value = checkCountCompleted(routine, previousDate);

    progress.push(
      <View key={i} style={styles.numberContainer}>
        <TouchableOpacity
          onPress={() => props.handleProgress(props.routine.item.key, previousDate)}
        >
          <View style={styles.innerNumberContainer}>
            <Progress.Circle
              progress={1 - value / routine.item.count}
              size={28}
              indeterminate={false}
              borderWidth={1}
              borderColor="#f92"
              color="#f92"
            />
            <Text style={styles.numberItem}>
              {value === 0 ? <Entypo name="check" size={20} color="#f92" /> : value}
            </Text>
          </View>
        </TouchableOpacity>
      </View>,
    );
  }

  return progress;
};

const RenderRoutine = (props) => {
  const { visible, routine } = props;
  return (
    <View style={styles.renderItem}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => props.handleShowDetail(!visible, routine.item)}>
          <View style={styles.touchArea}>
            <Text style={styles.textItem}>{ routine.item.name }</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dateContainer}>
        { progressScreen(props) }
      </View>
    </View>
  );
};

export default RenderRoutine;
