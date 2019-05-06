import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services';



@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      let currentUser = this.authService.currentUserValue;

      // check if route is restricted by role
      if (route.data.permissions) {
        for (let permission of route.data.permissions) {
          console.log(permission);
          if (!currentUser.grantedActions.includes(permission)) {
            // role not authorised so redirect to home page

            console.log("role not authorized");
            this.router.navigate(['/']);
            return false;
          }
        }
      }

      console.log("role authorized");
      // authorised so return true
      return true;
    }

    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });

    return false;
  }
}