/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Snackbar from 'material-ui/Snackbar';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import { GoogleMap, Marker } from 'react-google-maps';


import environment from '../relayEnvironment';
import { COLOR_ERROR, COLORS } from '../theme';
import MarkersFilters from './MarkersFilters';
import PersonPin from '../svgs/personPin';

const PersonPinSVG = {
  ...PersonPin,
  fillColor: COLORS.accent1Color,
  strokeColor: COLORS.accent1Color,
  fillOpacity: 1,
};

const MarkersListQuery = graphql`
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

export default ({ latitude, longitude }) => (
  <QueryRenderer
    environment={environment}
    query={MarkersListQuery}
    variables={{
      location: {
        latitude,
        longitude,
        radius: 1000,
      },
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
            <MarkerClusterer
              averageCenter
              enableRetinaIcons
              gridSize={60}
            >
              {markers.map(item => (
                <Marker
                  position={
                  {
                    lat: Number(item.marker.geoJson.latitude),
                    lng: Number(item.marker.geoJson.longitude),
                  }
                }
                  key={item.marker.id}
                />
            ))}
            </MarkerClusterer>
          </GoogleMap>
        );
      }
      return <div>Loading</div>;
    }}
  />
);

