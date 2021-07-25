
import { createSelector } from 'reselect'

const userNotifications = (state) => state.notifications

export const getNotificationToken = createSelector(
    [userNotifications],
    (userNotifications) => userNotifications.token
)

export const topNotificationStatus = createSelector(
    [userNotifications],
    (userNotifications) => userNotifications.top
)

export const recomNotificationsStatus = createSelector(
    [userNotifications],
    (userNotifications) => userNotifications.recommendations
)

export const productsNotificationsStatus = createSelector(
    [userNotifications],
    (userNotifications) => userNotifications.products
)