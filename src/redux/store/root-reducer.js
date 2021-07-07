import { combineReducers } from 'redux'

import userReducer from '../reducers/user.reducer.js'
import interestReducer from '../reducers/interest.reducer'
import newsCategoriesReducer from '../reducers/news-categories.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  newsCategories: newsCategoriesReducer,
  interest: interestReducer
})

export default rootReducer
