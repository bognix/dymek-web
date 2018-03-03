import {
  commitMutation,
  graphql,
} from 'react-relay';

import { ConnectionHandler } from 'relay-runtime';

import environment from '../relayEnvironment';

const mutation = graphql`
  mutation CreateMarkerMutation($input: CreateMarkerInput!) {
    createMarker(input:$input) {
      markerEdge {
        cursor
        node {
          latitude
          longitude
          createdAt
          id
          userId
        }
      }
    }
  }
`;

let tempID = 0;

function commit(payload, errorCallback) {
  tempID += 1;
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          latitude: payload.lat,
          longitude: payload.lng,
          clientMutationId: tempID,
        },
      },
      updater: (store) => {
        const createMarkerField = store.getRootField('createMarker');
        const newMarker = createMarkerField.getLinkedRecord('markerEdge');
        const root = store.getRoot();
        const conn = ConnectionHandler.getConnection(
          root,
          'MapPage_markers',
        );
        ConnectionHandler.insertEdgeAfter(conn, newMarker);
      },
      onError: args => errorCallback(args),
    },
  );
}

export default { commit };
