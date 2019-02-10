import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { AntDesign, Entypo } from '@expo/vector-icons';

import Routine from './src/components/tabs/Routine';
import Todo from './src/components/tabs/Todo';
import User from './src/components/tabs/User';

console.disableYellowBox = true;

const TabNavigator = createBottomTabNavigator(
  {
    Routine: { 
      screen: Routine,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Entypo name="cycle" size={24} color={tintColor} />
        )
      }
    },
    Todo: {
      screen: Todo,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Entypo name="list" size={24} color={tintColor} />
        )
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <AntDesign name="user" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true ,
      showLabel: false,
      activeTintColor: '#f92772',
      style: {
        backgroundColor: '#111',
        padding: 16
      },
    }
  }
);

export default createAppContainer(TabNavigator);