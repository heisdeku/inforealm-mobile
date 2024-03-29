import { userTypes } from '../types/user.types'


const DEFAULT_STATE = {
  user: null,  
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
          authMethod: action.method,
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
          error: false,
        }      
    case userTypes.SET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authMethod: null,
        user: action.payload,
      }
    case userTypes.SET_PROFILE_PICTURE:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          profile_picture: action.payload
        }
      }
    case userTypes.SET_USER_EMAIL:
      return {
        ...state,
        isLoading: false,
        user: {
          ...state.user,
          email: action.payload
        }
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

