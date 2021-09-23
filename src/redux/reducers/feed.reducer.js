import { feedTypes } from '../types/feed.types';

const DEFAULT_STATE = {
  latest: [],
  trending: [],    
  top: [],  
  error: null,
  loading: true
}

const feedReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case feedTypes.FETCH_LATEST_START:    
    case feedTypes.FETCH_TRENDING_START:    
    case feedTypes.FETCH_TOPNEWS_START:
      return {
        ...state,
        error: null,
        loading: true
      }    
    case feedTypes.FETCH_LATEST_SUCCESS:
      return {
        ...state,
        latest: action.payload,
        loading: false,
      }
    case feedTypes.FETCH_TRENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        trending: action.payload.trending,
      }
    case feedTypes.FETCH_TOPNEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        top: action.payload,
      }
    case feedTypes.FETCH_LATEST_FAILED:    
    case feedTypes.FETCH_TRENDING_FAILED:
    case feedTypes.FETCH_TOPNEWS_FAILED:    
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    default:
  return state;
}
}

export default feedReducer
