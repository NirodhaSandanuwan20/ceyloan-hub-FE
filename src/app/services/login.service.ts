import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import baseUrl from './helper';
import {Router} from "@angular/router";
import {NavbarService} from "./navbar.service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private navbarService: NavbarService,
    private router: Router) {
  }

  //current user: which is loggedin
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token

  public generateToken(loginData: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  //login user: set token in localStorage
  public loginUser(token) {
    localStorage.setItem('token', token);

    return true;
  }

  //isLogin: user is logged in or not
  public isLoggedIn(): boolean {
    console.log('login service method ' + !!localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  // logout : remove token from local storage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.navbarService.setLoggedIn(false);
    this.router.navigate(['/login']);
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole() {
    let user = this.getUser();
    console.log(user.authorities[0].authority);

    return user.authorities[0].authority;
  }
}
