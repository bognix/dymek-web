/* eslint react/jsx-filename-extension: "off" */

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Snackbar from 'material-ui/Snackbar';

import MarkersList from './MarkersList';
import BottomDrawer from './BottomDrawer';
import PersonPin from '../svgs/personPin';
import withGeolocation from '../hocs/withGeolocation';
import { COLORS, COLOR_ERROR } from '../theme';
import MarkersFilters from './MarkersFilters';
import environment from '../relayEnvironment';

const PersonPinSVG = {
  ...PersonPin,
  fillColor: COLORS.accent1Color,
  strokeColor: COLORS.accent1Color,
  fillOpacity: 1,
};


const MapPageQuery = graphql`
  query MarkersListQuery($location: QueryRadius) {
      markers(location: $location, last: 100) @connection(key: "MarkersList_markers", filters: []) {
        edges {
          marker: node {
            createdAt,
            geoJson {
              latitude,
              longitude
            },
            id
          }
        }
      }
  }
`;

class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 0,
      markerTypes: [],
    };
  }

  render() {
    const { latitude, longitude } = this.props;

    return (
      <QueryRenderer
        environment={environment}
        query={MapPageQuery}
        variables={{
          location: {
            latitude,
            longitude,
            radius: 1000,
          },
          userId: this.state.userId,
          markerTypes: this.state.markerTypes,
        }}
        render={({ error, props }) => {
          let markers = [];
          if (props && props.markers && props.markers.edges) {
            markers = props.markers.edges;
          }
          if (error) {
            return (<Snackbar
              open
              message="Nie udało się pobrać znaczników"
              autoHideDuration={4000}
              bodyStyle={{
                backgroundColor: COLOR_ERROR,
              }}
            />);
          } else if (props) {
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
                  <MarkersFilters />
                  <BottomDrawer latitude={latitude} longitude={longitude} />
                  <MarkersList markers={markers} />
                </GoogleMap>
            );
          }
            return <span>Loading</span>;
        }}
      />
    );
  }
}

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
