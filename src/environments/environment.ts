import { SocketIoConfig } from 'ngx-socket-io';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const config: SocketIoConfig = { url: 'https://socket-chile.herokuapp.com', options: {} };

export const environment = {
  production: false,
  url: 'http://localhost:5000/demoangular2-23117/us-central1',
  firebase: {
    apiKey: 'AIzaSyDb0-bPeoi97Y9lvJ6FgOPOtuj99y-kLFs',
    authDomain: 'demoangular2-23117.firebaseapp.com',
    databaseURL: 'https://demoangular2-23117.firebaseio.com',
    projectId: 'demoangular2-23117',
    storageBucket: 'demoangular2-23117.appspot.com',
    messagingSenderId: '994448082987',
    appId: '1:994448082987:web:e3a0f3712bcc1a46fcc26e'
  },
  socketConfig: config
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
