// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD0_tmaK1AcGZHZisTl7u4Ml1Q2Q5_Y_hw",
    authDomain: "hackweekgroup70.firebaseapp.com",
    databaseURL: "https://hackweekgroup70.firebaseio.com",
    projectId: "hackweekgroup70",
    storageBucket: "hackweekgroup70.appspot.com",
    messagingSenderId: "893024218519",
    appId: "1:893024218519:web:4726107e23d616b735a8d2",
    measurementId: "G-5JW3EZQYV6"
  },
  tmdb: {
    apiKey: "59a4d94af159f2d5a71a45127ee989e1",
    url: "https://api.themoviedb.org/3",
    img_baseurl: "https://image.tmdb.org/t/p",
    country: 'US'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
