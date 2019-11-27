# Report

## Link to Running Code
[link here]

## Introduction
Our group is named Group 70, which is in reference to the UNIX epoch. The members of this group are Weiyu Feng, Jingsong Tan, and Joseph Vitale. For our project, we created a movie review site using Angular, Firebase, Material, Bootstrap, and The Movie Database (TMDb) API. As Jingson was the most comfortable with backend, he worked on the Firbase, API, and authentication services as well as the login page. Weiyu and Joseph both worked on the front-end. Weiyu worked on the movie-details and add-review pages. Joseph worked on the home and movie-preview pages.

## Problem
Nowadays there are so many movies available for us to watch at our fingertips, that it often becomes difficult to decide on which film to choose. There needs to be an easier way for people to search and filter through movies and decide if it is worth their time. On top of this, the title and synopsis of the film is often not enough to base this decision off of. Often a more  useful piece of information for films is reviews from other people. We want to create a way that allows users to efficiently search for movies and view information and reviews of these films in order to determine if it will fit their preferences. On top of this, we want to allow users to leave reviews.  

## Solution
To solve this problem, we have devided to create a website that facilitates searching for movies, viewing information about the film, and leaving reviews. 
The search page should allow the user to search for films in three different ways: search by title, explore by genre, certification (PG, R, etc), or year, or find movies based off popularity. Users should be able to view a quick preview of a film from the search, and can choose to view more information about the fim or continue searching. 
If they choose to view more information for a film, they will be able to see details about that film as well as any reviews left by users. Users should also be able to leave a review on this page, as well as reply to other reviews. The reply feature will provide even more information for users as other users will be able to voice agreement or disagreement with any given review.  
There will also be a login feature. A review left by a logged-in user will contain their username. A review left by a user who is not logged-in will simply say 'left by guest'. A logged-in user should be able to view a list of all reviews they have given. 

## Implementation
### Technologies
To build the website, we used Angular, as we are all familiar with the framework. Angular helped us neatly seperate our code into components and services. This made it easy to develop different aspects of the app simultaneuously. 

Typescript was used for communication between front-end componentsand services as well as between the services and back-end components (API calls, storing and retrieving data from Firebase). 

On top of HTML and CSS, we styled the front-end using Angular Material which allowed us to quickly build functional and professional-looking UI components.

Bootstrap was also used for the front-end for quick, professional styling. 
To get movie data, we used the API for The Movie Database (TMDb). It allows us to search for data in our desired manner (search by title, explore by genre/certification/year, or find popular movies). 

To store review data and user information, we used Firebase, which is good for connecting to an Angular apps. 

To authorize users, we used Angular Firebase Auth. 

An AWS EC2 instance was used to serve the running code. 

### Division of Labor
Jingson implemented the services for the API calls, user authorization, and adding/retrieving reviews. He also implemented the login page. Weiyu implemented the movie-details page and the add-review component. Joseph implemented the search page and the preview component. 

### Grading Criteria
**Consistent Design and User Experience** 
The application has a consisten color scheme. Similar material components are used to build each front-end component. Everypage shares the header bar, which allows a user to login or redirect to the home page. 

**Well-Structured**
All interfaces are defined in one file, type.ts. The header bar, which is present on everypage, is its own component (/Components/header-bar). Back-end code is organized into three services for the three main functionalities (API calls, user authorization, and movie reviews). Front-end components are organized into two folders, Pages (home page, details page) and Components (headers and modals). 

**Authentication**
In order to leave a review, the user must be logged in.

**Architecture**
Our code is organized according to Model-View-Controller architecture. The M, model, is the API and our Firebase database. The View, our front-end components, are organized into pages and components. Main page components (home page, details page, and page-not-found page) are organized into the Pages directory. Components for modals and headers are organized into the Components directory. The Controllers are the services, which are organized into the Services directory. The three services are used to communicate the front-end view components to the model (API and Firebase) which never communicate directly. 

**Persistent**
Users can register and leave reviews on the site. Data for registered users and reviews are stored persistently using Firebase. 

**Provide some Security**

**Responsive**

**Content**

**Error Handling**

**Publicly Viewable**

**Overall Purpose**

## Knowledge Gained
Pointers, knowledge, tricks to inform the rest of the class

## Future Work
What needs to be finished before the due date

## References
