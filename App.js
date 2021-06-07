import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
//stacks screens
import onboardingStack from './src/stacks/onboarding.stacks'

import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
//api
import apiConnect from './src/api/apiConnect';
//colors
import Colors from './src/colors/colors';
//screens
import SplashScreen from './src/screens/SplashScreen';

const getFonts = () => Font.loadAsync({// fetch custom fonts
  'DMBold': require('./assets/fonts/DMSans-Bold.ttf'),
  'DMRegular': require('./assets/fonts/DMSans-Regular.ttf'),
  'DMSerif': require('./assets/fonts/DMSerifDisplay-Regular.ttf')
});

let returnedInterests = [];
const screenObjects = {};

const getInterests = async () => {
  try {
    const result = await apiConnect.get('/getNewsInterests');
    if(result.data.status === 'success'){
      const apiInterests = result.data.interests;
      return apiInterests;
    }else{
      return []
    }
  } catch (error) {
    console.log(error);
  }
}//test code for fetching interests to be used in navigation

const fetchInterests = [{
  interest: "News",
  interest_id: "1"
  },
  {
  interest: "Business",
  interest_id: "2"
  },
  {
  interest: "Sport",
  interest_id: "3"
  },
  {
  interest: "Health",
  interest_id: "4"
  },
  {
  interest: "Investigation",
  interest_id: "5"
  },
  {
  interest: "Politics",
  interest_id: "6"
  },
  {
  interest: "Documentary",
  interest_id: "7"
  },
  {
  interest: "Video",
  interest_id: "8"
}]

const interestArray = fetchInterests.map(interest => {
  const objKey = `${interest.interest}`;
  const screenObject = {};
  const returnObject = {
    screen: props => <DynamicNewsScreem {...props} interest={interest.interest} interest_id={interest.interest_id} />,
    navigationOptions: {
      title: interest.interest
    }
  }
  screenObjects[objKey] = returnObject
  return returnObject
})

const SwicthNavigator = createAnimatedSwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  Onboarding: onboardingStack
},
{
  transition: (
    <Transition.Together>
      <Transition.Out
          type="slide-left"
          durationMs={500}
          interpolation="easeIn"
        />
        <Transition.In type="slide-right" durationMs={500} />
    </Transition.Together>
  )
})

const App = createAppContainer(SwicthNavigator);

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded){
    return(
      <>
        <StatusBar barStyle='dark-content' backgroundColor='#fff' />
        <App />
      </>
    )
  }else{
    return(
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={err => console.log(err)}
      />
    )
  }
}
