import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done';
import React from 'react';
import PersonPin from '../svgs/personPin';

import withGeolocation from '../hocs/withGeolocation';
import { COLORS } from '../theme';

const ButtonStyle = {
  position: 'absolute',
  bottom: '75px',
  right: '75px',
};

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
)(({
  latitude, longitude, markers, canPost, addMarker,
}) => {
  const LabelStyle = {
    color: canPost ? COLORS.alternateTextColor : COLORS.alternateTextColor,
  };

  const PersonPinSVG = {
    ...PersonPin,
    fillColor: canPost ? COLORS.accent1Color : COLORS.primary1Color,
    strokeColor: canPost ? COLORS.accent1Color : COLORS.primary1Color,
    fillOpacity: 1,
  };

  return (
    <GoogleMap
      defaultZoom={15}
      center={{ lat: latitude, lng: longitude }}
      onClick={payload => addMarker(payload)}
    >
      <Marker
        position={{ lat: latitude, lng: longitude }}
        title="Jesteś tutaj"
        animation={window.google.maps.Animation.DROP}
        icon={PersonPinSVG}
      />
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {markers.map(coords => (
          <Marker
            position={{ lat: Number(coords.latitude), lng: Number(coords.longitude) }}
            key={coords.id}
          />
          ))}
      </MarkerClusterer>
      <FlatButton
        label={canPost ? 'Zgłoś zanieczyszczenie w swojej okolicy' : 'Dziękujemy za zgłoszenie!'}
        labelPosition="after"
        backgroundColor={canPost ? COLORS.accent1Color : COLORS.primary1Color}
        hoverColor={canPost ? COLORS.primary1Color : COLORS.accent1Color}
        labelStyle={LabelStyle}
        style={ButtonStyle}
        onClick={() => addMarker({ lat: latitude, lng: longitude })}
        icon={canPost ? <ContentAdd /> : <ActionDone />}
        disabled={!canPost}
      />
    </GoogleMap>
  );
});

export default MyMapComponent;
