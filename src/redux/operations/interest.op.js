import { getInterestsStart, getInterests, getInterestsFailed } from '../actions/interest.action'
import { API } from '../../utils/api'

export const getInterestList = () => {
  return (dispatch) => {
    dispatch(getInterestsStart());
    const response = API.get('/getNewsInterests')
    return response.then(
      (res) => {
        if (res.data.status === 'success') {
          dispatch(getInterests(res.data.interests))
          return res.data.interests;
        }
      }
    )
    .catch((err) => {
      dispatch(getInterestsFailed(err.message))
    })
  };
}
