import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Feather } from '@expo/vector-icons';

import { bookmarkCategories } from '../tabs/bookmarkcategories.tabs'

const Bookmarks = createStackNavigator();

export const bookmarksStack = ({navigation}) => {
  
  return(
    <Bookmarks.Navigator>
      <Bookmarks.Screen 
      name='bookmarks'
      component={bookmarkCategories}
      options={{
        title: 'Bookmark',
        headerLeft: () => (
          <TouchableOpacity
          onPress={() => navigation.goBack()}
            style={{marginLeft: 10}}
          >
            <AntDesign name='arrowleft' color='black' size={30} />
          </TouchableOpacity>
        ),
        headerRight: () => <View></View>,
        headerTitleStyle: {
          textAlign: 'center',
          fontFamily: 'DMBold',
          fontSize: 16,
        }
      }}
      />
    </Bookmarks.Navigator>
  )
}

// export const bookmarksStack = createStackNavigator({
//   bookmarks: {
//     screen: bookmarkCategories,
//     navigationOptions: ({navigation}) => ({
    //   title: 'Bookmark',
    //   headerLeft: () => (
    //     <TouchableOpacity
    //       onPress={() =>  navigation.navigate('Reader')}
    //       style={{marginLeft: 10}}
    //     >
    //       <AntDesign name='arrowleft' color='black' size={30} />
    //     </TouchableOpacity>
    //   ),
    //   headerRight: () => <View></View>,
    //   headerTitleStyle: {
    //     textAlign: 'center',
    //     fontFamily: 'DMBold',
    //     fontSize: 16,
    //   }
    // })
//   }
// });
