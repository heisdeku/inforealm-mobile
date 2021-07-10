import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'react-native'
//screens
import SplashScreen from './src/screens/SplashScreen'
import OnboardingStack from './src/stacks/onboarding.stacks'
//store
import { store, persistor } from './src/redux/store/store'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomTabStack from './src/tabs/bottomtab.tabs';
import { SearchStack } from './src/stacks/search.stacks';
import { ArticleStack } from './src/stacks/article.stacks';
import { AccountStack } from './src/stacks/account.stacks';
import { PersistGate } from 'redux-persist/integration/react';
//toast
import { RootSiblingParent } from 'react-native-root-siblings';
import { selectUserId } from './src/redux/selectors/user.selector'
const getFonts = () =>
  Font.loadAsync({
    // fetch custom fonts
    DMBold: require('./assets/fonts/DMSans-Bold.ttf'),
    DMRegular: require('./assets/fonts/DMSans-Regular.ttf'),
    DMSerif: require('./assets/fonts/DMSerifDisplay-Regular.ttf'),
})

const SwicthStack = createStackNavigator();

export default () => {  
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, [])

  if (fontsLoaded) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle='dark-content' backgroundColor='#fff' />
        {/* <App /> */}
        <RootSiblingParent>
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
              { 
              /*
                store.user !== null && store.user?.user_id && <SwicthStack.Screen 
                name='OnboardingStack' 
                component={OnboardingStack}
                />
                */
              } 
              <SwicthStack.Screen 
                name='OnboardingStack' 
                component={OnboardingStack}
                />             
              <SwicthStack.Screen 
              name='MainStack' 
              component={BottomTabStack}
              />
              <SwicthStack.Screen name="Search" component={SearchStack} />
              <SwicthStack.Screen name="Article" component={ArticleStack} />
              <SwicthStack.Screen name="Account" component={AccountStack} />
            </SwicthStack.Navigator>
          </NavigationContainer>
        </RootSiblingParent>
        </PersistGate>
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
