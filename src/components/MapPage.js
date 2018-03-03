/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import Snackbar from 'material-ui/Snackbar';
import environment from '../relayEnvironment';
import MarkersList from './MarkersList';
import { COLOR_ERROR } from '../theme';

const MapPageQuery = graphql`
  query MapPageQuery {
      markers(last: 1000000) @connection(key: "MapPage_markers", filters: []) {
        edges {
          marker: node {
            createdAt,
            latitude,
            longitude,
            userId,
            id
          }
        }
      }
  }
`;

export default () => (
  <QueryRenderer
    environment={environment}
    query={MapPageQuery}
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
      return <div>Loading</div>;
    }}
  />
);
