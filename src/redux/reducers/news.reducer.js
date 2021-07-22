import { newsTypes } from "../types/news.types"

const DEFAULT_STATE = {
  id: '',
  news: {},
  isLiked: false,
  isBookmarked: false,
  loading: true,
  error: null,
  comments: []  
}

const newsReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case newsTypes.FETCH_NEWS_START:
      return {
        ...state,
        id: '',
        news: {},
        error: null,
        loading: true,
      }
    case newsTypes.FETCH_NEWS:
      return {
        ...state,
        loading: false,
        id: action.payload.id,
        news: action.payload.news,
      }
    case newsTypes.GET_COMMENTS:
        return {
          ...state,
          comments: state.news.comments
        }
    case newsTypes.ADD_COMMENT:
        return {  
          ...state,        
          comments: [
            ...state.comments,
            {
              ...action.payload.comment
            }            
          ]
        }
    case newsTypes.FETCH_NEWS_FAILED:
      return {
        ...state,
        loading: false,
        err: action.payload.err,
      }
    default:
      return state
  }
}

export default newsReducer
