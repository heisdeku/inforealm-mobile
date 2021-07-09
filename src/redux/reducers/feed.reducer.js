import { feedTypes } from '../types/feed.types';

const DEFAULT_STATE = {
  latest: [],
  trending: [],
  allNews: [],
  newsLocations: [],
  top: [],
  glance: [],
  loading: false
}

const feedReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case feedTypes.FETCH_LATEST_START:
    case feedTypes.FETCH_ALLNEWS_START:
    case feedTypes.FETCH_TRENDING_START:
    case feedTypes.FETCH_LOCATIONS_START:
    case feedTypes.FETCH_TOPNEWS_START:
      return {
        ...state,
        loading: true
      }
    case feedTypes.FETCH_ALLNEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        allNews: action.payload.allNews
      }
    case feedTypes.FETCH_LATEST_SUCCESS:
      return {
        ...state,
        loading: false,
        latest: action.payload,
      }
    case feedTypes.FETCH_TRENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        trending: action.payload.trending,
      }
    case feedTypes.FETCH_LOCATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        newsLocations: action.payload,
      }
    case feedTypes.FETCH_TOPNEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        top: action.payload,
      }
    case feedTypes.FETCH_LATEST_FAILED:
    case feedTypes.FETCH_ALLNEWS_FAILED:
    case feedTypes.FETCH_TRENDING_FAILED:
    case feedTypes.FETCH_TOPNEWS_FAILED:
    case feedTypes.FETCH_LOCATIONS_FAILED:
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
