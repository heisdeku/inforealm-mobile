import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign } from '@expo/vector-icons';

import OnboardingScreen from '../screens/OnboardingScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';

import { bottomTab } from '../tabs/bottomtab.tabs'

const onboardingStack = createStackNavigator({
  MainOnboarding: {
    screen: OnboardingScreen,
    navigationOptions: ({navigation}) => ({
      header: () => null
    })
  },
  Privacy: {
    screen: PrivacyPolicyScreen,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() =>  navigation.goBack()} style={{marginLeft: 10}}>
          <AntDesign name='arrowleft' color='black' size={30} />
        </TouchableOpacity>)
    })
  },
  Terms: {
    screen: TermsOfServiceScreen,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 10}}>
          <AntDesign name='arrowleft' color='black' size={30} />
        </TouchableOpacity>)
    })
  },
  MainOne: {
    screen: bottomTab,
    navigationOptions: {
      header: () => null
    }
  }
});

export default onboardingStack
