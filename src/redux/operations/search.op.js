import { searchNewsStart, searchNews, searchNewsFailed, searchNewsCategory } from '../actions/search.action'
import { API } from '../../utils/api'


export const getSearchData = (value) => {
  return (dispatch) => {
    dispatch(searchNewsStart());
      const response = API.get(`/getNewsSearch?search=${value}`)
      return response.then(
        (res) => {
          if (res.data.status === 'success') {
            dispatch(searchNews(value, res.data.news))
            return res.data.news
          }
        }
      )
      .catch((err) => {
        dispatch(searchNewsFailed(err.message))
      })
  };
};

export const getSearchDataByInterest = (value, id, interest) => {
  return (dispatch) => {
      const response = API.get(`/getNewsSearch?search=${value}&interest=${interest}`)
      return response.then(
        (res) => {
          if (res.data.status === 'success') {
            dispatch(searchNewsCategory(id, res.data.news))
            return res.data.news
          }
        }
      )
      .catch((err) => {
        dispatch(searchNewsFailed(err.message))
      })
  };
};
