import { searchTypes } from '../constants'

export const setValue = (search) => ({
  type: searchTypes.SET_SEARCH_VALUE,
  payload: search
})
export const getSearchValue = () => ({
  type: searchTypes.GET_SEARCH_VALUE,  
})
export const searchNewsStart = () => ({
  type: searchTypes.SEARCH_VALUE_START
})

export const searchNews = (value, items) => ({
  type: searchTypes.SEARCH_VALUE_SUCCESS,
  payload: {
    value, items
  }
})

export const searchNewsFailed = (err) => ({
  type: searchTypes.SEARCH_VALUE_FAILED,
  payload: err
})

export const searchNewsCategory = (id, items) => ({
  type: searchTypes.SEARCH_VALUE_BY_CATEGORY_SUCCESS,
  payload: {
    id,
    items
  }
})
