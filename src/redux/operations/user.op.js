import { Alert } from 'react-native'
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook'
import {
  googleSignInProcess,
  facebookSignInProcess,
  signInStart,
  signUpStart,  
  signupSuccess,
  signupFailed,
  signInFailed,
  setUserStart,
  setUserSuccess,
  setUserFailed,
  setUserProfilePicture,
  setUserEmail
} from '../actions/user.actions'

import Secrets from '../../../constants/env'
import apiConnect from '../../api/apiConnect'


/*
export const GoogleAuthWrapper = {
  initAction: async () => {
    await GoogleSignIn.initAsync();
    this._syncUserWithStateAsync();
  },

  _syncUserWithStateAsync: async () => {
    const user = await GoogleSignIn.signInSilentlyAsync();
    return user
  },

  signOutAsync: async () => {
    const user = await GoogleSignIn.signOutAsync();
    return user
  },

  signInAsync: async () => {
    try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      if (type === 'success') {
        this._syncUserWithStateAsync();
      }
    } catch ({ message }) {
      alert('login: Error:' + message);
    }
  }
}
*/
// 781405863501-ebo8covjetmp5sdadd191krh23r158u1.apps.googleusercontent.com

// 781405863501-1i2ctff48ggmu884qouo4ulnvfi4fscd.apps.googleusercontent.com
export const googleSignIn = () => {
  return async (dispatch) => {
    dispatch(googleSignInProcess())
      let googleResFb;
      const res = await Google.logInAsync({   
        clientId: '781405863501-ebo8covjetmp5sdadd191krh23r158u1.apps.googleusercontent.com',                        
      });

        if (res.type === 'success') {          
          googleResFb = res.user
        }            
      try {
        //set variables with data gotten        
        let email = googleResFb.email
        let firstname = googleResFb.givenName
        let lastname = googleResFb.familyName

        let formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('type', "firebase")

        try {
          let response = await apiConnect.post(`/login`, formData)          
          let { data } = response
          dispatch(setUserStart())
          if (response.status === 200 || data.status === 'success') {
            dispatch(setUserSuccess(data.user))
            return data.user            
          } else {
            dispatch(setUserFailed(response.message))
          }
        } catch (e) {
          dispatch(signInFailed(e))
          return {
            error: "Can't Get User Data, Please Try Again"
          }
        } 
      } catch(error) {
        console.warn(error.message)
        dispatch(signInFailed(error.message))
      }     
  }
}

export const facebookLogIn = () => {
  return async (dispatch) => {
    dispatch(facebookSignInProcess())
    try {
      await Facebook.initializeAsync({
        appId: '1955726464594447',
      });
      const {
        type,
        token,      
        permissions,      
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });    
      if (type === 'success') {      
        const response = await fetch(`https://graph.facebook.com/me?fields=id%2Cname%2Cfirst_name%2Cmiddle_name%2Clast_name%2Cemail&access_token=${token}`);
        const user = await response.json()
        Alert.alert('Logged in!', `Hi ${user.name}!`); 
        //set variables with data gotten        
        let email = user.email
        let firstname = user.first_name
        let lastname = user.last_name

        let formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('type', "firebase")

        try {
          let response = await apiConnect.post(`/login`, formData)
          let { data } = response
          dispatch(setUserStart())
          if (response.status === 200 || data.status === 'success') {
            dispatch(setUserSuccess(data.user))             
            return data.user                  
          } else {
            dispatch(setUserFailed(response.message))
          }
        } catch (e) {
          dispatch(signInFailed(e))
          return {
            error: e
          }
        }        
      } else {
        dispatch(setUserFailed('Operation Cancelled by user'))
        return {          
          error: 'Operation Cancelled'
        }
      }
    } catch ({ message }) {
      console.log(message)      
      alert(`Facebook Login Error: ${message}`);
      return {
        error: message
      }
    }
  }
}


export const emailSignUp = (dataToSend) => {
  return async (dispatch) => {
    dispatch(signUpStart())
    try {
      let response = await apiConnect.post(`/signUp`, dataToSend)
      let { data } = response
      if (
        response.status === 200 &&
        response.status <= 400 &&
        data.status === 'success'
      ) {
        dispatch(signupSuccess(data.user))
        return data.status
      }
    } catch (e) {
      dispatch(signupFailed(e.response.data.message))
      return {
        error: e.response.data.message
      }
    }
  }
}

export const emailLogin = (dataToSend) => {
  return async (dispatch) => {
    dispatch(signInStart())
    try {
      let response = await apiConnect.post(`/login`, dataToSend)
      let { data } = response    
      dispatch(setUserStart())      
      if (response.status === 200 && data.status === 'success') {        
        dispatch(setUserSuccess(data.user)) 
        return data.user       
      } else {
        dispatch(setUserFailed(data.message))        
        return {
          error: data.message
        }
      }
    } catch (e) {
      dispatch(signInFailed(e.response.data.message))
      return {
        error: e
      }
    }
  }
}

export const updateUserPicture = (dataToSend, userId) => {
  return async (dispatch) => {    
    try {
      let response = await apiConnect.post(`/updateProfile`, dataToSend)           
      let { data } = response
      if (data.status !== 'success') {
        return {
          error: 'Something Went wrong, Try Uploading Again'
        }
      } else {
        dispatch(setUserStart())
        let resp = await apiConnect.post(`/getUser`, userId)        
        if (resp.status === 200 || resp.data.status === 'success') {                    
          dispatch(setUserProfilePicture(resp.data.user.profile_picture)) 
          return resp.data.user.profile_picture       
        } else {
          dispatch(setUserFailed(res.data.message))
        }
      }     
    } catch (e) {      
      return {
        error: e
      }      
    }
  }
}


export const updateUserEmail = (dataToSend, userId) => {
  return async (dispatch) => {    
    try {
      let response = await apiConnect.post(`/updateProfile`, dataToSend)          
      let { data } = response
      if (data.status !== 'success') {
        return {
          error: 'Something Went wrong, Try Uploading Again'
        }
      } else {
        dispatch(setUserStart())
        let resp = await apiConnect.post(`/getUser`, userId)        
        if (resp.status === 200 || resp.data.status === 'success') {                    
          dispatch(setUserEmail(resp.data.user.email))           
        } else {
          dispatch(setUserFailed(res.data.message))
        }
        return response.data.message
      }     
    } catch (e) {      
      return {
        error: e
      }      
    }
  }
}

export const updateUserPassword = (dataToSend) => {
  return async () => {    
    try {
      let response = await apiConnect.post(`/updatePassword`, dataToSend)          
      let { data } = response      
      if (data.status !== 'success') {
        return {
          error: 'Something Went wrong, Try Uploading Again'
        }
      }
      return data.message;    
    } catch (e) {      
      return {
        error: 'Something Went Wrong, Try Again'
      }      
    }
  }
}