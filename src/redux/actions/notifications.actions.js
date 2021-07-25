import { notificationTypes } from "../types/notifications.types";

export const setNotificatonToken = (token) => ({
    type: notificationTypes.SET_PUSH_TOKEN,
    payload: token
})

export const setAllNotificationsActive = () => ({
    type: notificationTypes.SET_ALL_NOTIFICATION
})

export const setTopNewsNotification = (state) => ({
    type: notificationTypes.SET_TOPNEWS_NOTIFICATIONS,
    payload: state
})


export const setRecommendationsNotification = (state) => ({
    type: notificationTypes.SET_RECOMMENDATIONS_NOTIFICATIONS,
    payload: state
})


export const setProductNotification = (state) => ({
    type: notificationTypes.SET_PRODUCTS_NOTIFICATIONS,
    payload: state
})
