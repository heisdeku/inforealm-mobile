import { DownloadTypes } from '../types/download.types';

export const setDownload = (downloads) => ({
    type: DownloadTypes.SET_DOWNLOAD,
    payload: downloads
})

export const startDownloadLoading = () => ({
    type: DownloadTypes.START_DOWNLOAD_LOADING
})

export const endDownloadLoading = () => ({
    type: DownloadTypes.END_DOWNLOAD_LOADING
})

export const setDownloadError = (errorMessage) => ({
    type: DownloadTypes.SET_DOWNLOAD_ERROR,
    payload: errorMessage
})

export const clearDownloads = () => ({
    type: DownloadTypes.CLEAR_DOWNLOADS
})

export const deleteDownload = (savedDownloads, fileName) => {
    return (dispatch) => {
        const downloadsExists = savedDownloads.find(savedDownload => savedDownload === fileName);
        dispatch(startDownloadLoading());
        dispatch(setDownloadError(''))
        if(downloadsExists){
            const deletedDownload = savedDownloads.filter(savedDownload => savedDownload !== fileName);
            dispatch(setDownload(deletedDownload))
            dispatch(endDownloadLoading())
        }else{
            dispatch(setDownload(savedDownloads))
            dispatch(endDownloadLoading())
        }
    }
}

export const addDownload = (savedDownloads, fileName) => {
    return (dispatch) => {
        const downloadsExists = savedDownloads.find(savedDownload => savedDownload === fileName);
        dispatch(startDownloadLoading());
        dispatch(setDownloadError(''))
        if(downloadsExists){
            dispatch(setDownload(savedDownloads))
            dispatch(endDownloadLoading())
        }else{
            const newDownloads = savedDownloads.push(fileName);
            dispatch(setDownload(newDownloads))
            dispatch(endDownloadLoading())
        }
    }
}