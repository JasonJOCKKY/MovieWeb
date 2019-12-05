# Report

## Link to Running Code
[https://hackweekgroup70.web.app](https://hackweekgroup70.web.app)

## Introduction
We are Group 70. This group is comprised of Weiyu Feng, Jingsong Tan, and Joseph Vitale. For our project, we created a movie search and review website using Angular, Firestore, Firebase OAuth, Material, Bootstrap, and The Movie Database (TMDb) API. 

To use the app, navigate to the link given above. At the home page, you can choose to search for a film, which can be done in one of three ways: search by title, explore based off criteria (genre, rating, year), and find movies by popularity. You may also decide to login or sign up (in the header bar). You may also view the About Us page for more information about the developers of the app. After a search, results will dynamically generate on the page. You can select one of the results to view a quick preview of the film and decide to view more information or continue searching. 

If you decide to view more information, you will be taken to a movie details page. There you are able to view more information about the film. If you are logged-in, you can also leave a review for the film or make a reply to an existing review. If you have not logged-in, and you attempt to review or reply, instead you will be prompted to login. 

If you login, reviews and replies will contain your username (or display name if you login through Google). By selecting your username in the header, you may also choose to view your profile page or logout. Viewing your profile will allow you to view a list of all reviews you have ever left. 

## Problem
Nowadays there are so many movies available for us to watch at our fingertips, that it often becomes difficult to decide on which film to choose. Other sites are hard to use, unintuitive, or cluttered with ads. There needs to be an easier and simpler way for people to search and filter through movies and decide if it is worth their time. 

Also, when deciding to watch a film or not, often the film's title and synopsis are not enough information to base a decision off of. Often a more useful piece of information for films is reviews from other people. We want to create a way that allows users to efficiently search for movies and view information and reviews of these films in order to determine if it will fit their preferences. Other sites have similar review options, but many lacked the feature to reply to a review, which can yeild even more information about a film by encouraging community participation and debate.  

## Solution
To solve this problem, we have devided to create a website that facilitates searching for movies, viewing information about the film, and leaving reviews. 

There should be a search page which will allow a user to search for films in three different ways: search by title, find movies by popularity, or explore by genre, year, and rating (e.g. PG, R, etc.). Users should be able to view a quick preview of a film from the search results (which are generated dynamically), and can choose to view more information about the film or continue searching. 

If they choose to view more information for a film, they will be able to see details about that film as well as any reviews left by users. Logged-in users should also be able to leave a review on this page, as well as reply to other reviews. The reply feature will provide even more information for users as it will enable discussion and allow for debates.  

There should also be a login feature. A logged-in user should be able to view a list of all reviews they have left. 

## Implementation
### Technologies
To build the website, we decided to use Angular, as we are all familiar with the framework as well as for its ability to quickly and easily create dynamic web applications. Angular also made it easy to neatly seperate our code into front-end components and back-end services. This aided collaboration and allowed us to develop different components of the app simultaneously. For reference, we used the official angular documentation (https://angular.io/docs).

Typescript was used for communication between front-end components and services as well as between the services and back-end components (API calls, storing and retrieving data from Firebase, Firebase authentication). 

On top of HTML and CSS, we styled the front-end using Angular Material which allowed us to quickly build functional, responsive, and professional-looking UI components. The official documentation (https://material.angular.io/) was extremely helpful.

Bootstrap was also used for the front-end for quick, professional, and responsive styling. The official documentation (https://getbootstrap.com/docs/4.1/getting-started/introduction/) was also helpful here.

To get movie data, we used the API for The Movie Database (TMDb). It allows us to search for data in our desired manner (search by title, explore by genre/certification/year, and find popular movies). The API is fully documented (https://www.themoviedb.org/documentation/api) which made it easy to implement. 

To store review data and user information, we used a Firebase Firestore database, as it is well-designed for connecting to Angular apps, especially with the help of this documentation (https://github.com/angular/angularfire/tree/master/docs/firestore). Additionally, Firebase was used to host the application.

To authorize users, we used Firebase OAuth which we use to allow users to sign-up using either an email and password or their Google account. The official documentation (https://angularfirebase.com/lessons/angular-firebase-authentication-tutorial-oauth/) was used.

### Who Implemented What
Jingsong Tan:
  * API calls (TMDB)
  * Movie details page, add-review component, add-reply component. (Angular Material, Bootstrap) 
  * General website styling. (Angular Material, Bootstrap)
  
Weiyu Feng:
  * Movie details page, add-review component (Angular Material, Bootstrap)
  * Authentication service. (Firebase OAuth)
  * Review and reply services. (Firestore)
  
Joseph Vitale:
  * Search page, preview component, profile page (Angular, Material)
  * User service (Firestore, typescript)
  * Auth guard (Firebase OAuth, typescript)

### Where to Look for Grading Purposes
**Consistent Design and User Experience** 

The application has a consistent font and color scheme. Similar Material UI components and Bootstrap were used to build the front-end components in order to give everything a cohesive and consistent look. Additionally, every main page (home, details, profile) shares the header bar, which allows a user to login, logout, navigat to profile page, or redirect to the home page. 

The flow of site navigation is very intuitive. The search page generates results. By clicking on a result you view a preview modal (Material dialog) for a film result. From the preview modal, you can choose to navigate to the details page or continue searching. At the details pagem, the user may view informaiton, leave a review, or make a reply. If the user has not logged-in and tries to make a review or reply, they are prompted to do so. A user can also login at anytime through the login option in the header bar. When they are done viewing movie information, reviewing, or replying, they can navigate back home by clicking the home icon on the header bar or navigate to their profile page by selecting the option "View Profile" which appears by selecting their username in the header bar.

The search page changes based on the tab selected (search by title, explore, find popular). Also, depending on the search method and input entered, the page is populated with different movie results. The preview and details page show information specific to the selected film. The profile page also only shows information specific to the current, logged-in user.

**Well-Structured**

All interfaces, which are used in many components and services, are all defined in one file, type.ts. Therefore, if one component needs to alter an interface due to an unforeseen need, it automatically updates all other components so they are all compatible without needing to go through each component that uses the interface and changing it manually. 

The header bar, which is present on everypage, is its own component (/Components/header-bar) with its own .ts, .html, and .css files. We display this component along with the root component on every page. This way, the root can change based on the routing module, while the header remains constantly rendered at the top of the page.

Back-end code is organized into three services for the three main functionalities (API calls, user authentication, and movie reviews). 

Front-end components are organized into two folders, Pages for main pages (home page, details page, profile page) and Components for smaller page components (headers, modals, dialogs). 

**Authentication**

Our app implements the auth guard as shown in the "Grade Distribution App" class example. There is private content. A user must be logged-in to leave a review, make a reply, or view their profile page. If they are viewing their profile page and logout, they are redirected to the homepage and cannot navigate back. There is also public content. A user does not need to be logged-in the search films or view movie information. 

There are visual cues as well. If they are not logged-in, the header bar has a 'login' button. If they are logged-in, the header bar displays their username.

A user can logout by selecting their username in the header bar, then selecting "Sign Out" when the option appears.

If a user logs in, but then logs out, they will not be able to review, reply, or view their profile page.

**Architecture**

Our code is organized according to Model-View-Controller architecture. 

The M, model, is the database API and our Firebase Firestore database. These two entities together store the data on films, reviews, replies, and users.

Our Angular services act as the controllers which take data from the model and supply it to our View (the front-end components).

The View, our Angular front-end components, are organized into Pages and Components. Main page components (home page, details page, and page-not-found page) are organized into the Pages directory. Components for modals and headers are organized into the Components directory. The front-end gets data from the controller and decides how to present it on the website. The front-end never directly communicates with the model, and always goes through the controller to get data.

We use Angular and utilize services and define all our interfaces in the type.ts file.

**Persistent**

Users can register accounts and leave reviews or replies on the site. Data for registered users and reviews are stored persistently using Firebase's Firestore. User authentication information is stored persistently using Firebase OAuth. 

A user can sign-up, leave a review, or make a reply (save data). The user stays logged-in and the reviews and replies remain even after a refresh. After a log out, they can login again (load data). Also, when they navigate to their profile page, their review data is loaded onto the page. 

**Security**

Our site uses HTTPS and has a valid SSL certificate, which can be proven by the secured symbol in the browser's URL. 

We use Firebase OAuth to store sensitive user information such as passwords. We use an Auth Guard so that only logged-in users can view their profile page and leave a review. The profile page cannot be URL-hacked because it checks that a user is authenticated and logged-in.

All of our form inputs utilize a FormControl with Validators to ensure valid input before submission. These can be seen in the components for home-page, review-component, reply-component, and login-component. 

**Responsive**

We used Bootstrap and Angular Material UI Components to create the front-end. Using these made it very easy to create an user interface that looks presentable on all window sizes. The site looks presentable on all screen sizes.

**Content**

We get movie data from a large movie database (TMDb). We call the database's API to retireve this data, which is later displayed on the site.

We also collect user input. A user can register an account, leave a review on a film, or make a reply to a review. We have left some sample reviews and replies which can be seen under the film Frozen (not the sequel), which can be found by searching "Frozen" under the search by title option. (Note: The film Frozen II may not have any available reviews). 

There is also a test user. To login, select login, then login by email. The email for this user is 'test100@test.com' and the password is 'password'. This user should also have left some reviews, which can be viewed under their profile page. 

**Error Handling**

All of our form inputs utilize a FormControl with Validators to ensure valid input before submission. Error messages are showns dynamically using <mat-error> tags. There are form inputs on the following pages and components:
  Search page (/home): Form inputs under search by title and explore films tabs.
  Details page (/details/:movieID): Form inputs under 
 
 If a user enters incorrect login information, they are given a popup message "Unable to login".

**Publicly Viewable**

Our app is publically available on a Firebase server. The app can be viewed by navigating the to link provided above.

**Overall Purpose**

This application serves a clear overall purpose, and is very practical and useful. The purpose is described in the Problem and Solution sections of this report.

There is also an About US page on the site, which can be found under the "About Us" tab on the home page where you can view information about the team and the application.

## Knowledge Gained

In developing this app, we gained a lot of knowledge over API calls, Firestore, Firebase OAuth, and Angular Material. We learned how to handle data retireved from an API asyncronously using RxJS Observables and Promises. We learned how to structure and handle data in a NoSQL, document-based database by utilizing collections and nesting. We learned how to keep track on if a user is logged in and authorized and limit access to certain areas on the site using an Auth Guard. We learned about many Material UI Components to quickly create a highly functional user interface.

## Future Work

Our app is responsive and looks presentable on all devices, however if we had more time, we would ideally develop mobile apps of iOS and Android. 

We would add a responsive chart for a film's rating.

We would also like to add a feature on the website that allows users to search by cast or crew member. 

## References

Angular. (n.d.). Angular Material. Retrieved December 2, 2019, from https://material.angular.io/.

Angular Firebase Authentication Tutorial - OAuth. (n.d.). Retrieved December 2, 2019, from https://angularfirebase.com/lessons/angular-firebase-authentication-tutorial-oauth/.

angular/angularfire. (2019, May 21). Retrieved December 2, 2019, from https://github.com/angular/angularfire/tree/master/docs/firestore.

Get started with Bootstrap. (n.d.). Retrieved December 2, 2019, from https://getbootstrap.com/docs/4.1/getting-started/introduction/.

Introduction to the Angular Docs. (n.d.). Retrieved December 2, 2019, from https://angular.io/docs.

The Movie DB - API Overview. (n.d.). Retrieved from https://www.themoviedb.org/documentation/api.

