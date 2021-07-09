import { newsTypes } from '../constants'

export const getNewsStart = () => ({
  type: newsTypes.FETCH_NEWS_START,
})

export const getNews = (id, news) => ({
  type: newsTypes.FETCH_NEWS,
  payload: {
    id,
    news,
  },
})

export const getNewsFailed = (err) => ({
  type: newsTypes.FETCH_NEWS_FAILED,
  payload: err,
})
