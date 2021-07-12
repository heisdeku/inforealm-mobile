import { createSelector } from 'reselect';

export const selectDownloads = state => state.downloads;

export const selectDownloadsArray = createSelector(
    [selectDownloads],
    downloads => downloads.downloads
);

export const selectDownloadsError = createSelector(
    [selectDownloads],
    downloads => downloads.downloadError
);

export const selectDownloadsLoading = createSelector(
    [selectDownloads],
    downloads => downloads.loading
);