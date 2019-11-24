# Report

## Link to Running Code
[link here]

## Introduction
Our group is named Group 70, which is in reference to the UNIX epoch. The members of this group are Weiyu Feng, Jingsong Tan, and Joseph Vitale. For our project, we created a movie review site using Angular, Firebase, Material, and The Movie Database (TMDb) API. As Jingson was the most comfortable with backend, he worked on the Firbase, API, and authentication services as well as the login page. Weiyu and Joseph both worked on the front-end. Weiyu worked on the movie-details and add-review pages. Joseph worked on the home and movie-preview pages.

## Problem
Moviegoers need a good way to decide if a movie is worth their time. Movie reviews are a quick and inexpensive way to determine if a film will meet an individual's preferences. We want to create a way to allow users to easily find movies that fit their specific preferences, as well as leave their own review afterwards. 

## Solution
To solve this problem for moviegoers, we have devided to create a website that facilitates searching for, viewing, and leaving reviews. The search page should allow the user to search by title, explore by genre, certification (PG, PG13, R, etc), or year, or find popular movies. Users should be able to view a quick preview of a film from the search, and can choose to view more information about the fim or continue searching. If they choose to view more information, they will be able to see many details about the movie as well as any reviews left by users. Users should also be able to leave a review on this page, but this feature should be restricted to logged-in registered users.

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
**Well-Structured**
**Authentication**
**Architecture**
**Persistent**
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
