/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import {
  QueryRenderer,
  graphql,
} from 'react-relay';
import environment from '../relayEnvironment';
import MarkersList from './MarkersList';

const MapPageQuery = graphql`
  query MapPageQuery {
      ...MarkersList_markers
  }
`;

export default () => (
  <QueryRenderer
    environment={environment}
    query={MapPageQuery}
    render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>;
          } else if (props) {
            return <MarkersList markers={props.markers} />;
          }
          return <div>Loading</div>;
        }}
  />
);
