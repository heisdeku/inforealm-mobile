import {
  getFeedStart,
  getFeed,
  getFeedFailed,
  getTrendingStart,
  getTrending,
  getTrendingFailed,
  getTopStart,
  getTop,
  getTopFailed,
  getLocations,
  getLocationsStart,
  getLocationsFailed,
  getAllNews,
  getAllNewsStart,
  getAllNewsFailed,
} from '../actions/newsList.action'

import { API } from '../../utils/api'

export const getLatestFeed = () => {
  return (dispatch) => {
    dispatch(getFeedStart())
    const response = API.get('/getFeed')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getFeed(res.data.news))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getFeedFailed(err.message))
      })
  }
}

export const getTrend = () => {
  return (dispatch) => {
    dispatch(getTrendingStart())
    const response = API.get('/getTrends')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getTrending(res.data.news))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getTrendingFailed(err.message))
      })
  }
}

export const fetchTopNews = () => {
  return (dispatch) => {
    dispatch(getTopStart())
    const response = API.get('/getTopNews')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getTop(res.data.news))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getTopFailed(err.message))
      })
  }
}

export const fetchAllNews = () => {
  return (dispatch) => {
    dispatch(getAllNewsStart())
    const response = API.get('/getNewsByCategory')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getAllNews(res.data.news))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getAllNewsFailed(err.message))
      })
  }
}

export const fetchNewsLocations = () => {
  return (dispatch) => {
    dispatch(getLocationsStart())
    const response = API.get('/getNewsLocation')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getLocations(res.data.locations))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getLocationsFailed(err.message))
      })
  }
}


export const getPublishedFeed = () => {
  return (dispatch) => {
    dispatch(getFeedStart())
    const response = API.get('/getPublishedStats')
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getFeed(res.data.news))
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getFeedFailed(err.message))
      })
  }
}