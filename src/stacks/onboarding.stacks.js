import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import OnboardingScreen from '../screens/OnboardingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import OnboardingRegisterScreen from '../screens/OnboardingRegisterScreen'
import LoginScreen from '../screens/LoginScreen'
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
      name='Register'
      component={OnboardingRegisterScreen}
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
      name='Login'
      component={LoginScreen}
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

export default OnboardingStack
