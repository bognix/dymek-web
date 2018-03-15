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

import MapPageStyles from './MapPage.sass';

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

    this.initialMarkerTypes = Object.keys(MARKER_TYPES).reduce((acc, type) => ({
      ...acc,
      [type]: {
        ...MARKER_TYPES[type],
        checked: true,
      },
    }), {});

    this.state = {
      queryVariables: {
        types: [],
        userId: null,
        location: {
          radius: 1000,
          latitude: props.latitude,
          longitude: props.longitude,
        },
      },
      markerTypes: this.initialMarkerTypes,
      center: {
        latitude: props.latitude,
        longitude: props.longitude,
      },
    };

    this.handleUserFilter = this.handleUserFilter.bind(this);
    this.handleTypesFilter = this.handleTypesFilter.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.map = null;
  }

  componentWillReceiveProps({ latitude, longitude }) {
    const { queryVariables } = this.state;
    this.setState({
      queryVariables: {
        ...queryVariables,
        location: {
          latitude,
          longitude,
          radius: queryVariables.location.radius,
        },
      },
      center: { latitude, longitude },
    });
  }

  onDrag() {
    const latitude = this.map.getCenter().lat();
    const longitude = this.map.getCenter().lng();
    const { queryVariables } = this.state;
    this.setState({
      queryVariables: {
        ...queryVariables,
        location: {
          ...queryVariables.location,
          latitude,
          longitude,
        },
      },
      center: {
        latitude, longitude,
      },
    });
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
    const { queryVariables, markerTypes: currentMarkerTypes } = this.state;
    const markerTypes = {
      ...currentMarkerTypes,
      [type]: {
        ...currentMarkerTypes[type],
        checked: isChecked,
      },
    };
    const checkedTypes = Object.keys(markerTypes)
      .filter(markerType => markerTypes[markerType].checked);

    if (checkedTypes.length) {
      this.setState({
        queryVariables: {
          ...queryVariables,
          types: checkedTypes,
        },
        markerTypes,
      });
    } else {
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
    const { markerTypes, center } = this.state;
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
        <GoogleMap
          defaultZoom={16}
          options={{ fullscreenControl: false, minZoom: 12 }}
          center={{ lat: center.latitude, lng: center.longitude }}
          onDragEnd={this.onDrag}
          ref={(map) => { this.map = map; }}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            title="Jesteś tutaj"
            animation={window.google.maps.Animation.DROP}
            icon={PersonPinSVG}
          />

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
                return <MarkersList markers={markers} />;
            }
              return <span className={MapPageStyles.loader}>Loading</span>;
          }}
          />
        </GoogleMap>

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
