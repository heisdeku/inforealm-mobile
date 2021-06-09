import { combineReducers } from 'redux'

import userReducer from '../reducers/user.reducer.js'

const rootReducer = combineReducers({
  user: userReducer,
})

export default rootReducer
