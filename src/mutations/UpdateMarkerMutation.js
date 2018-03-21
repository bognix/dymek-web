import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../relayEnvironment';

const mutation = graphql`
  mutation UpdateMarkerMutation($input: UpdateMarkerInput!) {
    updateMarker(input:$input) {
      markerEdge {
        cursor
        node {
          geoJson {
            latitude,
            longitude
          },
          status
        }
      }
    }
  }
`;

let tempID = 0;

function commit(payload, successCallback, errorCallback) {
  tempID += 1;
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          status: payload.status,
          id: payload.id,
          clientMutationId: tempID,
        },
      },
      onError: args => errorCallback(args),
      onCompleted: args => successCallback(args),
    },
  );
}

export default { commit };
