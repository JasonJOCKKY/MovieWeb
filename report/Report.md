# Report

## Link to Running Code
[link here]

## Introduction
Our group is named Group 70, which is in reference to the UNIX epoch. The members of this group are Weiyu Feng, Jingsong Tan, and Joseph Vitale. For our project, we created a movie review site using Angular, Firebase, Material, and The Movie Database (TMDb) API. As Jingson was the most comfortable with backend, he worked on the Firbase, API, and authentication services as well as the login page. Weiyu and Joseph both worked on the front-end. Weiyu worked on the movie-details and add-review pages. Joseph worked on the home and movie-preview pages. We all met up on a few occassions to merge all our code together. 

## Problem
Movie-goers need a good way to decide if a movie is worth their time. Movie reviews are a quick and inexpensive way to determine if a film will meet an individual's preferences. We want to create a site that facilitates searching for, viewing, and leaving reviews to help audiences make better movie-watching decisions. The search feature should allow the user to search by title, explore by genre, certification (P, PG, R, etc), or year, and find popular movies. Users should be able to view a quick preview of the film, and can choose to view more information or keep searching. If they choose to view more information, they will be able to see details about the movie as well as any reviews. Users should be able to leave a review on this page, but this should be restricted to logged in users.

## Solution
To build the website, we used Angular, as we are all familiar with the framework. Angular also made it relatively easy to organize our code in similiar ways, which made merging code together much easier.
For the front-end design, we used Angular Material to quickly build functional and professional-looking UI components, as well as Bootstrap for quick, professional styling. 
To get movie data, we used the API for The Movie Database (TMDb). It will allow us to search for data in our desired manner (search by title, explore by genre/certification/year, or find popular movie). 
To store review data and user information, we used Firebase, which is good for connecting to an Angular apps.
To authorize users, we used Angular Firebase Auth. 

## Implementation
Talk about the technologies you used, how you used them, who implemented what, What and where we should look for grading purposes, what do you want to show off in terms of hard work, what are you proud of that you accomplished, show us where you did good work
### Angular
We used Angular 8 to organize and seperate our code neatly into components. We all used this, which made it easy to collaborate and build onto eachothers code. 
### Typescript
We used typscript to communicate the front-end to the backend and dynamically present content. We all worked with Typescript. Jingsong used it to make the API calls, access Firebase storage, and create the services. Joseph and Weiyu used typescript to call these functions from the services into their components. For example, typescript was used by a service to retrieve and parse a JSON object of movies from the API, then another typescript function retrieves the movie objects from that service and uses an ngFor to display the movies on the home page. 
## Angular Material
Angular Material UI components were used to quickly create professional-looking front-end. Joseph and Weiyu used this technology to contruct their front-end components.
### Firebase
Firebase was used for the database to make the application persistent. Firestore was used as it is the recommended database to use. Jingsong used Firebase to store user information and movie reviews. 
### Amazon Web Services EC2
An AWS EC2 instance was used to serve the running code. 

## Knowledge Gained
Pointers, knowledge, tricks to inform the rest of the class

## Future Work
What needs to be finished before the due date

## References

## Grading Criteria
### Consistent Design and User Experience  
The pages/sections that make up the web application must have a consistent design/interface. There should be elements of each page/section that they share in common such as a header, menu, footer, etc. You have flexibility in how you implement your design, but it should not just be a random set of page/section designs. The user should have a consistent and understandable experience when moving from page to page, section to section, or application function to application function.
The UI must utilize multiple pages and at least one of the pages should have the contents of the page changed based on the application state.
Having a dynamic page not just static pages 

### Well-Structured 
### Authentication 
### Architecture
### Persistent 
### Provide some Security
### Responsive 
### Content
### Error Handling
### Publicly Viewable 
### Overall Purpose
