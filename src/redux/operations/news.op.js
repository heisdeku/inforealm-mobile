import { getNewsStart, getNews, getNewsFailed } from '../actions/news.actions'

import apiConnect from '../../api/apiConnect'


export const getNewsData = (id) => {
  return (dispatch) => {
    dispatch(getNewsStart())
    const response = apiConnect.get(`/getNews?id=${id}`)
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getNews(id, res.data.news))                    
          return {
            news: res.data.news
          }
        }
      })
      .catch((err) => {
        dispatch(getNewsFailed(err.message))
        return {
          error: err
        }
      })
  }
}
