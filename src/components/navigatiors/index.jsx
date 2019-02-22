import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Entypo, AntDesign, Octicons } from '@expo/vector-icons';

import Routine from '../../containers/routine';
import Todo from '../../containers/list';
import User from '../../containers/user';

console.disableYellowBox = true;

const setCycleIcon = ({ tintColor }) => (
  <Entypo name="cycle" size={24} color={tintColor} />
);

const setTaskIcon = ({ tintColor }) => (
  <Octicons name="tasklist" size={24} color={tintColor} />
);

const setUserIcon = ({ tintColor }) => (
  <AntDesign name="user" size={24} color={tintColor} />
);

const TabNavigator = createBottomTabNavigator(
  {
    Routine: {
      screen: Routine,
      navigationOptions: {
        tabBarIcon: setCycleIcon,
      },
    },
    Todo: {
      screen: Todo,
      navigationOptions: {
        tabBarIcon: setTaskIcon,
      },
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarIcon: setUserIcon,
      },
    },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#f92772',
      style: {
        backgroundColor: '#111',
        padding: 16,
      },
    },
  },
);

setCycleIcon.defaultProps = {
  tintColor: null,
};

setCycleIcon.propTypes = {
  tintColor: PropTypes.string,
};

setTaskIcon.defaultProps = {
  tintColor: null,
};

setTaskIcon.propTypes = {
  tintColor: PropTypes.string,
};

setUserIcon.defaultProps = {
  tintColor: null,
};

setUserIcon.propTypes = {
  tintColor: PropTypes.string,
};

export default createAppContainer(TabNavigator);
