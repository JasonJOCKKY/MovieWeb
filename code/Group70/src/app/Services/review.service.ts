import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from 'src/type';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private movieReviewCollection: AngularFirestoreCollection<Review>;
  private movieReviewDocument: AngularFirestoreDocument<Review>;
  
  private allMovieReviews: Observable<Review[]>;

  private movieReview: Observable<Review>;

  constructor(private afs: AngularFirestore) {
    this.movieReviewCollection = this.afs.collection<Review>('Group70Movies');
  }

  createMovieReview(data: Review, movieID: number){
    this.movieReviewCollection.doc(movieID.toString()).set(data);
  }

  retrieveAllMovieReviews(): Observable<Review[]>{
    this.allMovieReviews = this.movieReviewCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Review;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.allMovieReviews;
  }

  retrieveMovieReview(movieID: number): Observable<Review>{
    this.movieReviewDocument = this.afs.doc<Review>(movieID.toString());
    this.movieReview = this.movieReviewDocument.valueChanges();
    return this.movieReview;
  }

}
