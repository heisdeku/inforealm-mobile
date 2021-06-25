import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import OnboardingScreen from '../screens/OnboardingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const OnboardingStack = ({navigation}) => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
      name='Onboarding'
      component={OnboardingScreen}
      options={{
        headerShown: false,
      }}
      />
      <Stack.Screen 
      name='Privacy'
      component={PrivacyPolicyScreen}
      options={{
        title: '',
        headerLeft: (props) => (
          <TouchableOpacity {...props} style={{marginLeft: 10}}>
              <AntDesign name='arrowleft' color='black' size={30} />
            </TouchableOpacity>
        )
      }}
      />
      <Stack.Screen 
      name='Terms'
      component={TermsOfServiceScreen}
      options={{
        title: '',
        headerLeft: (props) => (
            <TouchableOpacity {...props} style={{marginLeft: 10}}>
              <AntDesign name='arrowleft' color='black' size={30} />
            </TouchableOpacity>
          )
      }}
      />
    </Stack.Navigator>
  )
}

// const onboardingStack = createStackNavigator({
//   MainOnboarding: {
//     screen: OnboardingScreen,
//     navigationOptions: ({navigation}) => ({
//       header: () => null
//     })
//   },
//   Privacy: {
//     screen: PrivacyPolicyScreen,
//     navigationOptions: ({navigation}) => ({
//       title: '',
//       headerLeft: () => (
//         <TouchableOpacity onPress={() =>  navigation.goBack()} style={{marginLeft: 10}}>
//           <AntDesign name='arrowleft' color='black' size={30} />
//         </TouchableOpacity>)
//     })
//   },
//   Terms: {
//     screen: TermsOfServiceScreen,
//     navigationOptions: ({navigation}) => ({
//       title: '',
//       headerLeft: () => (
//         <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
//           <AntDesign name='arrowleft' color='black' size={30} />
//         </TouchableOpacity>)
//     })
//   },
//   MainOne: {
//     screen: bottomTab,
//     navigationOptions: {
//       header: () => null
//     }
//   }
// });

export default OnboardingStack
