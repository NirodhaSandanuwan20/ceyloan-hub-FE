import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/services/login.service';
import {NavbarService} from '../../services/navbar.service';
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn;
  isAdmin;
  user = null;
  role;
  show: boolean = false;
  notificationCount: number = 0;
  hidden = false;


  constructor(public login: LoginService,
              private navbarService: NavbarService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.loginDetails();
    this.setNotifications();
    this.user = this.login.getUser();
    this.checkUser();
  }


  private loginDetails() {
    console.log('login details method ');
    this.isLoggedIn = this.login.isLoggedIn();
    console.log(this.isLoggedIn);
  }

  private setNotifications() {
    this.notificationService.currentCount.subscribe(count => {
      this.notificationCount = count;
    });
  }


  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  onProfileButtonClick() {
    // Reset the notification count when the profile button is clicked
    this.notificationService.resetNotificationCount();
    this.router.navigate(['/profile'], {queryParams: {openPanel: 'panel1'}});
  }

  checkUser() {
    this.role = this.login.getUserRole();

    console.log(this.role);

    if (this.role === 'NORMAL' || this.role === null) {
      this.isAdmin = false;
    }
    if (this.role === 'ADMIN') {
      this.isAdmin = true;
    }
  }

  get showNavbar(): boolean {
    return this.navbarService.getShowNavbar();
  }

  get setNavbar(): boolean {
    return this.navbarService.getLoggedIn();
  }

  openDropdown() {
    this.show = !this.show;
  }


}
