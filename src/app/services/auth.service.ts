// auth.guard.ts
import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              public login: LoginService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Check if user is logged in (implement your own logic)
    const isLoggedIn = this.login.isLoggedIn();

    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }


  }
}


/*
 else {
      if (state.url === '/specific-action') {
        // Redirect to login page with current URL as a parameter
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

      } else {
        // Redirect to login page for the specific action
        this.router.navigate(['/login']);
      }
      return false;
    }
*/
