/* eslint react/jsx-filename-extension: "off" */

import React from 'react';


import { withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';

import MarkersList from './MarkersList';
import BottomDrawer from './BottomDrawer';
import withGeolocation from '../hocs/withGeolocation';

const MapPage = ({ latitude, longitude }) => (
  <div>
    <MarkersList latitude={latitude} longitude={longitude} />
    <BottomDrawer latitude={latitude} longitude={longitude} />
  </div>
);

export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAOu0YNN7QMQuY-Ki9bK0KwLYN9jVP78nM&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '66vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGeolocation,
  withScriptjs,
  withGoogleMap,
)(MapPage);
