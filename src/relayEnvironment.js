import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';
import storage from './storage';

function fetchQuery(
  operation,
  variables,
) {
  return fetch(process.env.REACT_APP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-dymek-user-id': storage.get('dymek-user'),
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then(response => response.json())
    .then((json) => {
      if (json.errors) {
        return Promise.reject(json.errors);
      }
      return Promise.resolve(json);
    });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
