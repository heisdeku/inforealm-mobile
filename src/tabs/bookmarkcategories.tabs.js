import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import BookmarkedReaderScreen from '../screens/Bookmarks/BookmarkedReaderScreen';
import BookmarkedDocumentariesScreen from '../screens/Bookmarks/BookmarkedDocumentariesScreen';
import BookmarkedGlanceScreen from '../screens/Bookmarks/BookmarkedGlanceScreen';

import Colors from '../colors/colors';

const BookmarkTabs = createMaterialTopTabNavigator();
const BookmarkReader = createStackNavigator();
const BookmarkDocumentaries = createStackNavigator();
const BookmarkGlance = createStackNavigator();

const BookmarkReaderStack = () => {
  return(
    <BookmarkReader.Navigator>
      <BookmarkReader.Screen 
      name='MainBookmarkedReader'
      component={BookmarkedReaderScreen}
      options={{
        headerShown: false
      }}
      />
    </BookmarkReader.Navigator>
  )
}
const BookmarkDocumentariesStack = () => {
  return(
    <BookmarkDocumentaries.Navigator>
      <BookmarkDocumentaries.Screen 
      name='MainBookmarkedReader'
      component={BookmarkedDocumentariesScreen}
      options={{
        headerShown: false
      }}
      />
    </BookmarkDocumentaries.Navigator>
  )
}
const BookmarkGlanceStack = () => {
  return(
    <BookmarkGlance.Navigator>
      <BookmarkGlance.Screen 
      name='BookmarkedGlanceScreen'
      component={BookmarkedGlanceScreen}
      options={{
        headerShown: false,
        title: 'The Glance'
      }}
      />
    </BookmarkGlance.Navigator>
  )
}

export const bookmarkCategories = () => {
  return(
    <BookmarkTabs.Navigator
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
        minWidth: 150
      }
    }}
    >
      <BookmarkTabs.Screen
      name='BookmarkReader'
      component={BookmarkReaderStack}
      options={{
        headerShown: false,
        title: 'Reader'
      }}
      />
      <BookmarkTabs.Screen
      name='BookmarkDocumentaries'
      component={BookmarkDocumentariesStack}
      options={{
        headerShown: false,
        title: 'Documentaries'
      }}
      />
      <BookmarkTabs.Screen
      name='BookmarkGlance'
      component={BookmarkGlanceStack}
      options={{
        headerShown: false,
        title: 'The Glance'
      }}
      />
    </BookmarkTabs.Navigator>
  )
}

// export const bookmarkCategories = createMaterialTopTabNavigator({
//   BookmarkReader: {
//     screen: createStackNavigator({
//       MainBookmarkedReader: {
//         screen: BookmarkedReaderScreen,
//         navigationOptions: {
//           header: () => null
//         }
//       }
//     }),
//     navigationOptions: ({navigation}) => ({
//       title: 'Reader'
//     })
//   },
//   BookmarkDocumentaries: {
//     screen: createStackNavigator({
//       MainBookmarkedDocumentaries: {
//         screen: BookmarkedDocumentariesScreen,
//         navigationOptions: {
//           header: () => null
//         }
//       }
//     }),
//     navigationOptions: ({navigation}) => ({
//       title: 'Documentaries'
//     })
//   },
//   BookmarkGlance: {
//     screen: createStackNavigator({
//       MainBookmarkedGlance: {
//         screen: BookmarkedGlanceScreen,
//         navigationOptions: {
//           header: () => null
//         }
//       }
//     }),
//     navigationOptions: ({navigation}) => ({
//       title: 'The Glance',
//     })
//   },
// }, {
  // tabBarOptions: {
  //   scrollEnabled: true,
  //   inactiveTintColor: Colors.text2,
  //   activeTintColor: Colors.text1,
  //   indicatorStyle: {
  //     backgroundColor: Colors.secondary,
  //     height: 2
  //   },
  //   style: {
  //     backgroundColor: '#fff'
  //   },
  //   upperCaseLabel: false,
  //   labelStyle: {
  //     fontSize: 16,
  //     fontFamily: 'DMRegular'
  //   },
  //   tabStyle: {
  //     width: 150
  //   }
  // }
// })
