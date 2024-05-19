import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS, HttpErrorResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {LoginService} from './login.service';
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private login: LoginService,
              private router: Router,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add the jwt token (localStorage) request
    let authReq = req;
    const token = this.login.getToken();
    console.log('inside interceptor');

    if (token != null) {
      authReq = authReq.clone({
        setHeaders: {Authorization: `Bearer ${token}`},
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if (error.status === 401 || error.status === 0) {
          // Token expired or unauthorized request
          console.log("inside");
          this.login.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      }));
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
