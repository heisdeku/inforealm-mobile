import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountNavigation } from '../components/AccountNavigation';
import AccountMain from '../screens/Account/AccountMain';

const Account = createStackNavigator();

export const AccountStack = ({navigation}) => {
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }
  
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
    </Account.Navigator>
  )
}
