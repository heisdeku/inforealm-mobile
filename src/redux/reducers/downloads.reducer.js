import { DownloadTypes } from '../types/download.types'

const DEFAULT_STATE = {
    downloads: [],
    downloadArticles: [],
    loading: false,
    downloadError: '',
    bookmarksUpdated: false,
    downloadsUpdated: false
}

const downloadsReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case DownloadTypes.CLEAR_DOWNLOADS:
      return {
        ...state,
        downloads: []
      }
    case DownloadTypes.SET_DOWNLOAD:
      return {
        ...state,
        downloads: action.payload
      }
    case DownloadTypes.DELETE_DOWNLOAD:
      return {
        ...state,
        downloads: action.payload
      }
    case DownloadTypes.SET_DOWNLOAD_ERROR:
      return {
        ...state,
        downloadError: action.payload
      }
    case DownloadTypes.START_DOWNLOAD_LOADING:
      return {
        ...state,
        loading: true
      }
    case DownloadTypes.END_DOWNLOAD_LOADING:
      return {
        ...state,
        loading: false
      }
    case DownloadTypes.SET_DOWNLOAD_ARTICLE:
      return {
        ...state,
        downloadArticles: action.payload
      }
    case DownloadTypes.PUSH_DOWNLOAD_ARTICLE:
      return {
        ...state,
        downloadArticles: state.downloadArticles.find(savedArticle => savedArticle.id === article.id) ? state.downloadArticles : state.downloadArticles.push(action.payload)
      }
    case DownloadTypes.POP_DOWNLOAD_ARTICLE:
      return {
        ...state,
        downloadArticles: state.downloadArticles.filter(savedArticle => savedArticle.id !== action.payload.id)
      }
    case DownloadTypes.CLEAR_DOWNLOAD_ARTICLES:
      return {
        ...state,
        downloadArticles: []
      }
    case DownloadTypes.SET_BOOKMARK_STATUS:
      return {
        ...state,
        bookmarksUpdated: action.payload
      }
    case DownloadTypes.SET_DOWNLOAD_STATUS:
      return {
        ...state,
        downloadsUpdated: action.payload
      }
    default:
      return state
  }
}

export default downloadsReducer;
