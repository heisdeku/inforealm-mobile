import apiConnect from '../../api/apiConnect'
import { NewsCategoriesTypes } from '../types/news-categories.types'

export const startNewsCategoriesLoading = () => ({
    type: NewsCategoriesTypes.START_CATEGORIES_LOADING
})

export const endNewsCategoriesLoading = () => ({
    type: NewsCategoriesTypes.END_CATEGORIES_LOADING
})

export const setNewsCategoriesError = (message) => ({
    type: NewsCategoriesTypes.SET_CATEGORIES_ERROR,
    payload: message
})

export const clearNewsCategoriesError = () => ({
    type: NewsCategoriesTypes.SET_CATEGORIES_ERROR,
    payload: ''
})

export const setNewsCategories = (categoriesArray) => ({
    type: NewsCategoriesTypes.SET_CATEGORIES,
    payload: categoriesArray
})

export const clearNewsCategories = () => ({
    type: NewsCategoriesTypes.SET_CATEGORIES,
    payload: []
})

export const getNewsCategories = () => {
    return async (dispatch) => {
        dispatch(clearNewsCategoriesError())
        dispatch(startNewsCategoriesLoading())
        dispatch(setNewsCategories([]))
        try {
            const response = await apiConnect.get('/getNewsCategories')
            if(response.data.status === 'success'){
                dispatch(endNewsCategoriesLoading())
                dispatch(setNewsCategories(response.data.categories))
            }else{
                dispatch(endNewsCategoriesLoading())
                dispatch(setNewsCategoriesError(response.data.message))
            }
        } catch (error) {
            console.log(error);
            dispatch(setNewsCategoriesError('Something went wrong'))
        }
    }
}