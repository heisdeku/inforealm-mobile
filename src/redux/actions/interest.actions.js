import apiConnect from '../../api/apiConnect'
import { InterestActionTypes } from '../types/interest.types'


export const startInterestLoading = () => ({
    type: InterestActionTypes.START_INTEREST_LOADING
})

export const endInterestLoading = () => ({
    type: InterestActionTypes.END_INTEREST_LOADING
})

export const setInterestError = (message) => ({
    type: InterestActionTypes.SET_INTEREST_ERROR,
    payload: message
})

export const clearInterestError = () => ({
    type: InterestActionTypes.SET_INTEREST_ERROR,
    payload: ''
})

export const setInterests = (interestsArray) => ({
    type: InterestActionTypes.SET_INTERESTS,
    payload: interestsArray
})

export const clearInterests = () => ({
    type: InterestActionTypes.SET_INTERESTS,
    payload: []
})

export const getInterests = () => {
    return async (dispatch) => {
        dispatch(clearInterestError())
        dispatch(startInterestLoading())
        dispatch(setInterests([]))
        try {
            const response = await apiConnect.get('/getNewsInterests')
            if(response.data.status === 'success'){
                dispatch(endInterestLoading())
                dispatch(setInterests(response.data.interests))
            }else{
                dispatch(endInterestLoading())
                dispatch(setInterestError(response.data.message))
            }
        } catch (error) {
            console.log(error);
            dispatch(setInterestError('Something went wrong'))
        }
    }
}