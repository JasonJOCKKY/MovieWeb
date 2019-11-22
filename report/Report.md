# Report

## Link to Running Code
[link here]

## Introduction
Our group is named Group 70, which is in reference to the UNIX epoch. The members of this group are Weiyu Feng, Jingsong Tan, and Joseph Vitale. For our project, we created a movie review site using Angular, a movie database API, and Firebase. Jingson was the most comfortable with backend, so he worked on the Firbase and API code. Weiyu and Joseph split the front-end work. Weiyu worked on the login and movie details page. Joseph worked on the home and preview page. 

## Problem
We want to create a website that allows people to search for a movie, view movie information, and leave a review. We will need a way to store information, such as reviews. We want the app to only allow logged in users to leave reviews, although anyone will be able to view them. 

## Solution
To accomplish this we will need access to a movie database that has the up-to-date information on movies. We found an API for The Movie Database that will allow us to search by title to retrieve a set of movie information. We will also need a databse to store the reviews for the films. We have decided to use Firebase for this. We also want to limit reviews to logged-in users. To login and authorize users, we used Angular Firebase Authentication. To style the website, we used Angular Material components and CSS> 

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
