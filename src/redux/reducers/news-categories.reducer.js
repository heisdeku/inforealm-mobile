import { NewsCategoriesTypes } from '../types/news-categories.types'

const DEFAULT_STATE = {
  categories: [],
  errorMessage: '',
  categoriesLoading: false
}

const newsCategoriesReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case NewsCategoriesTypes.START_CATEGORIES_LOADING:
      return {
        ...state,
        categoriesLoading: true
      }
    case NewsCategoriesTypes.END_CATEGORIES_LOADING:
      return {
        ...state,
        categoriesLoading: false
      }
    case NewsCategoriesTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
    case NewsCategoriesTypes.SET_CATEGORIES_ERROR: 
    return {
      ...state,
      errorMessage: action.payload
    }
    default: 
      return state
  }
}

export default newsCategoriesReducer
