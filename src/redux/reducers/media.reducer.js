import { mediaTypes } from '../types/media.types';

const DEFAULT_STATE = {
  documentaries: {
    interest: [],
    focus: [],
    all: []
  },
  glance: [],
  loading: false,
  error: null
}

const mediaReducer = (state = DEFAULT_STATE, action ) => {
  switch(action.type)  {
    case mediaTypes.FETCH_DOCUMENTARIES_START:
    case mediaTypes.FETCH_GLANCE_START:
      return {
        ...state,
        loading: true,
      }
      case mediaTypes.FETCH_DOCUMENTARIES_SUCCESS:
        return {
          ...state,
          loading: false,
          documentaries: {
            ...state.documentaries,
            all: action.payload
          }
        }
      case mediaTypes.SET_FOCUS:
        return {
          ...state,
          documentaries: {
            ...state.documentaries,
            focus: state.documentaries.all.slice(0, 2)
          }
        }
        case mediaTypes.FETCH_GLANCE_SUCCESS:
          return {
            ...state,
            loading: false,
            glance: action.payload.audio
          }
        case mediaTypes.FETCH_DOCUMENTARIES_FAILED:
        case mediaTypes.FETCH_GLANCE_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload.err
          }
    default:
      return state;
  }
}

export default mediaReducer
