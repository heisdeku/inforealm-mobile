import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DummyScreen from './src/screens/DummyScreen';
import { FontAwesome5, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import Colors from './src/colors/colors';
import AnimatedMoreButton from './src/components/AnimatedMoreButton';
import DocumentariesScreen from './src/screens/DocumentariesScreen';
// import BottomTab from './src/components/BottomTab';

const getFonts = () => Font.loadAsync({
  'DMBold': require('./assets/fonts/DMSans-Bold.ttf'),
  'DMRegular': require('./assets/fonts/DMSans-Regular.ttf'),
  'DMSerif': require('./assets/fonts/DMSerifDisplay-Regular.ttf')
});

const DocumentariesStack = createStackNavigator({
  MainDocs: {
    screen: DocumentariesScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (<TouchableOpacity style={{marginRight: 10}}><Feather name='search' size={20} /></TouchableOpacity>),
      title: '',
      headerTitle: () => (<Image source={require('./assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}} />),
      headerTitleStyle: {
        alignSelf: 'center'
      },
      headerLeft: () => (<TouchableOpacity style={{marginLeft: 10}}><Image source={require('./assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}} /></TouchableOpacity>)
    })
  }
})

const bottomTab = createBottomTabNavigator({
  Reader: {
    screen: DummyScreen,
    navigationOptions: {
      title: 'Reader',
      tabBarIcon: ({focused}) => (<FontAwesome5 name='book-reader' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
    }
  },
  Documentaries: {
    screen: DocumentariesStack,
    navigationOptions: {
      title: 'Documentaries',
      tabBarIcon: ({focused}) => (<FontAwesome name='video-camera' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
    }
  },
  News: {
    screen: DummyScreen,
    navigationOptions: {
      title: 'News',
      tabBarIcon: ({focused}) => (<FontAwesome name='newspaper-o' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
    }
  },
  More: {
    screen: () => null,
    navigationOptions: {
      title: '',
      tabBarIcon: ({focused}) => (<AnimatedMoreButton focused={focused} />)
      // tabBarIcon: ({focused}) => (<FontAwesome name='bars' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
    }
  }
}, {
  tabBarOptions: {
    activeBackgroundColor: '#fff',
    activeTintColor: Colors.secondary,
    inactiveBackgroundColor: '#fff',
    inactiveTintColor: '#B3B3B3',
    labelStyle: {
      fontWeight: '500',
      fontFamily: 'DMRegular'
    },
    tabStyle: {
      
    },
    style: {
      padding: 5,
    }
  },
  // tabBarComponent: (props) => (<BottomTab otherProps={props} />)
})

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
      headerLeft: () => (<TouchableOpacity onPress={() =>  navigation.goBack()} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>)
    })
  },
  Terms: {
    screen: TermsOfServiceScreen,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>)
    })
  },
  MainOne: {
    screen: bottomTab,
    navigationOptions: {
      header: () => null
    }
  }
});

const SwicthNavigator = createAnimatedSwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  Onboarding: onboardingStack
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