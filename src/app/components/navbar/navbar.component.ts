import {Component, HostListener, OnInit} from '@angular/core';
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
  userId: number;


  constructor(public login: LoginService,
              private navbarService: NavbarService,
              private notificationService: NotificationService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.loginDetails();
    this.checkUser();
    this.loadNewNotifications();
  }


  loadNewNotifications(): void {
    this.notificationService.getNewNotifications(this.user.id).subscribe((data: any) => {
      this.notificationCount = data.length;
    });
  }


  private loginDetails() {
    console.log('login details method ');
    this.isLoggedIn = this.login.isLoggedIn();
    console.log(this.isLoggedIn);
  }



  onProfileButtonClick() {
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
