import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { v4 as getId } from 'uuid';
import * as api from '../api';
import { MARKERS, USER } from '../consts';
import { fetchMarkersSuccess, fetchMarkersError, postMarkerSuccess, postMarkerError } from '../actions/markers';
import { showSnackbar } from '../actions/ui';
import { setUser } from '../actions/user';
import { COLOR_ERROR, COLOR_SUCCESS } from '../theme';
import storage from '../storage';

function* fetchMarkers() {
  try {
    const data = yield call(api.fetchMarkers);
    yield put(fetchMarkersSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchMarkersError(e));
    yield put(showSnackbar({
      color: COLOR_ERROR,
      message: 'Niestety nie udało Nam się pobrać pobliskich zanieczyszczeń :( Proszę odśwież stronę.',
    }));
  }
}

function* createMarker({ payload }) {
  try {
    const data = yield call(api.postMarker, payload);
    yield put(postMarkerSuccess(data));
    yield put(showSnackbar({
      color: COLOR_SUCCESS,
      message: 'Dziękujemy za zgłoszenie dymka!',
    }));
  } catch (e) {
    console.error(e);
    yield put(postMarkerError(e));
    yield put(showSnackbar({
      color: COLOR_ERROR,
      message: 'Niestety nie udało Nam się zapisać Twojego zgłoszenia. Spróbuj ponownie.',
    }));
  }
}

function* createUser() {
  const id = getId();
  storage.set('dymek-user', id);
  yield put(setUser({
    id,
  }));
}

function* mySaga() {
  yield takeLatest(MARKERS.FETCH_LIST, fetchMarkers);
  yield takeEvery(MARKERS.CREATE, createMarker);
  yield takeLatest(USER.CREATE, createUser);
}

export default mySaga;
