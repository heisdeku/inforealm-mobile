import { searchNewsStart, searchNews, searchNewsFailed } from '../actions/search.action'
import apiConnect from '../../api/apiConnect';



export const getSearchData = (value) => {
  return async (dispatch) => {
    if (value) {
      try {
        dispatch(searchNewsStart());
        const response = await apiConnect.get(`/getNewsSearch?search=${value}`)
            if (response.data.status === 'success') {                         
              dispatch(searchNews(response.data.news))   
              console.log('got data')           
              return response.data.news
            } else {
              dispatch(searchNewsFailed(response.data.message))
            }  
      } catch (e) {
        dispatch(searchNewsFailed(err))
      }                 
    }    
  };
};
