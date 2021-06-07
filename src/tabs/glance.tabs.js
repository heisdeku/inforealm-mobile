import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Colors from '../colors/colors';

import LatestGlanceScreen from '../screens/Glance/RandomGlanceScreen';
import MostPopularGlanceScreen from '../screens/Glance/MostPopularGlanceScreen';
import RandomGlanceScreen from '../screens/Glance/RandomGlanceScreen';

export const GlanceStack = createMaterialTopTabNavigator({
  LatestGlance: {
    screen: LatestGlanceScreen,
    navigationOptions: {
      title: 'Latest'
    }
  },
  MostPopularGlance: {
    screen: MostPopularGlanceScreen,
    navigationOptions: {
      title: 'Most Popular'
    }
  },
  RandomGlance: {
    screen: RandomGlanceScreen,
    navigationOptions: {
      title: 'Random'
    }
  },
}, {
  tabBarOptions: {
    scrollEnabled: true,
    inactiveTintColor: Colors.text2,
    activeTintColor: Colors.text1,
    indicatorStyle: {
      backgroundColor: Colors.secondary,
      height: 2
    },
    style: {
      backgroundColor: '#fff'
    },
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 16,
      fontFamily: 'DMRegular'
    },
    tabStyle: {
      width: 150
    }
  }
})
