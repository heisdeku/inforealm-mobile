import { createSelector } from 'reselect';

export const selectDownloads = state => state.downloads;

export const selectDownloadsArray = createSelector(
    [selectDownloads],
    downloads => downloads.downloads
);

export const selectDownloadsArticles = createSelector(
    [selectDownloads],
    downloads => downloads.downloadArticles
)

export const selectDownloadsError = createSelector(
    [selectDownloads],
    downloads => downloads.downloadError
);

export const selectDownloadsLoading = createSelector(
    [selectDownloads],
    downloads => downloads.loading
);

export const selectDownloadStatus = createSelector(
    [selectDownloads],
    downloads => downloads.downloadStatus
);

export const selectBookmarkStatus = createSelector(
    [selectDownloads],
    downloads => downloads.bookmarkStatus
)