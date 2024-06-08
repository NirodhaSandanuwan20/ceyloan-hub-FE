import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {NavbarService} from '../../services/navbar.service';
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../../services/auth.service";

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
  show: boolean = false;
  notificationCount: number = 0;
  menuOpen = false;


  constructor(public login: LoginService,
              private navbarService: NavbarService,
              private notificationService: NotificationService,
              private router: Router,
              private authService: AuthGuard
              ) { }

  ngOnInit(): void {
    this.authService.logout$.subscribe(() => {
      this.isLoggedIn = false;
    });
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
      this.checkUser();


    });
    this.notificationService.currentCount.subscribe(count => {
      this.notificationCount = count;
    });
  }

  hidden = false;

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  onProfileButtonClick() {
    // Reset the notification count when the profile button is clicked
    this.notificationService.resetNotificationCount();
    this.router.navigate(['/profile'], { queryParams: { openPanel: 'panel1' } });
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

  openDropdown() {
    this.show = !this.show;
  }

}
