import { feedTypes } from '../types/feed.types'

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
