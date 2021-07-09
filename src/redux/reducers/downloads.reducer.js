import { DownloadTypes } from '../types/download.types'

const DEFAULT_STATE = {
    downloads: [],
    loading: false,
    downloadError: ''
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
    default:
      return state
  }
}

export default downloadsReducer;
