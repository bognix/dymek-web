import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import AWS_EXPORTS from './aws-exports';

const domain = AWS_EXPORTS;

console.log(domain);

function fetchQuery(
  operation,
  variables,
) {
  return fetch('http://localhost:3000/api/markers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
