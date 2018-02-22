import { combineReducers } from 'redux';
import { MARKERS } from '../consts';

const initialMarkersState = {
  list: [],
  meta: {
    total: 0,
  },
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
      };
    default:
      return state;
  }
};

export default combineReducers({
  markers: markersReducer,
});
