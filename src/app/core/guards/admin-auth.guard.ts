import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../authentication';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/admin/login'], {
      queryParams: {
        returnUrl: state.url
      }
    });
    return false;
  }

}