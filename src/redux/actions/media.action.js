import { mediaTypes } from '../constants'

export const getDocumentariesStart = () => ({
  type: mediaTypes.FETCH_DOCUMENTARIES_START
})
export const getDocumentaries = (documentaries) => ({
  type: mediaTypes.FETCH_DOCUMENTARIES_SUCCESS,
  payload: documentaries
})

export const getDocumentariesFailed = (err) => ({
  type: mediaTypes.FETCH_DOCUMENTARIES_FAILED,
  payload: err
})


export const getAudiosStart = () => ({
  type: mediaTypes.FETCH_GLANCE_START
})
export const getAudios = (audio) => ({
  type: mediaTypes.FETCH_GLANCE_SUCCESS,
  payload: {
    audio
  }
})

export const getAudiosFailed = (err) => ({
  type: mediaTypes.FETCH_GLANCE_FAILED,
  payload: err
})


export const setFocus = () => ({
  type: mediaTypes.SET_FOCUS
})
