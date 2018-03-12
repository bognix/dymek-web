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
          geoJson {
            latitude,
            longitude
          }
        }
      }
    }
  }
`;

let tempID = 0;

function commit(payload, errorCallback, successCallback) {
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
          type: 'DOOG_POOP',
        },
      },
      updater: (store) => {
        const createMarkerField = store.getRootField('createMarker');
        const newMarker = createMarkerField.getLinkedRecord('markerEdge');
        const root = store.getRoot();
        const conn = ConnectionHandler.getConnection(
          root,
          'MarkersList_markers',
        );
        ConnectionHandler.insertEdgeAfter(conn, newMarker);
      },
      onError: args => errorCallback(args),
      onCompleted: args => successCallback(args),
    },
  );
}

export default { commit };
