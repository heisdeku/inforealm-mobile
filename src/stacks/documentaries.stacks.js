import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { AntDesign, Feather } from '@expo/vector-icons';

import DocumentariesScreen from '../screens/Documentaries/DocumentariesScreen';
import DocumentaryCategory from '../screens/Documentaries/DocumentaryCategory';

export const DocumentariesStack = createStackNavigator({
  MainDocs: {
    screen: DocumentariesScreen,
    navigationOptions: ({navigation}) => ({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}}>
          <Feather name='search' size={20} />
        </TouchableOpacity>
      ),
      title: '',
      headerTitle: () => (
        <Image
          source={require('../../assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}}
        />
      ),
      headerTitleStyle: {
        alignSelf: 'center',
        fontFamily: 'DMBold',
        fontSize: 16,
      },
      headerLeft: () => (
        <TouchableOpacity style={{marginLeft: 10}}>
          <Image
            source={require('../../assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}} />
        </TouchableOpacity>)
    })
  },
  DocCategory: {
    screen: DocumentaryCategory,
    navigationOptions: ({navigation}) => ({
      title: '',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}
        >
          <AntDesign name='arrowleft' color='black' size={30} />
        </TouchableOpacity>
      )
    })
  }
});
