import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import BookmarkedReaderScreen from '../screens/Bookmarks/BookmarkedReaderScreen';
import BookmarkedDocumentariesScreen from '../screens/Bookmarks/BookmarkedDocumentariesScreen';
import BookmarkedGlanceScreen from '../screens/Bookmarks/BookmarkedGlanceScreen';

import Colors from '../colors/colors';

export const bookmarkCategories = createMaterialTopTabNavigator({
  BookmarkReader: {
    screen: createStackNavigator({
      MainBookmarkedReader: {
        screen: BookmarkedReaderScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'Reader'
    })
  },
  BookmarkDocumentaries: {
    screen: createStackNavigator({
      MainBookmarkedDocumentaries: {
        screen: BookmarkedDocumentariesScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'Documentaries'
    })
  },
  BookmarkGlance: {
    screen: createStackNavigator({
      MainBookmarkedGlance: {
        screen: BookmarkedGlanceScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'The Glance',
    })
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
