import { API as awsApi } from 'aws-amplify';
import { API } from './consts';
import storage from './storage';

export const fetchMarkers = () => awsApi.get(API.NAME, '/api/markers/');

export const postMarker = payload => awsApi.post(API.NAME, '/api/markers/', {
  body: payload,
  headers: {
    'x-dymek-user-id': storage.get('dymek-user'),
  },
});
