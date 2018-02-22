import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import React from 'react';

import withGeolocation from '../hocs/withGeolocation';

const MyMapComponent = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAOu0YNN7QMQuY-Ki9bK0KwLYN9jVP78nM&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: 'calc(100vh - 64px)' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGeolocation,
  withScriptjs,
  withGoogleMap,
)(({ latitude, longitude, markers }) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: latitude, lng: longitude }}
  >
    {markers.map(coords => (
      <Marker
        position={{ lat: Number(coords.latitude), lng: Number(coords.longitude) }}
        key={coords.id}
      />
    ))}
  </GoogleMap>
));

export default MyMapComponent;
