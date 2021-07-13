import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import { AccountNavigation } from '../components/AccountNavigation';
import AccountMain from '../screens/Account/AccountMain';
import AccountNotifications from '../screens/Account/AccountNotifications';
import AccountEmailUpdate from '../screens/Account/AccountEmailUpdate';
import { AccountUpdateNavigation } from '../components/AccountUpdateNavigation';
import AccountPasswordUpdate from '../screens/Account/AccountPasswordUpdate';
import { updateUserEmail, updateUserPassword } from '../redux/operations/user.op';
import { getCurrentUser } from '../redux/selectors/user.selector';


const Account = createStackNavigator();

export const AccountStack = ({navigation}) => {
  const dispatch = useDispatch()
  const user = useSelector(getCurrentUser)
  
  const state = navigation.dangerouslyGetState();
  let actualRoute = state.routes[state.index];  
  while (actualRoute.state) {
      actualRoute = actualRoute.state.routes[actualRoute.state.index];
  }

  const [ emailSaveBtn, setEmailSaveBtn ] = useState(false)
  const [ passwordSaveBtn, setPasswordStateBtn ] = useState(false)

  //this is about to be some very bad coding paradigm, but anyhow i go implement am, cause the designer want to spoil a junior developer life
  const [ email, setEmail ] = useState({
    current: '',
    new: '',
    confirmNew: ''
  })
  const [ emailResponse, setEmailResponse ] = useState(null)

  const updateEmail = async () => {
    let emailData =  new FormData()
    let idData = new FormData()
    emailData.append('user_id', user?.user_id)
    emailData.append('firstname', user?.firstname)
    emailData.append('lastname', user?.lastname)
    emailData.append('email', email.new)

    idData.append('user_id', user?.user_id)

    let response = await dispatch(updateUserEmail(emailData, idData))
    if (typeof response !== 'string') {
      setEmailResponse(response.error)
    } else {
      setEmailResponse(response)
    }
    setEmail({
      current: '',
      new: '',
      confirmNew: ''
    })

    navigation.navigate('AccountLanding')
  }

  const [ password, setPassword ] = useState({
    current: '',
    new: '',
    confirmNew: ''
  })
  const [ pwdResponse, setPwdResponse ] = useState(null)
  const updatePassword = async () => {
    let passwordData =  new FormData()
    let idData = new FormData()
    
    passwordData.append('user_id', user?.user_id)
    passwordData.append('current_password', password.current)  
    passwordData.append('new_password', password.new)

    idData.append('user_id', user?.user_id)

    let response = await dispatch(updateUserPassword(passwordData, idData))
    if (typeof response !== 'string') {      
      setPwdResponse(response.error)
    } else {
      setPwdResponse(response)
    }
    setPassword({
      current: '',
      new: '',
      confirmNew: ''
    })
    navigation.navigate('AccountLanding')
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
                  <AccountUpdateNavigation goBackEvt={navigation.goBack} saveAction={updateEmail} saveActive={emailSaveBtn} style={options.headerStyle} />
              )
              }                                  
        }}
      >
        {props => <AccountEmailUpdate {...props} email={email} setEmailState={setEmail} emailStatus={emailResponse} setEmailStatus={setEmailResponse} saveAction={setEmailSaveBtn} />}
      </Account.Screen>
      <Account.Screen 
        name='AccountPasswordUpdate'      
        options={{
          header: ({ scene, previous, navigation }) => {
              const { options } = scene.descriptor;
              return (
                  <AccountUpdateNavigation goBackEvt={navigation.goBack} saveActive={passwordSaveBtn} saveAction={updatePassword} style={options.headerStyle} />
              )
              }                                  
        }}
      >
      {props => <AccountPasswordUpdate {...props} password={password} setPasswordState={setPassword} pwdStatus={pwdResponse} setPwdStatus={setPwdResponse} saveAction={setPasswordStateBtn} />}
    </Account.Screen>
    </Account.Navigator>
  )
}

