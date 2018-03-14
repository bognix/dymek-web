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
import storage from '../storage';
import { MARKER_TYPES } from '../consts';

const PersonPinSVG = {
  ...PersonPin,
  fillColor: COLORS.accent1Color,
  strokeColor: COLORS.accent1Color,
  fillOpacity: 1,
};

const MapPageQuery = graphql`
  query MapPageQuery($location: QueryRadius, $userId: ID, $types: [String]) {
      markers(location: $location, userId: $userId, types: $types, last: 100) @connection(key: "MapPage_markers", filters: []) {
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

    const { latitude, longitude } = props;

    this.initialMarkerTypes = Object.keys(MARKER_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: {
        ...MARKER_TYPES[type],
        checked: true,
      },
    }), {});

    this.state = {
      queryVariables: {
        location: {
          latitude,
          longitude,
          radius: 1000,
        },
        types: [],
        userId: null,
      },
      markerTypes: this.initialMarkerTypes,
    };

    this.handleUserFilter = this.handleUserFilter.bind(this);
    this.handleTypesFilter = this.handleTypesFilter.bind(this);
  }

  handleUserFilter(isChecked) {
    if (isChecked) {
      this.setState({
        queryVariables: {
          ...this.state.queryVariables,
          userId: storage.get('dymek-user'),
        },
      });
    } else {
      const { userId, ...queryVariables } = this.state.queryVariables;

      this.setState({
        queryVariables,
      });
    }
  }

  handleTypesFilter(isChecked, type) {
    const markerTypes = {
      ...this.state.markerTypes,
      [type]: {
        ...this.state.markerTypes[type],
        checked: isChecked,
      },
    };

    const checkedTypes = Object.keys(markerTypes)
      .filter(markerType => markerTypes[markerType].checked);

    if (checkedTypes.length) {
      this.setState({
        queryVariables: {
          ...this.state.queryVariables,
          types: checkedTypes,
        },
        markerTypes,
      });
    } else {
      const { types, ...queryVariables } = this.state.queryVariables;

      this.setState({
        queryVariables: {
          ...queryVariables,
          types: [],
        },
        markerTypes: this.initialMarkerTypes,
      });
    }
  }

  render() {
    const { latitude, longitude } = this.props;
    const { markerTypes } = this.state;
    const userFilter = !!this.state.queryVariables.userId;

    return (
      <div>
        <MarkersFilters
          onUserChange={this.handleUserFilter}
          userFilter={userFilter}
          markerTypes={markerTypes}
          onTypesChange={this.handleTypesFilter}
        />
        <BottomDrawer latitude={latitude} longitude={longitude} />
        <QueryRenderer
          environment={environment}
          query={MapPageQuery}
          variables={this.state.queryVariables}
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
                  defaultZoom={16}
                  center={{ lat: latitude, lng: longitude }}
                >
                  <Marker
                    position={{ lat: latitude, lng: longitude }}
                    title="Jesteś tutaj"
                    animation={window.google.maps.Animation.DROP}
                    icon={PersonPinSVG}
                  />
                  <MarkersList markers={markers} />
                </GoogleMap>
            );
          }
            return <span>Loading</span>;
        }}
        />
      </div>
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
