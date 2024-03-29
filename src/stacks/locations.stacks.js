import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';

import NewsLocationsScreen from '../screens/Location/NewsLocationsScreen';
import LocationScreen from '../screens/Location/LocationScreen';
import SelectedLocationScreen from '../screens/Location/SelectedLocationScreen';

const Location = createStackNavigator()

export const LocationStack = () => {

  return(
    <Location.Navigator>
      <Location.Screen 
      name='MainLocation'
      component={NewsLocationsScreen}
      options={{
        headerShown: false
      }}
      />
      <Location.Screen 
      name='SelectedLocation'
      component={SelectedLocationScreen}
      options={{
        headerShown: false
      }}
      />
      <Location.Screen 
      name='NewsLocation'
      component={LocationScreen}
      options={{
        headerLeft: (props) => (
          <TouchableOpacity
            {...props}
            style={{marginLeft: 10}}
          >
            <AntDesign name='arrowleft' color='black' size={30} />
          </TouchableOpacity>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          fontFamily: 'DMBold',
          fontSize: 16
        },
        title: 'Location Text',
        headerRight: () => <View></View>
      }}
      />
    </Location.Navigator>
  )
}

// export const LocationStack = createStackNavigator({
//   MainLocation: {
//     screen: NewsLocationsScreen,
//     navigationOptions: {
//       header: () => null
//     }
//   },
//   SelectedLocation: {
//     screen: SelectedLocationScreen,
//     navigationOptions: {
//       header: () => null
//     }
//   },
//   NewsLocation: {
//     screen: LocationScreen,
//     navigationOptions: ({navigation}) => ({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() =>  navigation.goBack()}
//           style={{marginLeft: 10}}
//         >
//           <AntDesign name='arrowleft' color='black' size={30} />
//         </TouchableOpacity>
//       ),
//       headerTitleStyle: {
//         textAlign: 'center',
//         fontFamily: 'DMBold',
//         fontSize: 16
//       },
//       title: 'Location Text',
//       headerRight: () => <View></View>
//     })
//   }
// })
