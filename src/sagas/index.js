import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMarkers as fetchMarkersApi } from '../api';
import { MARKERS } from '../consts';

function* fetchMarkers() {
  try {
    const { items, meta } = yield call(fetchMarkersApi);
    yield put({ type: MARKERS.FETCH_LIST_SUCCESS, payload: { items, meta } });
  } catch (e) {
    console.error(e);
    yield put({ type: MARKERS.FETCH_LIST_ERROR, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(MARKERS.FETCH_LIST, fetchMarkers);
}

export default mySaga;
