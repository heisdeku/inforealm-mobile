import { notificationTypes } from "../types/notifications.types";

const DEFAULT_STATE = {
    token: null,    
    top: false,
    recommendations: false,
    products: false
}

export const notificationsReducer = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case notificationTypes.SET_PUSH_TOKEN:
            return {
                ...state,
                token: action.payload
            }
        case notificationTypes.SET_ALL_NOTIFICATION:
            return {
                ...state,                
                top: true,
                recommendations: true,
                products: true
            }
        case notificationTypes.SET_TOPNEWS_NOTIFICATIONS:
            return {
                ...state,
                top: action.payload
            }
        case notificationTypes.SET_RECOMMENDATIONS_NOTIFICATIONS:
                return {
                    ...state,
                    recommendations: action.payload
                }
        case notificationTypes.SET_PRODUCTS_NOTIFICATIONS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}