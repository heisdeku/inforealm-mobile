import { createSelector } from 'reselect';

const feedData = (state) => state.feedData

export const selectLatestFeed = createSelector(
  [feedData],
  (feedData) => feedData.latest
)

export const selectTrendingFeed = createSelector(
  [feedData],
  (feedData) => feedData.trending
)

export const isLoading = createSelector(
  [feedData],
  (feedData) => feedData.loading
)

export const selectAllNews = createSelector(
  [feedData],
  (feedData) => feedData.allNews
)
