import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
// import { createAppContainer } from 'react-navigation'
// import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
// import { Transition } from 'react-native-reanimated'
import { StatusBar } from 'react-native'
//api
import apiConnect from './src/api/apiConnect'
//screens
import SplashScreen from './src/screens/SplashScreen'
import OnboardingScreen from './src/screens/OnboardingScreen'
//stacks
import OnboardingStack from './src/stacks/onboarding.stacks'
//store
import { store } from './src/redux/store/store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import DummyScreen from './src/screens/Reader/DummyScreen';
import BottomTabStack from './src/tabs/bottomtab.tabs';

const getFonts = () =>
  Font.loadAsync({
    // fetch custom fonts
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
    DMSerif: require('./assets/fonts/DMSerifDisplay-Regular.ttf'),
  })

const getInterests = async () => {
  try {
    const result = await apiConnect.get('/getNewsInterests')
    if (result.data.status === 'success') {
      const apiInterests = result.data.interests
      return apiInterests
    } else {
      return []
    }
  } catch (error) {
    console.log(error)
  }
} //test code for fetching interests to be used in navigation

// const SwitchNavigator = createAnimatedSwitchNavigator(
//   {
//     Splash: {
//       screen: SplashScreen,
//     },
//     Onboarding: onboardingStack,
//   },
//   {
//     transition: (
//       <Transition.Together>
//         <Transition.Out
//           type='slide-left'
//           durationMs={500}
//           interpolation='easeIn'
//         />
//         <Transition.In type='slide-right' durationMs={500} />
//       </Transition.Together>
//     ),
//   }
// )

// const App = createAppContainer(SwitchNavigator)

const SwicthStack = createStackNavigator();

export default () => {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  }, [])

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <StatusBar barStyle='dark-content' backgroundColor='#fff' />
        {/* <App /> */}
        <NavigationContainer>
          <SwicthStack.Navigator
          screenOptions={{
            headerShown: false
          }}
          >
            {
              splash ?
              <SwicthStack.Screen 
              name='Splash' 
              component={SplashScreen}
              />
              : null
            }
            <SwicthStack.Screen 
            name='OnboardingStack' 
            component={OnboardingStack}
            />
            <SwicthStack.Screen 
            name='MainStack' 
            component={BottomTabStack}
            />
          </SwicthStack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
}
