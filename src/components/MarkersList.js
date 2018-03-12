/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import Snackbar from 'material-ui/Snackbar';
import { Marker } from 'react-google-maps';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';

import environment from '../relayEnvironment';
import { COLOR_ERROR } from '../theme';

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
        );
      }
      return <div>Loading</div>;
    }}
  />
);

