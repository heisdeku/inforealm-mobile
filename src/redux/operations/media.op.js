import axios from 'axios'
import { BASE_URL } from '../../utils/api'

import {
  getDocumentariesStart,
  getDocumentaries,
  getDocumentariesFailed,
  getAudiosStart,
  getAudios,
  getAudiosFailed,
} from '../actions/media.action'

export const fetchDocumentaries = () => {
  return async (dispatch) => {
    dispatch(getDocumentariesStart())
    try {
      let response = await axios.get(`${BASE_URL}/getNewsWithVideo`)
      let { data } = response
      if (
        response.status === 200 &&
        response.status <= 400 &&
        data.status === 'success'
      ) {
        dispatch(getDocumentaries(data.news))
      } else {
        dispatch(getDocumentariesFailed(response.message))
      }
    } catch (e) {
      dispatch(getDocumentariesFailed(e))
    }
  }
}

export const fetchPodcasts = () => {
  return async (dispatch) => {
    dispatch(getAudiosStart())
    try {
      let response = await axios.get(`${BASE_URL}/getNewsWithAudio`)
      let { data } = response
      if (
        response.status === 200 &&
        response.status <= 400 &&
        data.status === 'success'
      ) {
        dispatch(getAudios(data.news))
      } else {
        dispatch(getDocumentariesFailed(response.message))
      }
    } catch (e) {
      dispatch(getAudiosFailed(e))
    }
  }
}
