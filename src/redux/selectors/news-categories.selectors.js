import { createSelector } from 'reselect'

export const selectNewsCategories = state => state.newsCategories

export const selectCategories = createSelector(
    [selectNewsCategories],
    newsCategories => newsCategories.categories
)

export const selectCategoriesLoading = createSelector(
    [selectNewsCategories],
    newsCategories => newsCategories.interestLoading
)

export const selectCategoriesError = createSelector(
    [selectNewsCategories],
    newsCategories => newsCategories.errorMessage
)