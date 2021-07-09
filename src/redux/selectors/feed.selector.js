import { createSelector } from 'reselect';

const feed = (state) => state.feed

export const selectLatestFeed = createSelector(
  [feed],
  (feed) => feed.latest
)

export const selectTrendingFeed = createSelector(
  [feed],
  (feed) => feed.trending
)

export const selectTopNews = createSelector(
  [feed],
  (feed) => feed.top
)

export const isLoading = createSelector(
  [feed],
  (feed) => feed.loading
)


export const error = createSelector(
  [feed],
  (feed) => feed.error
)