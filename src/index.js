/* eslint react/jsx-filename-extension: "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import firebase from 'firebase';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import UpdateOrCreateUserMutation from './mutations/UpdateOrCreateUserMutation';


const AppThemed = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<AppThemed />, document.getElementById('root'));
registerServiceWorker();

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

if ('serviceWorker' in navigator) {
  runtime.register()
    .then((registration) => {
      firebase.initializeApp(config);

      const messaging = firebase.messaging();
      messaging.usePublicVapidKey(process.env.REACT_APP_VAPID_KEY);

      messaging.requestPermission()
        .then(() => {
          console.log('Notification permission granted.');
        })
        .catch((err) => {
          console.log('Unable to get permission to notify.', err);
        });

      messaging.getToken()
        .then((currentToken) => {
          if (currentToken) {
            UpdateOrCreateUserMutation.commit({ token: currentToken });
          } else {
            console.error('No Instance ID token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.error('An error occurred while retrieving token. ', err);
        });

      messaging.onTokenRefresh(() => {
        messaging.getToken()
          .then((refreshedToken) => {
            UpdateOrCreateUserMutation.commit({ token: refreshedToken });
          })
          .catch((err) => {
            console.error('Unable to retrieve refreshed token ', err);
          });
      });

      messaging.useServiceWorker(registration);

      messaging.onMessage((payload) => {
        const options = {
          body: payload.data.body,
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
          },
        };
        registration.showNotification(payload.data.title, options);
      });
    });
}
