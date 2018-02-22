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
    default:
      return state;
  }
};

export default combineReducers({
  markers: markersReducer,
});
