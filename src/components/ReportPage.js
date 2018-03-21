/* eslint react/jsx-filename-extension: "off" */

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Snackbar from 'material-ui/Snackbar';

import MarkerClusters from './MarkerClusters';
import PersonPin from '../svgs/personPin';
import withGeolocation from '../hocs/withGeolocation';
import { COLORS, COLOR_ERROR } from '../theme';
import MarkersFilters from './MarkersFilters';
import environment from '../relayEnvironment';
import storage from '../storage';
import { MARKER_TYPES } from '../consts';
import MarkersList from './MarkersList';

import ReportPageStyles from '../styles/ReportPage.sass';

const PersonPinSVG = {
  ...PersonPin,
  fillColor: COLORS.accent1Color,
  strokeColor: COLORS.accent1Color,
  fillOpacity: 1,
};

const ReportPageQuery = graphql`
  query ReportPageQuery($location: QueryRadius, $userId: ID, $types: [String]) {
      markers(location: $location, userId: $userId, types: $types, first: 100) @connection(key: "ReportPage_markers", filters: []) {
        edges {
          marker: node {
            createdAt,
            geoJson {
              latitude,
              longitude
            },
            id
            type
          }
        }
      }
  }
`;

class ReportPage extends Component {
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
          radius: 0,
          latitude: props.latitude,
          longitude: props.longitude,
        },
      },
      markerTypes: this.initialMarkerTypes,
    };

    this.handleUserFilter = this.handleUserFilter.bind(this);
    this.handleTypesFilter = this.handleTypesFilter.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onMapMounted = this.onMapMounted.bind(this);
    this.onRadiusChanged = this.onRadiusChanged.bind(this);
    this.map = null;
  }

  componentWillReceiveProps({ latitude, longitude }) {
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
    });
  }

  onMapMounted(map) {
    this.map = map;
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
    });
  }

  onRadiusChanged() {
    const radius = window.google.maps.geometry.spherical
      .computeDistanceBetween(
        this.map.getBounds().getNorthEast(),
        this.map.getBounds().getSouthWest(),
      );
    const { queryVariables } = this.state;
    const radiusToSet = Math.ceil(radius / 2.3);

    this.setState({
      queryVariables: {
        ...queryVariables,
        location: {
          ...queryVariables.location,
          radius: radiusToSet,
        },
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
    const { markerTypes } = this.state;
    const userFilter = !!this.state.queryVariables.userId;
    console.log(latitude, longitude, '.....should rerender');

    return (
      <div>
        <MarkersFilters
          onUserChange={this.handleUserFilter}
          userFilter={userFilter}
          markerTypes={markerTypes}
          onTypesChange={this.handleTypesFilter}
        />

        <GoogleMap
          defaultZoom={16}
          options={{ fullscreenControl: false, minZoom: 12, streetViewControl: false }}
          defaultCenter={{ lat: latitude, lng: longitude }}
          onDragEnd={this.onDrag}
          onZoomChanged={this.onRadiusChanged}
          onTilesLoaded={this.onRadiusChanged}
          ref={this.onMapMounted}
        >
          <Marker
            position={{ lat: latitude, lng: longitude }}
            title="Jesteś tutaj"
            animation={window.google.maps.Animation.DROP}
            icon={PersonPinSVG}
          />
          <QueryRenderer
            environment={environment}
            query={ReportPageQuery}
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
                <div>
                  <MarkerClusters markers={markers} />
                  <MarkersList markers={markers} />
                </div>
              );
            }
            return (
              <div className={ReportPageStyles.loader}>
                <i className="fas fa-spinner fa-pulse fa-2x" />
              </div>
            );
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
    containerElement: <div style={{ height: '66vh', position: 'relative' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withGeolocation,
  withScriptjs,
  withGoogleMap,
)(ReportPage);
