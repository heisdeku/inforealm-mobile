import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
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
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import DummyScreen from './src/screens/DummyScreen';
import { FontAwesome5, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import Colors from './src/colors/colors';
import AnimatedMoreButton from './src/components/AnimatedMoreButton';
import DocumentariesScreen from './src/screens/DocumentariesScreen';
import DocumentaryCategory from './src/screens/DocumentaryCategory';
import apiConnect from './src/api/apiConnect';
import AllNewsScreen from './src/screens/AllNewsScreen';
import DynamicNewsScreem from './src/screens/DynamicNewsScreen';
import NewsLocationsScreen from './src/screens/NewsLocationsScreen';
import LocationScreen from './src/screens/LocationScreen';
// import BottomTab from './src/components/BottomTab';

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
  },
  DocCategory: {
    screen: DocumentaryCategory,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: () => (<TouchableOpacity onPress={() => navigation.goBack()} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>)
    })
  }
});

const LocationStack = createStackNavigator({
  MainLocation: {
    screen: NewsLocationsScreen,
    navigationOptions: {
      header: () => null
    }
  },
  NewsLocation: {
    screen: LocationScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (<TouchableOpacity onPress={() =>  navigation.goBack()} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>),
      headerTitleStyle: {
        textAlign: 'center'
      },
      title: 'Location Text',
      headerRight: () => <View></View>
    })
  }
})

const NewsStack = createStackNavigator({
  MainNews: {
    screen: createMaterialTopTabNavigator({
      All: {
        screen: AllNewsScreen,
        navigationOptions: {
          title: 'All News'
        }
      },
      Location: {
        screen: LocationStack,
        navigationOptions: ({navigation}) => ({
          title: 'Location',
          tabBarVisible: navigation.state.routes[navigation.state.index].routeName == 'NewsLocation' ? false : true
        })
      },
      ...screenObjects
    }, {
      tabBarOptions: {
        scrollEnabled: true,
        inactiveTintColor: Colors.text2,
        activeTintColor: Colors.text1,
        indicatorStyle: {
          backgroundColor: Colors.secondary,
          height: 2
        },
        style: {
          backgroundColor: '#fff'
        },
        showIcon: true,
        upperCaseLabel: false,
        labelStyle: {
          fontSize: 16,
          fontFamily: 'DMRegular'
        },
        tabStyle: {
          width: 150
        }
      },
      navigationOptions: ({navigation}) => ({
        headerRight: () => (<TouchableOpacity style={{marginRight: 10}}><Feather name='search' size={20} /></TouchableOpacity>),
        title: '',
        headerTitle: () => (<Image source={require('./assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}} />),
        headerTitleStyle: {
          alignSelf: 'center'
        },
        headerLeft: () => (<TouchableOpacity style={{marginLeft: 10}}><Image source={require('./assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}} /></TouchableOpacity>)
      })
    }),
    navigationOptions: ({navigation}) => {
      if(navigation.state.index === 1 && navigation.state.routes[1].index == 1){
        return {
          header: () => null
        }
      }
    }
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
    navigationOptions: ({navigation}) => ({
      title: 'Documentaries',
      tabBarIcon: ({focused}) => (<FontAwesome name='video-camera' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />),
      tabBarVisible: navigation.state.routes[navigation.state.index].routeName == 'DocCategory' ? false : true
    })
  },
  News: {
    screen: NewsStack,
    navigationOptions: {
      title: 'News',
      tabBarIcon: ({focused}) => (<FontAwesome name='newspaper-o' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
    }
  },
  More: {
    screen: () => null,
    navigationOptions: {
      title: 'More',
      // tabBarIcon: ({focused}) => (<AnimatedMoreButton focused={focused} />)
      tabBarIcon: ({focused}) => (<FontAwesome name='bars' color={focused ? Colors.secondary : '#B3B3B3'} size={20} />)
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