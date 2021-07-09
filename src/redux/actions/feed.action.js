import { feedTypes } from '../constants'

export const getFeedStart = () => ({
  type: feedTypes.FETCH_LATEST_START
})
export const getFeed = (news) => ({
  type: feedTypes.FETCH_LATEST_SUCCESS,
  payload: news
})

export const getFeedFailed = (err) => ({
  type: feedTypes.FETCH_LATEST_FAILED,
  payload: err
})


export const getTrendingStart = () => ({
  type: feedTypes.FETCH_TRENDING_START
})
export const getTrending = (trending) => ({
  type: feedTypes.FETCH_TRENDING_SUCCESS,
  payload: {
    trending
  }
})

export const getTrendingFailed = (err) => ({
  type: feedTypes.FETCH_TRENDING_FAILED,
  payload: err
})


export const getAllNewsStart = () => ({
  type: feedTypes.FETCH_ALLNEWS_START
})
export const getAllNews = (allNews) => ({
  type: feedTypes.FETCH_ALLNEWS_SUCCESS,
  payload: {
    allNews
  }
})

export const getAllNewsFailed = (err) => ({
  type: feedTypes.FETCH_ALLNEWS_FAILED,
  payload: err
})

export const getTopStart = () => ({
  type: feedTypes.FETCH_TOPNEWS_START
})

export const getTop = (news) => ({
  type: feedTypes.FETCH_TOPNEWS_SUCCESS,
  payload: news
})

export const getTopFailed = (err) => ({
  type: feedTypes.FETCH_TOPNEWS_FAILED,
  payload: err
})

export const getLocationsStart = () => ({
  type: feedTypes.FETCH_LOCATIONS_START
})

export const getLocations = (locations) => ({
  type: feedTypes.FETCH_LOCATIONS_SUCCESS,
  payload: locations
})

export const getLocationsFailed = (err) => ({
  type: feedTypes.FETCH_LOCATIONS_FAILED,
  payload: err
})
