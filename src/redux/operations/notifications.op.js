import apiConnect from "../../api/apiConnect";
import { setProductNotification, setRecommendationsNotification, setTopNewsNotification } from "../actions/notifications.actions";
import { notificationTypes } from "../types/notifications.types";
apiConnect
notificationTypes

/*subscribeToTopNews
	Method: post
	Parameters: {
		user_id --required,
		action --required// add or remove ,
		push_token --required
	}

	How it works: takes in a required user_id field and performs an action “add” or “remove” to update the notification token on the server*/


export const manageTopNewsNotification = (userId, action, token) => {
    return async (dispatch) => {
        const method = action === 'add' ? true : false
        dispatch(setTopNewsNotification(method))    
            
        let notificationData = new FormData()
        notificationData.append('user_id', userId)
        notificationData.append('action', action)
        notificationData.append('push_token', token)

        let datum = new FormData()
        datum.append('user_id', userId)        
        datum.append('push_token', token)
        try {
            const response = await apiConnect.post(`/subscribeToTopNews`, notificationData)            
            const { data } = response            
            if (response.status === '200' && data.message === "Subscription successful") {
                const checkWhetherSubscribed = await apiConnect.post(`/getTopNewsSubscriptionStatus`, datum)
                return checkWhetherSubscribed.data               
            } else {
                const checkWhetherSubscribed = await apiConnect.post(`/getTopNewsSubscriptionStatus`, datum)   
                return checkWhetherSubscribed.data                           
            }          
        } catch (e) {
            console.log(e.response)
        }
    }
}

export const manageRecommendationNotification = (userId, action, token) => {
    return async (dispatch) => {
        const method = action === 'add' ? true : false
        dispatch(setRecommendationsNotification(method))
                
        let recommendationData = new FormData()
        recommendationData.append('user_id', userId)
        recommendationData.append('action', action)
        recommendationData.append('push_token', token)

        let datum = new FormData()
        datum.append('user_id', userId)        
        datum.append('push_token', token)
        try {
            const response = await apiConnect.post(`/subscribeToRecommendations
            `, recommendationData)
            const { data } = response
            if (response.status === '200' && data.message === "Subscription successful") {
                const checkWhetherSubscribed = await apiConnect.post(`/getRecommendationsSubscriptionStatus`, datum)
                return checkWhetherSubscribed.data               
            } else {
                const checkWhetherSubscribed = await apiConnect.post(`/getRecommendationsSubscriptionStatus`, datum)   
                return checkWhetherSubscribed.data                           
            } 
        } catch (e) {
            console.log(e.response)
        }
    }
}
export const manageProductNotification = (userId, action, token) => {
    return async (dispatch) => {
        const method = action === 'add' ? true : false
        dispatch(setProductNotification(method))
        let notificationData = new FormData()
        notificationData.append('user_id', userId)
        notificationData.append('action', action)
        notificationData.append('push_token', token)

        let datum = new FormData()
        datum.append('user_id', userId)        
        datum.append('push_token', token)

        try {
            const response = await apiConnect.post(`/subscribeToProductUpdatesphp`, notificationData)
            const { data } = response
            if (response.status === '200' && data.message === "Subscription successful") {
                const checkWhetherSubscribed = await apiConnect.post(`/getProductUpdatesSubscriptionStatus`, datum)
                return checkWhetherSubscribed.data               
            } else {
                const checkWhetherSubscribed = await apiConnect.post(`/getProductUpdatesSubscriptionStatus`, datum)   
                return checkWhetherSubscribed.data                           
            }
        } catch (e) {
            console.log('produtcts' + ' ' + e.response.data.message)
        }
    }
}