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
      markers {
        latitude,
        longitude,
        id
      }
  }
`;

export default () => (
  <QueryRenderer
    environment={environment}
    query={MapPageQuery}
    render={({ error, props }) => {
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
        return <MarkersList markers={props.markers} />;
      }
      return <div>Loading</div>;
    }}
  />
);
