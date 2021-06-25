import React from 'react'
import { TouchableOpacity, Image, Text, View } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons'

import ReaderScreen from '../screens/Reader/ReaderScreen'
import DummyScreen from '../screens/Reader/DummyScreen'
import Colors from '../colors/colors'

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigationState } from '@react-navigation/native'

/*
<View style={styles.heading}>
    <Text style={styles.headingText}>Reader</Text>
    <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome sensei</Text>
</View>
*/
/*
<View>
    <Text>Reader</Text>
    <Text style={{fontFamily: 'DMRegular', fontSize: 13}}>Welcome sensei</Text>
</View>

*/

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
      },
      style: {
        backgroundColor: '#fff',
      },
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 16,
        fontFamily: 'DMRegular',
        textTransform: 'capitalize'
      },
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
        title: 'Now Trending'
      }}
      />
    </MainNews.Navigator>
  )
}

export const ReaderStack = ({navigation}) => {
  const navigationState = useNavigationState(state => state);
  // console.log('nav state', navigationState.routes[0].state.routes[0].state);
  return(
    <Reader.Navigator>
      <Reader.Screen 
      name='MainNews'
      component={MainNewsStack}
      options={{
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Feather name='search' size={20} />
          </TouchableOpacity>
        ),
        title: '',
        headerTitle: () => (
          <Image
            source={require('../../assets/images/inforealm-blue.png')}
            style={{ height: 24, marginLeft: 'auto', marginRight: 'auto' }}
          />
        ),
        headerTitleStyle: {
          alignSelf: 'center',
        },
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Image
              source={require('../../assets/images/header-profile.png')}
              style={{ height: 27, width: 27, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        ),
      }}
      />
    </Reader.Navigator>
  )
}

// export const ReaderStack = createStackNavigator({
//   MainNews: {
//     AntDesign,
//     screen: createMaterialTopTabNavigator(
//       {
//         All: {
//           screen: DummyScreen,
//           navigationOptions: {
//             title: 'Your Feed',
//             header: () => null,
//           },
//         },
//         ReaderTrending: {
//           screen: ReaderScreen,
//           navigationOptions: ({ navigation }) => ({
//             title: 'Now Trending',
//           }),
//         },
//       },
//       {
        // tabBarOptions: {
        //   scrollEnabled: true,
        //   inactiveTintColor: Colors.text2,
        //   activeTintColor: Colors.text1,
        //   indicatorStyle: {
        //     backgroundColor: Colors.secondary,
        //     height: 2,
        //   },
        //   style: {
        //     backgroundColor: '#fff',
        //   },
        //   upperCaseLabel: false,
        //   labelStyle: {
        //     fontSize: 16,
        //     fontFamily: 'DMRegular',
        //   },
        // },
    //     navigationOptions: ({ navigation }) => ({
    //       headerRight: () => (
    //         <TouchableOpacity style={{ marginRight: 10 }}>
    //           <Feather name='search' size={20} />
    //         </TouchableOpacity>
    //       ),
    //       title: '',
    //       headerTitle: () => (
    //         <Image
    //           source={require('../../assets/images/inforealm-blue.png')}
    //           style={{ height: 24, marginLeft: 'auto', marginRight: 'auto' }}
    //         />
    //       ),
    //       headerTitleStyle: {
    //         alignSelf: 'center',
    //       },
    //       headerLeft: () => (
    //         <TouchableOpacity style={{ marginLeft: 10 }}>
    //           <Image
    //             source={require('../../assets/images/header-profile.png')}
    //             style={{ height: 27, width: 27, resizeMode: 'contain' }}
    //           />
    //         </TouchableOpacity>
    //       ),
    //     }),
    //   }
    // ),
//     navigationOptions: ({ navigation }) => {
//       if (
//         navigation.state.index === 1 &&
//         navigation.state.routes[1].index == 2
//       ) {
//         return {
//           header: () => null,
//         }
//       }
//     },
//   },
// })
