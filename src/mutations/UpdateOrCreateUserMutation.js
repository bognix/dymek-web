import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../relayEnvironment';

const mutation = graphql`
  mutation UpdateOrCreateUserMutation($input: UpdateOrCreateUserInput!) {
    updateOrCreateUser(input:$input) {
      user {
        userId,
        registrationToken
      }
    }
  }
`;

let tempID = 0;

function commit(payload) {
  console.log('....commiting');
  tempID += 1;
  return commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          clientMutationId: tempID,
          registrationToken: payload.token,
        },
      },
      onError: console.error,
      onCompleted: console.log,
    },
  );
}

export default { commit };
