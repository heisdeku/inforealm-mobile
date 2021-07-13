import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DocumentariesScreen from '../screens/Documentaries/DocumentariesScreen';
import DocumentaryCategory from '../screens/Documentaries/DocumentaryCategory';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/selectors/user.selector'
import ArticleRead from '../screens/Article/ArticleRead';


const Documentaries = createStackNavigator();

export const DocumentariesStack = ({navigation}) => {
  const user = useSelector(getCurrentUser)
  return(
    <Documentaries.Navigator>
      <Documentaries.Screen 
      name='MainDocs'
      component={DocumentariesScreen}
      options={{
        title: '',
        headerTitle: () => (
          <Image
            source={require('../../assets/images/inforealm-blue.png')} style={{height: 54, marginLeft: 'auto', marginRight: 'auto'}}
          />
        ),
        headerTitleStyle: {
          alignSelf: 'center',
          fontFamily: 'DMBold',
          fontSize: 16,
        },
        headerLeft: () => (
          <TouchableOpacity style={{marginLeft: 10}} onPress={() => navigation.navigate('Account')}>
            {
              !user?.profile_picture && 
              <View style={{                
                width: 56,
                height: 56,        
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <MaterialCommunityIcons name="account" size={27} color="#6C757D" />
              </View>
            }                    
            {user?.profile_picture && 
              <Image resizeMode="cover" source={{ uri: user?.profile_picture }} style={{ width: 30, height: 30, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }} />
            }
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{marginRight: 10}}>
            <Feather name='search' size={20} />
          </TouchableOpacity>
        ),
      }}
      />
      <Documentaries.Screen 
      component={ArticleRead}
      name='ArticleRead'
      options={{
        title: '',
        headerLeft: (props) => (
          <TouchableOpacity
            {...props}
            style={{marginLeft: 10}}
          >
            <AntDesign name='arrowleft' color='black' size={30} />
          </TouchableOpacity>
        )
      }}
      />
      <Documentaries.Screen 
      name='DocCategory'
      component={DocumentaryCategory}
      options={{
        title: '',
        headerLeft: (props) => (
          <TouchableOpacity
            {...props}
            style={{marginLeft: 10}}
          >
            <AntDesign name='arrowleft' color='black' size={30} />
          </TouchableOpacity>
        )
      }}
      />
    </Documentaries.Navigator>
  )
}

// export const DocumentariesStack = createStackNavigator({
//   MainDocs: {
//     screen: DocumentariesScreen,
//     navigationOptions: ({navigation}) => ({
//       headerRight: () => (
//         <TouchableOpacity style={{marginRight: 10}}>
//           <Feather name='search' size={20} />
//         </TouchableOpacity>
//       ),
//       title: '',
    //   headerTitle: () => (
    //     <Image
    //       source={require('../../assets/images/inforealm-blue.png')} style={{height: 24, marginLeft: 'auto', marginRight: 'auto'}}
    //     />
    //   ),
    //   headerTitleStyle: {
    //     alignSelf: 'center',
    //     fontFamily: 'DMBold',
    //     fontSize: 16,
    //   },
    //   headerLeft: () => (
    //     <TouchableOpacity style={{marginLeft: 10}}>
    //       <Image
    //         source={require('../../assets/images/header-profile.png')} style={{height: 27, width: 27, resizeMode: 'contain'}} />
    //     </TouchableOpacity>)
    // })
//   },
//   DocCategory: {
//     screen: DocumentaryCategory,
//     navigationOptions: ({navigation}) => ({
    //   title: '',
    //   headerLeft: () => (
    //     <TouchableOpacity
    //       onPress={() => navigation.goBack()}
    //       style={{marginLeft: 10}}
    //     >
    //       <AntDesign name='arrowleft' color='black' size={30} />
    //     </TouchableOpacity>
    //   )
    // })
//   }
// });
