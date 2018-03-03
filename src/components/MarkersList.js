/* eslint react/jsx-filename-extension: "off" */

import React, { Component } from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDone from 'material-ui/svg-icons/action/done';
import Snackbar from 'material-ui/Snackbar';

import PersonPin from '../svgs/personPin';
import withGeolocation from '../hocs/withGeolocation';
import CreateMarkerMutation from '../mutations/CreateMarkerMutation';
import { COLOR_SUCCESS, COLORS, COLOR_ERROR } from '../theme';

const ButtonStyle = {
  position: 'absolute',
  bottom: '75px',
  right: '75px',
};

class MarkersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: false,
      error: false,
    };
    this.addMarker = this.addMarker.bind(this);
    this.onSnackbarClosed = this.onSnackbarClosed.bind(this);
  }

  onSnackbarClosed() {
    this.setState({
      saved: false,
      error: false,
    });
  }

  addMarker(payload) {
    CreateMarkerMutation.commit(payload, (error) => {
      if (error) {
        this.setState({ error: true, saved: true });
      }
    }, () => {
      this.setState({ error: false, saved: true });
    });
  }

  render() {
    const { latitude, longitude, markers } = this.props;
    const canPost = true;

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
          {markers.map(item => (
            <Marker
              position={{ lat: Number(item.marker.latitude), lng: Number(item.marker.longitude) }}
              key={item.marker.id}
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
          onClick={() => this.addMarker({ lat: latitude, lng: longitude })}
          icon={canPost ? <ContentAdd /> : <ActionDone />}
          disabled={!canPost}
        />
        <Snackbar
          open={this.state.saved}
          message={this.state.error ? 'Nie udało się zapisać zgłoszenia :( Spróbuj ponownie' : 'Dziękujemy za zgłoszenie!'}
          autoHideDuration={4000}
          bodyStyle={{
            backgroundColor: this.state.error ? COLOR_ERROR : COLOR_SUCCESS,
          }}
          onRequestClose={this.onSnackbarClosed}
        />
      </GoogleMap>
    );
  }
}

export default compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAOu0YNN7QMQuY-Ki9bK0KwLYN9jVP78nM&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: 'calc(100vh - 64px)' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGeolocation,
  withScriptjs,
  withGoogleMap,
)(MarkersList);
