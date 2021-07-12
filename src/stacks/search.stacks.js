import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigationState, useRoute } from '@react-navigation/native';

import MainSearchScreen from '../screens/Search/MainSearchScreen';
import DynamicSearchScreen from '../screens/Search/DynamicSearchScreen'

import Colors from '../colors/colors';
import { SearchNavigation } from '../components/SearchNavigation';

import { selectInterests } from '../redux/selectors/interest.selectors';
import { createStructuredSelector } from 'reselect';

const Search = createStackNavigator();
const SearchTabs = createMaterialTopTabNavigator();

const MainSearch = ({navigation, interests}) => {
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
        interests.map((interest, i) => {
          return(
            <SearchTabs.Screen name={interest.interest} key={i}>
              { props => <DynamicSearchScreen props={props} id={interest.interest_id} />}
            </SearchTabs.Screen>
          )
        })
      }
    </SearchTabs.Navigator>
  )
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests
})

const ConnectedSearchNews = connect(mapStateToProps)(MainSearch)

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
      component={ConnectedSearchNews}
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
