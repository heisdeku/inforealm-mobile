import { createSelector } from 'reselect'

const userState = (state) => state.user

export const getCurrentUser = createSelector(
  [userState],
  (userState) => userState?.user
)

export const selectUserId = createSelector(
  [userState],
  (userState) => userState.user?.user_id
)


export const isLoading = createSelector(
  [userState],
  userState => userState.isLoading
)

export const checkAuthMethod = createSelector(
  [userState],
  userState => userState.authMethod
)