// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyD4DmwBjHAIWXVu7lz8jDIPuwEpz3OpNXQ",
    authDomain: "group70-50ea3.firebaseapp.com",
    databaseURL: "https://group70-50ea3.firebaseio.com",
    projectId: "group70-50ea3",
    storageBucket: "group70-50ea3.appspot.com",
    messagingSenderId: "360596105603",
    appId: "1:360596105603:web:54e8110b6af20698856eb6",
    measurementId: "G-ET18K52JH0"
  },
  tmdb: {
    apiKey: "59a4d94af159f2d5a71a45127ee989e1",
    url: "https://api.themoviedb.org/3",
    img_baseurl: "https://image.tmdb.org/t/p/",
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
