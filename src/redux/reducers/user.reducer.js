import { userTypes } from '../types/user.types'

const DEFAULT_STATE = {
  user: null,
  socialUser: null,
  error: null,
  isLoading: false,
  authMethod: null,
}

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case userTypes.GOOGLE_SIGN_IN_START:
    case userTypes.FACEBOOK_SIGN_IN_START:
        return {
          ...state,
          isLoading: true,
          error: null,
          authMethod: 'direct-social',
        }
    case userTypes.SIGN_UP_START:
    case userTypes.SIGN_IN_START:
    case userTypes.SET_USER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
        authMethod: 'manual',
      }
    case userTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case userTypes.SIGN_IN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          socialUser: null,
          error: false,
        }      
    case userTypes.SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      }
    case userTypes.CLEAR_SOCIAL_USER:
      return {
        ...state,
        socialUser: null,
        authMethod: null,
      }
    case userTypes.LOGOUT_USER:
      return {
        ...state,
        user: null,
      }
    case userTypes.SIGN_IN_FAILED:
    case userTypes.SIGN_UP_FAILED:
    case userTypes.SET_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload,
      }
    default:
      return state
  }
}

export default userReducer

/*
"user_id": "6b28997c6ebde4f030853b8769856dd8",
        "firstname": "michael",
        "lastname": "oluwa",
        "email": "heyferanmi@gmail.com",
        "user_role": "user"
*/
