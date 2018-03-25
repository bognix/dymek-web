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
  tempID += 1;
  console.log('commiting new user....');
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
    },
  );
}

export default { commit };
