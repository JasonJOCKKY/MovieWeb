import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { MovieDetailsPageComponent } from './Pages/movie-details-page/movie-details-page.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { AuthGuard } from './Guards/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'details/:movie_id', component: MovieDetailsPageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfilePageComponent, canActivate: [AuthGuard]},
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
