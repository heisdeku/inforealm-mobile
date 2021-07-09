import axios from 'axios'
import * as GoogleSignIn from 'expo-google-sign-in';
import { provider, auth, fbProvider } from '../../../firebase'
//eslint-disable-next-line
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
} from '../actions/user.actions'

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
export const googleSignIn = () => {
  return async (dispatch) => {
      dispatch(googleSignInProcess())
      auth
      .signInWithPopup(provider)
      .then(async (result) => {
        //set variables with data gotten
        let user = result.user
        let email = user.email
        let firstname = user.displayName.split(' ')[0]
        let lastname = user.displayName.split(' ')[1]        

        let formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('type', "firebase")

        try {
          let response = await axios.post(`${BASE_URL}login`, formData)          
          let { data } = response
          dispatch(setUserStart())
          if (response.status === 200 || data.status === 'success') {
            dispatch(setUserSuccess(data.user))
            window.location.replace('/')
          } else {
            dispatch(setUserFailed(response.message))
          }
        } catch (e) {
          dispatch(signInFailed(e))
        }
      })
      .catch((error) => {
        console.warn(error.message)
        dispatch(signInFailed(error.message))
      })
  }
}

export const facebookSignIn = () => {
  return (dispatch) => {
    dispatch(facebookSignInProcess())
    auth
      .signInWithPopup(fbProvider)
      .then(async (result) => {
        //set variables with data gotten
        let user = result.user
        let email = user.email
        let firstname = user.displayName.split(' ')[0]
        let lastname = user.displayName.split(' ')[1]        

        let formData = new FormData()
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('type', "firebase")

        try {
          let response = await axios.post(`${BASE_URL}login`, formData)          
          let { data } = response
          dispatch(setUserStart())
          if (response.status === 200 || data.status === 'success') {
            dispatch(setUserSuccess(data.user))
            window.location.replace('/')
          } else {
            dispatch(setUserFailed(response.message))
          }
        } catch (e) {
          dispatch(signInFailed(e))
        }
      })
      .catch((error) => {
        console.warn(error.message)
        dispatch(signInFailed(error.message))
      })
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
      if (response.status === 200 || data.status === 'success') {
        dispatch(setUserSuccess(data.user)) 
        return data.user       
      } else {
        dispatch(setUserFailed(response.message))
      }
    } catch (e) {
      dispatch(signInFailed(e.response.data.message))
    }
  }
}
