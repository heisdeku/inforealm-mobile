import { getNewsStart, getNews, getNewsFailed } from '../actions/news.actions'

import { API } from '../../utils/api'

export const getNewsData = (id) => {
  return (dispatch) => {
    dispatch(getNewsStart())
    const response = API.get(`/getNews?id=${id}`)
    return response
      .then((res) => {
        if (res.data.status === 'success') {
          dispatch(getNews(id, res.data.news))
          let { title } = res.data.news
          const titleLink = title.split(' ').join('-')
          window.location.replace(`/${titleLink}`)
          return res.data.news
        }
      })
      .catch((err) => {
        dispatch(getNewsFailed(err.message))
      })
  }
}
