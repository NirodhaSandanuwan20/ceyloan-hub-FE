import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  isAdmin ;
  user = null;
  role;

  constructor(public login: LoginService,
              private navbarService: NavbarService
              ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.checkUser();


    });
  }

  public logout() {

    this.login.logout();
    window.location.reload();
    /*this.login.loginStatusSubject.next(false);*/

  }


  checkUser() {
    this.role = this.login.getUserRole();

    console.log(this.role);

    if (this.role === 'NORMAL' || this.role === null ) {
      this.isAdmin = false;
    }
    if (this.role === 'ADMIN' ) {
      this.isAdmin = true;
    }
  }

  get showNavbar(): boolean {
    return this.navbarService.getShowNavbar();
  }

}
