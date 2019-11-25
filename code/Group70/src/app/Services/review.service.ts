import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reviews, Review } from 'src/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private movieReviewCollection: AngularFirestoreCollection<Reviews>;
  private movieReviewDocument: AngularFirestoreDocument<Reviews>;
  
  private allMovieReviews: Observable<Reviews[]>;

  private movieReviews: Observable<Reviews>;

  constructor(private afs: AngularFirestore) {
    this.movieReviewCollection = this.afs.collection<Reviews>('Group70Movies');
  }

  addMovieReview(data: Reviews, movieID: string){
    let newReview: Review;
    let movieReviews : Reviews = {reviews: []};
    newReview = data.reviews[0];    
    let flag = true;

    console.log("call");
    this.retrieveMovieReviews(movieID).subscribe(reviews => {
      if (reviews && flag) {
        flag = false;
        console.log(reviews);
        movieReviews = reviews;
        movieReviews.reviews.push(newReview);
        this.movieReviewCollection.doc(movieID).set(movieReviews);
      }
      else if(flag) {
        flag = false;
        movieReviews = data;
        this.movieReviewCollection.doc(movieID).set(movieReviews);
      }      
      
      console.log(movieReviews);
    });
  }

  retrieveAllMovieReviews(): Observable<Reviews[]>{

    this.allMovieReviews = this.movieReviewCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Reviews;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    return this.allMovieReviews;
  }

  retrieveMovieReviews(movieID: string): Observable<Reviews>{

    this.movieReviewDocument = this.movieReviewCollection.doc<Reviews>(movieID);
    
    this.movieReviews = this.movieReviewDocument.valueChanges();

    return this.movieReviews;
  }

}
