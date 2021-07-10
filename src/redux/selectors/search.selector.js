import { createSelector } from 'reselect'

const searchState = (state) => state.search

export const getSearchValue = createSelector(
  [searchState],
  (searchState) => searchState.value
)

export const getSearchDatas = createSelector(
  [searchState],
  (searchState) => searchState.data
)

export const getSearchCategoryData = createSelector(
    [searchState],
    (searchState) => searchState.category
  )

export const isLoading = createSelector(
    [searchState],
    (searchState) => searchState.loading
)

export const hasError = createSelector(
    [searchState],
    (searchState) => searchState.error
)