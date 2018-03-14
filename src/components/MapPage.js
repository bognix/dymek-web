/* eslint react/jsx-filename-extension: "off" */

import React from 'react';


import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';

import MarkersList from './MarkersList';
import BottomDrawer from './BottomDrawer';
import MarkersFilters from './MarkersFilters';
import withGeolocation from '../hocs/withGeolocation';
import PersonPin from '../svgs/personPin';
import { COLORS } from '../theme';

const PersonPinSVG = {
  ...PersonPin,
  fillColor: COLORS.accent1Color,
  strokeColor: COLORS.accent1Color,
  fillOpacity: 1,
};

const MapPage = ({ latitude, longitude }) => (
  <GoogleMap
    defaultZoom={15}
    center={{ lat: latitude, lng: longitude }}
  >
    <Marker
      position={{ lat: latitude, lng: longitude }}
      title="Jesteś tutaj"
      animation={window.google.maps.Animation.DROP}
      icon={PersonPinSVG}
    />
    <MarkersFilters />
    <MarkersList latitude={latitude} longitude={longitude} />
    <BottomDrawer latitude={latitude} longitude={longitude} />
  </GoogleMap>
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
