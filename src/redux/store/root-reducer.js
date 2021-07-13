import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import userReducer from '../reducers/user.reducer.js'
import interestReducer from '../reducers/interest.reducer'
import newsCategoriesReducer from '../reducers/news-categories.reducer'
import mediaReducer from '../reducers/media.reducer.js'
import feedReducer from '../reducers/feed.reducer.js'
import { searchReducer } from '../reducers/search.reducer.js'
import downloadsReducer from '../reducers/downloads.reducer';
import newsReducer from '../reducers/news.reducer.js';

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [    
    'interest',
    'search',    
    'feed',    
    'media' 
  ],
}

const persistConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: [
    'user',
    'downloads' 
  ]
  
}
export const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  newsCategories: newsCategoriesReducer,
  interest: interestReducer,  
  feed: feedReducer,
  search: searchReducer,
  medias: mediaReducer,
  news: newsReducer,
  downloads: downloadsReducer
})

export default persistReducer(rootPersistConfig, rootReducer)
