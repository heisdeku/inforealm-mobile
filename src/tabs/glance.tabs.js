import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Colors from '../colors/colors';

import LatestGlanceScreen from '../screens/Glance/LatestGlanceScreen';
import MostPopularGlanceScreen from '../screens/Glance/MostPopularGlanceScreen';
import RandomGlanceScreen from '../screens/Glance/RandomGlanceScreen';

const Glance = createMaterialTopTabNavigator();

export const GlanceStack = () => {
  return(
    <Glance.Navigator
    tabBarOptions={{
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
        fontFamily: 'DMRegular',
        textTransform: 'capitalize'
      },
      tabStyle: {
        width: 150
      }
    }}
    >
      <Glance.Screen 
      name='LatestGlance'
      component={LatestGlanceScreen}
      options={{
        title: 'Latest'
      }}
      />
      <Glance.Screen 
      name='MostPopularGlance'
      component={MostPopularGlanceScreen}
      options={{
        title: 'Most Popular'
      }}
      />
      <Glance.Screen 
      name='RandomGlance'
      component={RandomGlanceScreen}
      options={{
        title: 'Random'
      }}
      />
    </Glance.Navigator>
  )
}
