import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../Services/authentication.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.currentUser.pipe(
      take(1),
      map(user => {
        if (!!user) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    );
  }
  
}
