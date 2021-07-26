import { searchTypes } from '../types/search.types';

const DEFAULT_STATE = {
  value: '',
  data: [],
  category: [],
  error: null,
  loading: false
}

export const searchReducer = (state = DEFAULT_STATE, action ) => {
  switch(action.type) {
    case searchTypes.SET_SEARCH_VALUE:
      return {
        ...state,
        value: action.payload
      }
    case searchTypes.SEARCH_VALUE_START:
    case searchTypes.SEARCH_VALUE_BY_CATEGORY_START:
      return {
        ...state,
        error: null,
        loading: true
      }
    case searchTypes.SEARCH_VALUE_SUCCESS:
      return {
        ...state,
        loading: false,        
        data: action.payload.items
      }
    case searchTypes.SEARCH_VALUE_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.payload.items
      }
    case searchTypes.SEARCH_VALUE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
}
