import { combineReducers } from 'redux';
import { MARKERS, UI, USER } from '../consts';

const initialMarkersState = {
  list: [],
  meta: {
    total: 0,
  },
  canPost: true,
};

const markersReducer = (state = initialMarkersState, { type, payload }) => {
  switch (type) {
    case MARKERS.FETCH_LIST_SUCCESS:
      return {
        ...state,
        list: payload.items,
        meta: payload.meta,
      };
    case MARKERS.CREATE_SUCCESS:
      return {
        ...state,
        list: [
          payload,
          ...state.list,
        ],
        meta: {
          ...state.meta,
          total: state.meta.total + 1,
        },
        canPost: false,
      };
    default:
      return state;
  }
};


const initialUiState = {
  snackbar: {
    visible: false,
    message: '',
    className: 'is-success',
  },
};

const uiReducer = (state = initialUiState, { type, payload }) => {
  switch (type) {
    case UI.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          visible: true,
          ...payload,
        },
      };
    case UI.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: initialUiState.snackbar,
      };
    default:
      return state;
  }
};

const initialUserState = {
  id: 0,
};

const userReducer = (state = initialUserState, { type, payload }) => {
  switch (type) {
    case USER.SET:
      return {
        ...payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  markers: markersReducer,
  ui: uiReducer,
  user: userReducer,
});
