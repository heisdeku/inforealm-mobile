import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import BottomTab from '../components/BottomTab';

import { DocumentariesStack } from '../stacks/documentaries.stacks'
import { NewsStack } from '../stacks/news.stacks'
import { bookmarksStack } from '../stacks/bookmarks.stacks'
import { downloadsStack } from '../stacks/download.stacks'
import { ReaderStack } from '../stacks/reader.stacks'
import { GlanceStack } from './glance.tabs'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//`import NewTabTest from '../components/NewTabTest';

const Tabs = createBottomTabNavigator();

const BottomTabStack = () => {
  return(
    <Tabs.Navigator
      tabBar={props => <BottomTab {...props} />}
    >
      <Tabs.Screen 
      name='Reader'
      component={ReaderStack}
      />
      <Tabs.Screen 
      name='Documentaries'
      component={DocumentariesStack}
      />
      <Tabs.Screen 
      name='News'
      component={NewsStack}
      />
      <Tabs.Screen 
      name='Bookmarks'
      component={bookmarksStack}
      />
      <Tabs.Screen 
      name='Downloads'
      component={downloadsStack}
      />
      <Tabs.Screen 
      name='Glance'
      component={GlanceStack}
      />
    </Tabs.Navigator>
  )
}

export default BottomTabStack;

// export const bottomTab = createBottomTabNavigator({
//   Reader: {
//     screen: ReaderStack,
//     navigationOptions: {
//       title: 'Reader'
//     }
//   },
//   Documentaries: {
//     screen: DocumentariesStack,
//     navigationOptions: ({navigation}) => ({
//       title: 'Documentaries',
//       tabBarVisible: navigation.state.routes[navigation.state.index].routeName == 'DocCategory' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
//     })
//   },
//   News: {
//     screen: NewsStack,
//     navigationOptions: {
//       title: 'News'
//     }
//   },
//   Bookmarks: {
//     screen: bookmarksStack,
//     navigationOptions: ({navigation}) => ({
//       title: 'Bookmark',
//       tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
//     })
//   },
//   Downloads: {
//     screen: downloadsStack,
//     navigationOptions: ({navigation}) => ({
//       title: 'Download',
//       tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'downloads' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
//     })
//   },
//   Glance: {
//     screen: createStackNavigator({
//       MainGlance: {
//         screen: GlanceStack,
//         navigationOptions: ({navigation}) => ({
//           title: 'The Glance',
//           headerTitleStyle: {
//             fontFamily: 'DMBold',
//             fontSize: 16,
//             textAlign: 'center'
//           },
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.navigate('Reader')}
//               style={{marginLeft: 10}}>
//                 <AntDesign name='arrowleft' color='black' size={30} />
//             </TouchableOpacity>),
//           headerRight: () => <View></View>
//         })
//       }
//     }),
//     navigationOptions: ({navigation}) => ({
//       title: 'The Glance',
//       tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'downloads' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'glance' ? false : true
//     })
//   }
// }, {
//   tabBarOptions: {
//     activeBackgroundColor: '#fff',
//     activeTintColor: Colors.secondary,
//     inactiveBackgroundColor: '#fff',
//     inactiveTintColor: '#B3B3B3',
//     labelStyle: {
//       fontWeight: '500',
//       fontFamily: 'DMRegular'
//     },
//     tabStyle: {

//     },
//     style: {
//       padding: 5,
//     }
//   },
//   tabBarComponent: (props) => (<BottomTab {...props} />)
// })
