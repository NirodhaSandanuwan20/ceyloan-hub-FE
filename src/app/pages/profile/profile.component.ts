import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {LoginService} from 'src/app/services/login.service';
import {ProfileService} from 'src/app/services/profile.service';
import {SelectSubjectService} from 'src/app/services/select-subject.service';
import {FilterSubjectPipe} from './filter-subject.pipe';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


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

  colorSchemePie = {
    domain: ['#3B82F6', '#c0392b']
  };
  colorSchemeLineChart = {
    domain: ['#3B82F6']
  };

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private selectSubjectServeice: SelectSubjectService,
    private userService: UserService,
    private pipe: FilterSubjectPipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.user = this.loginService.getUser();
    this.getAllSelectedCategories();
    this.getUserDetails();
  }


  getUserDetails(){
    this.userService.getUser(this.userId).subscribe((response: any) => {
      console.log(response);
      this.usermail = response.email;
    }, error => {
      console.log(error);
    });
  }

  getAllSelectedCategories() {
    this.selectSubjectServeice.getSelectedUserCategory(this.userId).subscribe((response: any) => {
        this.selectedCategories = response;
      },
      (error) => {
        console.log(error);

      }
    );
  }


  getHistoryForSubject(cTitle: string) {
    console.log(this.userHistory);
    this.profileService.getHistoryForSub(cTitle, this.userId, this.pageNumber).subscribe((response: any) => {
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
      allMarks = allMarks + parseInt(p.yourMarks);
      length = i;
      this.series.push({
        name: i + 1,
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


  myTabFocusChange(changeEvent: MatTabChangeEvent) {
    this.pageNumber = 0;
    this.userHistory = [];
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


}
