import React, { lazy } from 'react'
import ReaderScreen from '../screens/Reader/ReaderScreen'
import DummyScreen from '../screens/Reader/DummyScreen'
import Colors from '../colors/colors'

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigationState } from '@react-navigation/native'
import { ReaderNavigation } from '../components/Reader/ReaderNavigation'


const Reader = createStackNavigator();
const MainNews = createMaterialTopTabNavigator();

const MainNewsStack = () => {
  return(
    <MainNews.Navigator
    tabBarOptions={{
      scrollEnabled: true,
      inactiveTintColor: Colors.text2,
      activeTintColor: Colors.text1,
      indicatorStyle: {
        backgroundColor: Colors.secondary,
        height: 2,
        minWidth: 90,
        width: 110,
        marginLeft: 10,
      },
      style: {
        backgroundColor: '#fff',
      },
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 16,
        fontFamily: 'DMRegular',
        textTransform: 'capitalize',
        textAlign: 'left'
      },
      tabStyle: {        
        width: 132
      }      
    }}
    >
      <MainNews.Screen 
      name='All'
      component={DummyScreen}
      options={{
        title: 'Your Feed'
      }}
      />
      <MainNews.Screen 
      name='ReaderTrending'
      component={ReaderScreen}
      options={{
        title: 'Now Trending',
        lazy: true
      }}
      />
    </MainNews.Navigator>
  )
}

export const ReaderStack = ({navigation}) => {
  const navigationState = useNavigationState(state => state);
  
  return(
    <Reader.Navigator>
      <Reader.Screen 
      name='MainNews'
      component={MainNewsStack}
      options={{
        header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
                <ReaderNavigation visitProfile={() => navigation.navigate('Account')} visitSearch={() => navigation.navigate('Search')} style={options.headerStyle} />
            )
            }                                  
      }}
      />
    </Reader.Navigator>
  )
}

