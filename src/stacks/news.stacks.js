import React from 'react';
import { useSelector } from 'react-redux'
import { TouchableOpacity, Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import AllNewsScreen from '../screens/News/AllNewsScreen';
import DynamicNewsScreen from '../screens/News/DynamicNewsScreen';
import { LocationStack } from './locations.stacks';

import Colors from '../colors/colors';
import { createStructuredSelector } from 'reselect';
import { selectInterests } from '../redux/selectors/interest.selectors';
import { getCurrentUser } from '../redux/selectors/user.selector'

const News = createStackNavigator();
const NewsTabs = createMaterialTopTabNavigator();

const MainNews = ({navigation, interests}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }  
  
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
  const user = useSelector(getCurrentUser)
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
            source={require('../../assets/images/inforealm-blue.png')} style={{ height: 70, resizeMode: 'contain', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
          />),
        headerTitleStyle: {
          alignSelf: 'center'
        },
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('Account')}>
            {
              !user?.profile_picture && 
              <View style={{                
                width: 56,
                height: 56,        
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <MaterialCommunityIcons name="account" size={27} color="#6C757D" />
              </View>
            }                    
            {user?.profile_picture && 
              <Image resizeMode="cover" source={{ uri: user?.profile_picture }} style={{ width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
            }
          </TouchableOpacity>
        ),
        headerShown: actualRoute.name === 'NewsLocation' ? false: true
      }}
      />
    </News.Navigator>
  )
}
