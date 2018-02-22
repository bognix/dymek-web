import { MARKERS } from '../consts';

export const fetchMarkersSuccess = ({ items, meta }) => ({
  type: MARKERS.FETCH_LIST_SUCCESS, payload: { items, meta },
});

export const fetchMarkersError = error => ({
  type: MARKERS.FETCH_LIST_ERROR, payload: error,
});

export const postMarker = (payload) => {
  const { lat, lng } = payload.latLng;

  return {
    type: MARKERS.CREATE,
    payload: {
      latitude: lat(),
      longitude: lng(),
    },
  };
};

export const postMarkerSuccess = payload => ({
  type: MARKERS.CREATE_SUCCESS, payload,
});

export const postMarkerError = error => ({
  type: MARKERS.CREATE_ERROR, error,
});
