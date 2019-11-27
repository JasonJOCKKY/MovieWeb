import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HeaderBarComponent } from './Components/header-bar/header-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDetailsPageComponent } from './Pages/movie-details-page/movie-details-page.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatProgressBarModule, MatTooltipModule, MatTreeModule, MatButtonToggleModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select'



import { PreviewComponent } from './Components/preview/preview.component'
import { AddReviewComponent } from './Components/add-review/add-review.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { AddReplyComponent } from './Components/add-reply/add-reply.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PageNotFoundComponent,
    HeaderBarComponent,
    MovieDetailsPageComponent,
    PreviewComponent,
    AddReviewComponent,
    LoginComponent,
    ProfilePageComponent,
    AddReplyComponent
  ],
  entryComponents: [
    PreviewComponent,
    LoginComponent,
    AddReviewComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    // NgbModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTreeModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
