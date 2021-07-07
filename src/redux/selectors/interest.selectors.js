import { createSelector } from 'reselect'

export const selectInterest = state => state.interest

export const selectInterests = createSelector(
    [selectInterest],
    interest => interest.interests
)

export const selectInterestLoading = createSelector(
    [selectInterest],
    interest => interest.interestLoading
)

export const selectInterestError = createSelector(
    [selectInterest],
    interest => interest.errorMessage
)