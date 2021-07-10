import { searchTypes } from '../types/search.types'

export const setValue = (search) => ({
  type: searchTypes.SET_SEARCH_VALUE,
  payload: search
})
export const searchNewsStart = () => ({
  type: searchTypes.SEARCH_VALUE_START
})

export const searchNews = (items) => ({
  type: searchTypes.SEARCH_VALUE_SUCCESS,
  payload: {
    items
  }
})

export const searchNewsFailed = (err) => ({
  type: searchTypes.SEARCH_VALUE_FAILED,
  payload: err
})

export const searchNewsCategory = (items) => ({
  type: searchTypes.SEARCH_VALUE_BY_CATEGORY_SUCCESS,
  payload: {
    items
  }
})
