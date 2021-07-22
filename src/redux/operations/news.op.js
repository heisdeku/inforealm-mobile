import { getNewsStart, getNews, getNewsFailed } from '../actions/news.actions'

import apiConnect from '../../api/apiConnect'


export const getNewsData = (id) => {
  return async (dispatch) => {
    dispatch(getNewsStart())
    try {
      const response = await apiConnect.get(`/getNews?id=${id}`)
      if (response.data.status === 'success') {
        dispatch(getNews(id, response.data.news))                    
        return {
          news: response.data.news
        }
      } else {
        dispatch(getNewsFailed("Sorry can't fetch News at the moment, Try Again."))
      }
    } catch (err) {      
        return {
          error: err
        }
    }
  }
}
