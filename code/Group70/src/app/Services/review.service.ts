import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Review } from 'src/type';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private movieReviewCollection: AngularFirestoreCollection<Review>;

  constructor(private afs: AngularFirestore) {
    this.movieReviewCollection = this.afs.collection<Review>('Group70Movies');
  }

  createMovieReview(data: Review, movieID: number){
    this.movieReviewCollection.doc(movieID.toString()).set(data);
  }

}
