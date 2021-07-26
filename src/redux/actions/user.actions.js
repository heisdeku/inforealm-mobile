import { userTypes } from '../types/user.types'

export const googleSignInProcess = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
  method: 'social-google'
})

export const facebookSignInProcess = () => ({
  type: userTypes.FACEBOOK_SIGN_IN_START,
  method: 'social-facebook'
})

export const signInStart = () => ({
  type: userTypes.SIGN_IN_START,
})

export const signUpStart = () => ({
  type: userTypes.SIGN_UP_START,
})

export const setUserStart = () => ({
  type: userTypes.SET_USER_START,
})

export const signInSuccess = (user, method) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: {
    user,
    method,
  },
})

export const signupSuccess = (user) => ({
  type: userTypes.SIGN_UP_SUCCESS,
})

export const setUserSuccess = (user) => ({
  type: userTypes.SET_USER_SUCCESS,
  payload: user,
})

export const setUserProfilePicture = (image) => ({
  type: userTypes.SET_PROFILE_PICTURE,
  payload: image
})
export const setUserEmail = (email) => ({
  type: userTypes.SET_USER_EMAIL,
  payload: email
})
export const signInFailed = (err) => ({
  type: userTypes.SIGN_IN_FAILED,
  payload: err,
})

export const signupFailed = (err) => ({
  type: userTypes.SIGN_UP_FAILED,
  payload: err,
})

export const setUserFailed = (err) => ({
  type: userTypes.SET_USER_FAILED,
  payload: err,
})

export const cleanUpSignUpProcess = () => ({
  type: userTypes.CLEAR_SOCIAL_USER,
})

export const logoutUser = () => ({
  type: userTypes.LOGOUT_USER,
})
