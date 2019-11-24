import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Reviews } from 'src/type';
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

  createMovieReview(data: Reviews, movieID: string){
    this.movieReviewCollection.doc(movieID).set(data);
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
    this.movieReviewDocument = this.afs.doc<Reviews>(movieID);
    this.movieReviews = this.movieReviewDocument.valueChanges();
    return this.movieReviews;
  }

}
