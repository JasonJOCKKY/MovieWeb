import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { MovieDetailsPageComponent } from './Pages/movie-details-page/movie-details-page.component';
import { LoginComponent } from './Components/login/login.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'details/:movie_id', component: MovieDetailsPageComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
