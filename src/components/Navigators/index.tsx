import * as React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Entypo, AntDesign, Octicons } from '@expo/vector-icons';

import Routine from '../../containers/Routine';

interface TintColor {
  tintColor: string;
}

const setCycleIcon = ({ tintColor }: TintColor) => (
  <Entypo name="cycle" size={24} color={tintColor} />
);

const TabNavigator = createBottomTabNavigator(
  {
    Routine: {
      screen: Routine,
      navigationOptions: {
        tabBarIcon: setCycleIcon,
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

export default createAppContainer(TabNavigator);
