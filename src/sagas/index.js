import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import * as api from '../api';
import { MARKERS } from '../consts';
import { fetchMarkersSuccess, fetchMarkersError, postMarkerError, postMarkerSuccess } from '../actions/index';

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
  } catch (e) {
    console.error(e);
    yield put(postMarkerError(e));
  }
}

function* mySaga() {
  yield takeLatest(MARKERS.FETCH_LIST, fetchMarkers);
  yield takeEvery(MARKERS.CREATE, createMarker);
}

export default mySaga;
