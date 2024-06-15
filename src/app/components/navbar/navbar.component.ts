import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {LoginService} from 'src/app/services/login.service';
import {NavbarService} from '../../services/navbar.service';
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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

  @ViewChild('dialogTemplate') dialogTemplate: TemplateRef<any>;

  private dialogRef: MatDialogRef<any>;

  notification: any;


  constructor(public login: LoginService,
              private navbarService: NavbarService,
              private notificationService: NotificationService,
              private router: Router,
              private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.loginDetails();
    this.checkUser();
    this.loadNewNotifications();
  }

  openDialog(): void {
    this.dialogRef = this.dialog.open(this.dialogTemplate, {
      width: '600px',
      maxHeight: '90vh'  // Ensure dialog doesn't exceed viewport height
    });

    this.dialogRef.afterClosed().subscribe(() => {
      this.onDialogClose();
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onDialogClose(): void {
    this.notificationCount = 0;
    for (let i = 0; i < this.notification.length; i++) {
      if(this.notification[i].new == true){
        console.log(i);
        this.markAsRead(this.notification[i].id);
      }

    }
  }


  loadNewNotifications(): void {
    this.notificationService.getNewNotifications(this.user.id).subscribe((data: any) => {
      this.notificationCount = data.length;
      this.notification = data;
      console.log(this.notification);
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markNotificationAsSeen(notificationId).subscribe(() => {
      this.notification = this.notification.filter(notification => notification.id !== notificationId);
    });
  }

  loadAllNotifications(): void {
    this.notificationService.getAllNotifications(this.user.id).subscribe((data: any) => {
      this.notification = data;
    });
  }


  private loginDetails() {
    console.log('login details method ');
    this.isLoggedIn = this.login.isLoggedIn();
    console.log(this.isLoggedIn);
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
