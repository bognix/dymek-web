import { API as awsApi } from 'aws-amplify';
import { API } from './consts';

export const fetchMarkers = () => awsApi.get(API.NAME, '/api/markers/');

export const postMarker = payload => awsApi.post(API.NAME, '/api/markers/', {
  body: payload,
});
