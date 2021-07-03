import React, { useState } from 'react';
import apiConnect from '../api/apiConnect';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigationState, useRoute } from '@react-navigation/native';


import MainSearchScreen from '../screens/Search/MainSearchScreen';
import DynamicSearchScreen from '../screens/Search/DynamicSearchScreen'


import Colors from '../colors/colors';
import { SearchNavigation } from '../components/SearchNavigation';

const Search = createStackNavigator();
const SearchTabs = createMaterialTopTabNavigator();

const fetchInterests = [{
  interest: "News",
  interest_id: "1"
  },
  {
  interest: "Business",
  interest_id: "2"
  },
  {
  interest: "Sport",
  interest_id: "3"
  },
  {
  interest: "Health",
  interest_id: "4"
  },
  {
  interest: "Investigation",
  interest_id: "5"
  },
  {
  interest: "Politics",
  interest_id: "6"
  },
  {
  interest: "Documentary",
  interest_id: "7"
  },
  {
  interest: "Video",
  interest_id: "8"
}]

const MainSearch = ({navigation}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  
  return(
    <SearchTabs.Navigator
        tabBarOptions= {{
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
        }
        }}
    >
      <SearchTabs.Screen 
      name='All'
      component={MainSearchScreen}
      options={{
        title: 'All'
      }}
      />
      {
        fetchInterests.map((interest, i) => {
          return(
            <SearchTabs.Screen name={interest.interest} component={DynamicSearchScreen} key={i} />
          )
        })
      }
    </SearchTabs.Navigator>
  )
}

export const SearchStack = ({navigation}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  
  return(
    <Search.Navigator>
      <Search.Screen 
      name='MainSearch'
      component={MainSearch}
      options={{
        header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
                <SearchNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
            )
            }                                  
      }}
      />
    </Search.Navigator>
  )
}
