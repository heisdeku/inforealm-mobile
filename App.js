import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import SplashScreen from './src/screens/SplashScreen';

const getFonts = () => Font.loadAsync({
  'DMBold': require('./assets/fonts/DMSans-Bold.ttf'),
  'DMRegular': require('./assets/fonts/DMSans-Regular.ttf')
});

const SwicthNavigator = createAnimatedSwitchNavigator({
  Splash: {
    screen: SplashScreen
  }
}, {
  transition: (
    <Transition.Together>
      <Transition.Out
          type="slide-left"
          durationMs={400}
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
      <App />
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