import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from '../api';
import { MARKERS } from '../consts';
import { fetchMarkersSuccess, fetchMarkersError, postMarkerSuccess, postMarkerError } from '../actions/markers';
import { showSnackbar } from '../actions/ui';
import { COLOR_ERROR, COLOR_SUCCESS } from '../theme';

function* fetchMarkers() {
  try {
    const data = yield call(api.fetchMarkers);
    yield put(fetchMarkersSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchMarkersError(e));
  }
}

function* createMarker({ payload }) {
  try {
    const data = yield call(api.postMarker, payload);
    yield put(postMarkerSuccess(data));
    yield put(showSnackbar, {
      color: COLOR_SUCCESS,
      message: 'Dziękujemy za zgłoszenie dymka!',
    });
  } catch (e) {
    console.error(e);
    yield put(postMarkerError(e));
    yield put(showSnackbar({
      color: COLOR_ERROR,
      message: 'Niestety nie udało Nam się zapisać Twojego zgłoszenia. Spróbuj ponownie.',
    }));
  }
}

function* mySaga() {
  yield takeLatest(MARKERS.FETCH_LIST, fetchMarkers);
  yield takeEvery(MARKERS.CREATE, createMarker);
}

export default mySaga;
