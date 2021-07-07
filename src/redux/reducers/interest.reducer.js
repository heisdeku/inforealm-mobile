import { InterestActionTypes } from '../types/interest.types'

const DEFAULT_STATE = {
    interests: [],
    interestLoading: false,
    errorMessage: ''
}

const interestReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case InterestActionTypes.START_INTEREST_LOADING:
      return {
        ...state,
        interestLoading: true
      }
    case InterestActionTypes.END_INTEREST_LOADING:
      return {
        ...state,
        interestLoading: false
      }
    case InterestActionTypes.SET_INTEREST_ERROR:
      return {
        ...state,
        errorMessage: action.payload
      }
    case InterestActionTypes.SET_INTERESTS:
      return {
        ...state,
        interests: action.payload
      }
    default:
      return state
  }
}

export default interestReducer
