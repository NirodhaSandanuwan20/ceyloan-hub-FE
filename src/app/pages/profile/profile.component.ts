import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {LoginService} from 'src/app/services/login.service';
import {ProfileService} from 'src/app/services/profile.service';
import {SelectSubjectService} from 'src/app/services/select-subject.service';
import {FilterSubjectPipe} from './filter-subject.pipe';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';
import {Todo} from "../user/todo-list/Todo";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatAccordion} from "@angular/material/expansion";
import {AuthGuard} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  isExpanded: boolean = true;
  cTitle;
  selectedCategories = [];
  series = [];
  pieChartArray = [];
  pageNumber = 0;
  userId;
  user = null;
  userHistory = [];
  showMoreBtn;
  lineChart;
  usermail;

  todos: Todo[] = [];
  newTodo: string;

  colorSchemePie = {
    domain: ['#3B82F6', '#c0392b']
  };
  colorSchemeLineChart = {
    domain: ['#3B82F6']
  };


  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;


  isEmptyData: boolean;

  notifications: any[] = [];

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private selectSubjectService: SelectSubjectService,
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.user = this.loginService.getUser();
    this.getUserDetails();
    this.getAllSelectedCategories();
    this.route.queryParams.subscribe(params => {
      const openPanel = params['openPanel'];
      if (openPanel === 'panel1') {
        this.panelOpenState = true;
      }
    });
    this.loadNewNotifications();
  }


  loadNewNotifications(): void {
    this.notificationService.getNewNotifications(this.user.id).subscribe((data: any) => {
      this.notifications = data;
      console.log(data)
    });
  }

  loadAllNotifications(): void {
    this.notificationService.getAllNotifications(this.user.id).subscribe((data: any) => {
      this.notifications = data;
    });
  }

  markAsRead(notificationId: number): void {
    this.notificationService.markNotificationAsSeen(notificationId).subscribe(() => {
      this.notifications = this.notifications.filter(notification => notification.id !== notificationId);
    });
    this.ngOnInit();
  }

  getUserDetails(){
    console.log(this.userId);
    this.userService.getUser(this.userId).subscribe((response: any) => {
      console.log(response);
      this.usermail = response.email;
    }, error => {
      console.log(error);
    });
  }

  getAllSelectedCategories() {
    console.log(this.userId);
    this.selectSubjectService.getPaidUserCategory(this.userId).subscribe((response: any) => {
        this.selectedCategories = response;
        console.log(this.selectedCategories);
      },
      (error) => {
        console.log(error);

      }
    );
    console.log('get ALL Selected Categories end point' );
  }


  getHistoryForSubject(cTitle: string) {
    console.log(this.userHistory);
    this.profileService.getHistoryForSub(cTitle, this.userId, this.pageNumber).subscribe((response: any) => {
        console.log('get history for sub' + response);

        if (response.length === 0){
          this.isEmptyData = true;
        }

        if (response.length === 10) {
          this.showMoreBtn = true;
        } else {
          this.showMoreBtn = false;
        }
        response.forEach(p => this.userHistory.push(p));
        this.setAnalyse();
      },
      error => {
        console.log(error);
      });
  }

  setAnalyse() {
    this.series = [];
    let allMarks = 0;
    let length = 0;

    this.userHistory.forEach((p, i) => {
      allMarks += parseInt(p.yourMarks, 10);
      length = i;
      this.series.push({
        name: (i + 1).toString(),
        value: p.yourMarks
      });
    });

    this.pieChartArray = [
      {
        name: 'Correct',
        value: allMarks
      },
      {
        name: 'Wrong',
        value: (length + 1) * 50 - allMarks
      }
    ];
    this.lineChart = [{
      name: 'Marks',
      series: this.series
    }];
  }

  xAxisTickFormatting(val: number): string {
    return val.toString(); // ensures the value is displayed as an integer
  }


  myTabFocusChange(changeEvent: MatTabChangeEvent) {
    this.pageNumber = 0;
    this.userHistory = [];
    this.isEmptyData = false;
    console.log(changeEvent.tab.textLabel);
    this.cTitle = changeEvent.tab.textLabel;
    this.getHistoryForSubject(changeEvent.tab.textLabel);
  }

  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    console.log(this.cTitle);
    this.getHistoryForSubject(this.cTitle);
  }

  changePassword() {
    this.userService.resendMail(this.user.email).subscribe(response => {
      Swal.fire('OTP send Successfully. Check your inbox and spam box as well.', '', 'success');
      this.router.navigateByUrl('/change-password');
    }, error => {
      Swal.fire('Recheck your mail and try again !! ', 'Error', 'error');
    });
  }


  getTodo(){
    let retString = localStorage.getItem('todos');
    this.todos = JSON.parse(retString);
  }
  saveTodo(){
    if(this.newTodo){
      let todo = new Todo();
      todo.name = this.newTodo;
      todo.isCompleted = true;
      this.todos.push(todo);
      console.log(this.todos);
      let array = JSON.stringify(this.todos);
      console.log(array);
      localStorage.setItem('todos', array);
      this.newTodo = '';
    }else {
      this.snack.open('Empty task description ', 'error', {
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition:'top'
      });
    }
  }

  done(id: number){
    this.todos[id].isCompleted = !this.todos[id].isCompleted;
    let array = JSON.stringify(this.todos);
    localStorage.setItem('todos', array);
  }

  remove(id:number){
    this.todos = this.todos.filter((v,i) => i !== id);
    let array = JSON.stringify(this.todos);
    localStorage.setItem('todos', array);
  }

  logout() {
    this.loginService.logout();
  }
}
