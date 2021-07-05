import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountNavigation } from '../components/AccountNavigation';
import AccountMain from '../screens/Account/AccountMain';
import AccountNotifications from '../screens/Account/AccountNotifications';
import AccountEmailUpdate from '../screens/Account/AccountEmailUpdate';
import { AccountUpdateNavigation } from '../components/AccountUpdateNavigation';
import AccountPasswordUpdate from '../screens/Account/AccountPasswordUpdate';

const Account = createStackNavigator();

export const AccountStack = ({navigation}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  const [ emailSaveBtn, setEmailSaveBtn ] = useState(false)
  const [ passwordSaveBtn, setPasswordStateBtn ] = useState(false)
  return(
    <Account.Navigator>
      <Account.Screen 
      name='AccountLanding'
      component={AccountMain}
      options={{
        header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
                <AccountNavigation type="image" goBackEvt={navigation.goBack} style={options.headerStyle} />
            )
            }                                  
      }}
      />
      <Account.Screen 
      name='AccountNotification'
      component={AccountNotifications}
      options={{
        header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            return (
                <AccountNavigation goBackEvt={navigation.goBack} style={options.headerStyle} />
            )
            }                                  
      }}
      />
      <Account.Screen 
        name='AccountEmailUpdate'      
        options={{
          header: ({ scene, previous, navigation }) => {
              const { options } = scene.descriptor;
              return (
                  <AccountUpdateNavigation goBackEvt={navigation.goBack} saveActive={emailSaveBtn} style={options.headerStyle} />
              )
              }                                  
        }}
      >
        {props => <AccountEmailUpdate {...props} saveAction={setEmailSaveBtn} />}
      </Account.Screen>
      <Account.Screen 
        name='AccountPasswordUpdate'      
        options={{
          header: ({ scene, previous, navigation }) => {
              const { options } = scene.descriptor;
              return (
                  <AccountUpdateNavigation goBackEvt={navigation.goBack} saveActive={passwordSaveBtn} style={options.headerStyle} />
              )
              }                                  
        }}
      >
      {props => <AccountPasswordUpdate {...props} saveAction={setPasswordStateBtn} />}
    </Account.Screen>
    </Account.Navigator>
  )
}

