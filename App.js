import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { StatusBar } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { FontAwesome5, FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
//api
import apiConnect from './src/api/apiConnect';
//colors
import Colors from './src/colors/colors';
//screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import DummyScreen from './src/screens/DummyScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import AnimatedMoreButton from './src/components/AnimatedMoreButton';
import DocumentariesScreen from './src/screens/DocumentariesScreen';
import DocumentaryCategory from './src/screens/DocumentaryCategory';
import AllNewsScreen from './src/screens/AllNewsScreen';
import DynamicNewsScreem from './src/screens/DynamicNewsScreen';
import NewsLocationsScreen from './src/screens/NewsLocationsScreen';
import LocationScreen from './src/screens/LocationScreen';
import BottomTab from './src/components/BottomTab';
import BookmarksScreen from './src/screens/BookmarksScreen';
import DownloadsScreen from './src/screens/DownloadsScreen';
import SelectedLocationScreen from './src/screens/SelectedLocationScreen';
import BookmarkedReaderScreen from './src/screens/BookmarkedReaderScreen';
import BookmarkedDocumentariesScreen from './src/screens/BookmarkedDocumentariesScreen';
import BookmarkedGlanceScreen from './src/screens/BookmarkedGlanceScreen';
import LatestGlanceScreen from './src/screens/RandomGlanceScreen';
import MostPopularGlanceScreen from './src/screens/MostPopularGlanceScreen';
import RandomGlanceScreen from './src/screens/RandomGlanceScreen';

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
        alignSelf: 'center',
        fontFamily: 'DMBold',
        fontSize: 16,
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
  SelectedLocation: {
    screen: SelectedLocationScreen,
    navigationOptions: {
      header: () => null
    }
  },
  NewsLocation: {
    screen: LocationScreen,
    navigationOptions: ({navigation}) => ({
      headerLeft: () => (<TouchableOpacity onPress={() =>  navigation.goBack()} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>),
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'DMBold',
        fontSize: 16
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
        screen: createStackNavigator({
          MainAll: {
            screen: AllNewsScreen,
            navigationOptions: {
              title: 'All News',
              header: () => null
            }
          }
        }),
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
        upperCaseLabel: false,
        labelStyle: {
          fontSize: 16,
          fontFamily: 'DMRegular'
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
      if(navigation.state.index === 1 && navigation.state.routes[1].index == 2){
        return {
          header: () => null
        }
      }
    }
  }
});

const downloadsStack = createStackNavigator({
  bookmarks: {
    screen: DownloadsScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Download',
      headerLeft: () => (<TouchableOpacity onPress={() =>  navigation.navigate('Reader')} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>),
      headerRight: () => <View></View>,
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'DMBold',
        fontSize: 16,
      }
    })
  }
});

const bookmarkCategories = createMaterialTopTabNavigator({
  BookmarkReader: {
    screen: createStackNavigator({
      MainBookmarkedReader: {
        screen: BookmarkedReaderScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'Reader'
    })
  },
  BookmarkDocumentaries: {
    screen: createStackNavigator({
      MainBookmarkedDocumentaries: {
        screen: BookmarkedDocumentariesScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'Documentaries'
    })
  },
  BookmarkGlance: {
    screen: createStackNavigator({
      MainBookmarkedGlance: {
        screen: BookmarkedGlanceScreen,
        navigationOptions: {
          header: () => null
        }
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'The Glance',
    })
  },
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
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 16,
      fontFamily: 'DMRegular'
    },
    tabStyle: {
      width: 150
    }
  }
})

const bookmarksStack = createStackNavigator({
  bookmarks: {
    screen: bookmarkCategories,
    navigationOptions: ({navigation}) => ({
      title: 'Bookmark',
      headerLeft: () => (<TouchableOpacity onPress={() =>  navigation.navigate('Reader')} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>),
      headerRight: () => <View></View>,
      headerTitleStyle: {
        textAlign: 'center',
        fontFamily: 'DMBold',
        fontSize: 16,
      }
    })
  }
});

const glanceStack = createMaterialTopTabNavigator({
  LatestGlance: {
    screen: LatestGlanceScreen,
    navigationOptions: {
      title: 'Latest'
    }
  },
  MostPopularGlance: {
    screen: MostPopularGlanceScreen,
    navigationOptions: {
      title: 'Most Popular'
    }
  },
  RandomGlance: {
    screen: RandomGlanceScreen,
    navigationOptions: {
      title: 'Random'
    }
  },
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
    upperCaseLabel: false,
    labelStyle: {
      fontSize: 16,
      fontFamily: 'DMRegular'
    },
    tabStyle: {
      width: 150
    }
  }
})

const bottomTab = createBottomTabNavigator({
  Reader: {
    screen: DummyScreen,
    navigationOptions: {
      title: 'Reader'
    }
  },
  Documentaries: {
    screen: DocumentariesStack,
    navigationOptions: ({navigation}) => ({
      title: 'Documentaries',
      tabBarVisible: navigation.state.routes[navigation.state.index].routeName == 'DocCategory' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
    })
  },
  News: {
    screen: NewsStack,
    navigationOptions: {
      title: 'News'
    }
  },
  Bookmarks: {
    screen: bookmarksStack,
    navigationOptions: ({navigation}) => ({
      title: 'Bookmark',
      tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
    })
  },
  Downloads: {
    screen: downloadsStack,
    navigationOptions: ({navigation}) => ({
      title: 'Download',
      tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'downloads' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' ? false : true
    })
  },
  Glance: {
    screen: createStackNavigator({
      MainGlance: {
        screen: glanceStack,
        navigationOptions: ({navigation}) => ({
          title: 'The Glance',
          headerTitleStyle: {
            fontFamily: 'DMBold',
            fontSize: 16,
            textAlign: 'center'
          },
          headerLeft: () => (<TouchableOpacity onPress={() => navigation.navigate('Reader')} style={{marginLeft: 10}}><AntDesign name='arrowleft' color='black' size={30} /></TouchableOpacity>),
          headerRight: () => <View></View>
        })
      }
    }),
    navigationOptions: ({navigation}) => ({
      title: 'The Glance',
      tabBarVisible: navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'downloads' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'bookmarks' || navigation.state.routes[navigation.state.index].routeName.toLowerCase() == 'glance' ? false : true
    })
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
  tabBarComponent: (props) => (<BottomTab {...props} />)
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
