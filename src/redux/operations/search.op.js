import { searchNewsStart, searchNews, searchNewsFailed, searchNewsCategory } from '../actions/search.action'
import apiConnect from '../../api/apiConnect';



export const getSearchData = (value) => {
  return (dispatch) => {
    dispatch(searchNewsStart());
      const response = apiConnect.get(`/getNewsSearch?search=${value}`)
      return response.then(
        (res) => {
          if (res.data.status === 'success') {
            dispatch(searchNews(res.data.news))
            return res.data.news
          }
        }
      )
      .catch((err) => {
        dispatch(searchNewsFailed(err.response.data.message))
      })
  };
};

export const getSearchDataByInterest = (value, id) => {
  return async (dispatch) => {
    dispatch(searchNewsStart());
    const response = await apiConnect.get(`/getNewsSearch?search=${value}&interest=${id}`)
    return response.then(
      (res) => {
        if (res.data.status === 'success') {
          dispatch(searchNewsCategory(res.data.news))
          return res.data.news
        }
      }
    )
    .catch((err) => {
      dispatch(searchNewsFailed(err.response.data.message))
    })
  };
};
