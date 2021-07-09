import { searchTypes } from '../types/search.types';

const DEFAULT_STATE = {
  value: null,
  items: [],
  category: [],
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
        loading: true
      }
    case searchTypes.SEARCH_VALUE_SUCCESS:
      return {
        ...state,
        loading: false,
        value: action.payload.value,
        items: action.payload.items
      }
    case searchTypes.SEARCH_VALUE_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload.items
      }
    case searchTypes.GET_SEARCH_VALUE:
      return state.value;
    case searchTypes.SEARCH_VALUE_FAILED:
      return {
        ...state,
        loading: false,
        err: action.payload
      }
    default:
      return state;
  }
}
