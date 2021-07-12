import { createSelector } from 'reselect'

const news = (state) => state.news
export const selectNewsId = createSelector(
  [news], 
  (news) => news.id
)
export const selectNews = createSelector(
  [news], 
  (news) => news.news
)

export const selectNewsTitle = createSelector(
  [selectNews],
  (selectNews) => selectNews.title
)

export const selectNewsCaption = createSelector(
  [selectNews],
  (selectNews) => selectNews.caption
)

export const selectNewsCategory = createSelector(
  [selectNews],
  (selectNews) => selectNews?.categories[0].category
)
export const isLoading = createSelector(
  [news], 
  (news) => news.loading
  )


export const hasError = createSelector(
  [news],
  news => news.error
)