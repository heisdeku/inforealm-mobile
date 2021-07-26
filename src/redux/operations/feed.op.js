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

export const getLatestFeed = (id) => {
  return (dispatch) => {
    dispatch(getFeedStart())
    const response = apiConnect.get(`/getFeed?user_id=${id}`)
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getFeed(res.data.news))
          const data = res.data.news
          return data
        }
      })
      .catch((err) => {
        console.log(err.response)
        dispatch(getFeedFailed(err.message))
      })
  }
}

export const getLatestFeedByInterest = (data) => {
  return async (dispatch) => {
    try {
      const response = await apiConnect.post(`/getNewsByInterests`, data)           
        if (response.data.status === 'success') {
          dispatch(getFeed(response.data.news))
          return response.data.news
        }
    } catch (err) {
      dispatch(getFeedFailed(err))
    }
    
      
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
