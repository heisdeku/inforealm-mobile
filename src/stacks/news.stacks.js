import React, { useState } from 'react';
import apiConnect from '../api/apiConnect';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';

import AllNewsScreen from '../screens/News/AllNewsScreen';
import DynamicNewsScreen from '../screens/News/DynamicNewsScreen';
import { LocationStack } from './locations.stacks';


import Colors from '../colors/colors';
import { createStructuredSelector } from 'reselect';
import { selectInterests } from '../redux/selectors/interest.selectors';

const News = createStackNavigator();
const NewsTabs = createMaterialTopTabNavigator();

const MainNews = ({navigation, interests}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }

  console.log(interests);
  
  return(
    <NewsTabs.Navigator
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
      <NewsTabs.Screen 
      name='All'
      component={AllNewsScreen}
      options={{
        title: 'All News'
      }}
      />
      <NewsTabs.Screen 
      name='Location'
      component={LocationStack}
      options={{
        title: 'Location',
        tabBarVisible: actualRoute.name === 'NewsLocation' ? false: true
      }}
      />
      {
        interests.map((interest, i) => {
          return(
            <NewsTabs.Screen name={interest.interest} key={i} >
              {props => <DynamicNewsScreen props={props} interest_id={interest.interest_id} />}
            </NewsTabs.Screen>
          )
        })
      }
    </NewsTabs.Navigator>
  )
}

const mapStateToProps = createStructuredSelector({
  interests: selectInterests
})

const ConnectedMainNews = connect(mapStateToProps)(MainNews);

export const NewsStack = ({navigation}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  
  return(
    <News.Navigator>
      <News.Screen 
      name='MainNews'
      component={ConnectedMainNews}
      options={{
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{marginRight: 10}}>
            <Feather name='search' size={20} />
          </TouchableOpacity>
        ),
        title: '',
        headerTitle: () => (
          <Image
            source={require('../../assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}}
          />),
        headerTitleStyle: {
          alignSelf: 'center'
        },
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('Account')}>
            <Image
              source={require('../../assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        ),
        headerShown: actualRoute.name === 'NewsLocation' ? false: true
      }}
      />
    </News.Navigator>
  )
}
