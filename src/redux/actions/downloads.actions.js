import { DownloadTypes } from '../types/download.types';

export const setDownload = (downloads) => ({
    type: DownloadTypes.SET_DOWNLOAD,
    payload: downloads
})

export const setDownloadArticle = (articles) => ({
    type: DownloadTypes.SET_DOWNLOAD_ARTICLE,
    payload: articles
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

export const clearDownloadArticles = () => ({
    type: DownloadTypes.CLEAR_DOWNLOAD_ARTICLES
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

export const deleteDownloadArticle = (savedArticles, article) => {
    return (dispatch) => {
        const articleExists = savedArticles.find(savedArticle => savedArticle.id === article.id);
        if(articleExists){
            const newArticles = savedArticles.filter(savedArticle => savedArticle.id !== article.id);
            console.log('newArticle', newArticles)
            dispatch(setDownloadArticle(newArticles));
        }else{
            console.log('newArticle', savedArticles)
            dispatch(setDownloadArticle(savedArticles));
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

export const addDownloadArticle = (savedArticles, article) => {
    return (dispatch) => {
        console.log('articleToBeAdded', article);
        const articleExists = savedArticles.find(savedArticle => savedArticle.id === article.id);
        if(articleExists){
            console.log('newArticle', savedArticles)
            dispatch(setDownloadArticle(savedArticles))
        }else{
            const newArticles = savedArticles.push(article);
            console.log('newArticle', newArticles)
            dispatch(setDownloadArticle(newArticles));
        }
    }
}

export const pushArticle = (article) => ({
    type: DownloadTypes.PUSH_DOWNLOAD_ARTICLE,
    payload: article
})

export const popArticle = (article) => ({
    type: DownloadTypes.POP_DOWNLOAD_ARTICLE,
    payload: article
})