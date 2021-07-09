import { createSelector } from 'reselect'

const media = (state) => state.media

export const selectDocumentaries = createSelector(
  [media],
  (media) => media.documentaries.all
)
export const selectDocumentariesFocus = createSelector(
  [media],
  (media) => media.documentaries.focus
)

export const selectDocumentariesInterests = createSelector(
  [media],
  [selectDocumentaries],
  (selectDocumentaries) => selectDocumentaries.interests
)

/*
export const selectAllDocumentariesCategories = createSelector(
  [selectDocumenttaries],
  (selectDocumentaries) => 
)
*/
export const selectIsloading = createSelector([media], (media) => media.loading)

export const selectAllGlanceNews = createSelector(
  [media],
  (media) => media.glance
)
