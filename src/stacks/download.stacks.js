import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

import DownloadsScreen from '../screens/DownloadsScreen';

const Downloads = createStackNavigator();

export const downloadsStack = ({navigation}) => {
  return(
    <Downloads.Navigator>
      <Downloads.Screen 
      name='Downloads'
      component={DownloadsScreen}
      options={{
        title: 'Download',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() =>  navigation.goBack()}
            style={{marginLeft: 10}}
          >
            <AntDesign name='arrowleft' color='black' size={30} />
          </TouchableOpacity>),
        headerRight: () => <View></View>,
        headerTitleStyle: {
          textAlign: 'center',
          fontFamily: 'DMBold',
          fontSize: 16,
        }
      }}
      />
    </Downloads.Navigator>
  )
}

// export const downloadsStack = createStackNavigator({
//   bookmarks: {
//     screen: DownloadsScreen,
//     navigationOptions: ({navigation}) => ({
//       title: 'Download',
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() =>  navigation.navigate('Reader')}
//           style={{marginLeft: 10}}
//         >
//           <AntDesign name='arrowleft' color='black' size={30} />
//         </TouchableOpacity>),
//       headerRight: () => <View></View>,
//       headerTitleStyle: {
//         textAlign: 'center',
//         fontFamily: 'DMBold',
//         fontSize: 16,
//       }
//     })
//   }
// });
