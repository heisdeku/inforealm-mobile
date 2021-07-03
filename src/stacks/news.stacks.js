import React, { useState } from 'react';
import apiConnect from '../api/apiConnect';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigationState, useRoute } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';

import AllNewsScreen from '../screens/News/AllNewsScreen';
import DynamicNewsScreen from '../screens/News/DynamicNewsScreen';
import { LocationStack } from './locations.stacks';


import Colors from '../colors/colors';

const News = createStackNavigator();
const NewsTabs = createMaterialTopTabNavigator();

const getInterests = async () => {
  try {
    const result = await apiConnect.get('/getNewsInterests');
    if(result.data.status === 'success'){
      const apiInterests = result.data.interests;
      return apiInterests;
    }else{
      return []
    }
  } catch (error) {
    console.log(error);
  }
}//test code for fetching interests to be used in navigation

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

const interestArray = fetchInterests.map(interest => {
  return <NewsTabs.Screen name={interest.interest} component={<DynamicNewsScreen />} />
})

const MainNews = ({navigation}) => {
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
        fetchInterests.map((interest, i) => {
          return(
            <NewsTabs.Screen name={interest.interest} component={DynamicNewsScreen} key={i} />
          )
        })
      }
    </NewsTabs.Navigator>
  )
}

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
      component={MainNews}
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
          <TouchableOpacity style={{marginLeft: 10}}>
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

// export const NewsStack = createStackNavigator({
//   MainNews: {
//     screen: createMaterialTopTabNavigator({
//       All: {
//         screen: createStackNavigator({
//           MainAll: {
//             screen: AllNewsScreen,
//             navigationOptions: {
//               title: 'All News',
//               header: () => null
//             }
//           }
//         }),
//         navigationOptions: {
//           title: 'All News'
//         }
//       },
//       Location: {
//         screen: LocationStack,
//         navigationOptions: ({navigation}) => ({
//           title: 'Location',
//           tabBarVisible: navigation.state.routes[navigation.state.index].routeName == 'NewsLocation' ? false : true
//         })
//       },
//       ...screenObjects
//     }, {
//       tabBarOptions: {
//         scrollEnabled: true,
//         inactiveTintColor: Colors.text2,
//         activeTintColor: Colors.text1,
//         indicatorStyle: {
//           backgroundColor: Colors.secondary,
//           height: 2
//         },
//         style: {
//           backgroundColor: '#fff'
//         },
//         upperCaseLabel: false,
//         labelStyle: {
//           fontSize: 16,
//           fontFamily: 'DMRegular'
//         }
//       },
//       navigationOptions: ({navigation}) => ({
        // headerRight: () => (
        //   <TouchableOpacity style={{marginRight: 10}}>
        //     <Feather name='search' size={20} />
        //   </TouchableOpacity>
        // ),
        // title: '',
        // headerTitle: () => (
        //   <Image
        //     source={require('../../assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}}
        //   />),
        // headerTitleStyle: {
        //   alignSelf: 'center'
        // },
        // headerLeft: () => (
        //   <TouchableOpacity style={{marginLeft: 10}}>
        //     <Image
        //       source={require('../../assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}}
        //     />
        //   </TouchableOpacity>
        // )
//       })
//     }),
//     navigationOptions: ({navigation}) => {
//       if(navigation.state.index === 1 && navigation.state.routes[1].index == 2){
//         return {
//           header: () => null
//         }
//       }
//     }
//   }
// });
