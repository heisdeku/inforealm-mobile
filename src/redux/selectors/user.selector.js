import { createSelector } from 'reselect'

const userState = (state) => state.user

export const getCurrentUser = createSelector(
  [userState],
  (userState) => userState.currentUser
)

export const getSocialUser = createSelector(
  [userState],
  (userState) => userState.socialUser
)

export const selectUserId = createSelector(
  [userState],
  (userState) => userState.currentUser
)
