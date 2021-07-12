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
} from '../actions/feed.action'

import apiConnect from '../../api/apiConnect'

export const getLatestFeed = () => {
  return (dispatch) => {
    dispatch(getFeedStart())
    const response = apiConnect.get('/getFeed')
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
    const response = apiConnect.get('/getTrends')
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
    const response = apiConnect.get('/getTopNews')
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
