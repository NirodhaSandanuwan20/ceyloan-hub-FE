import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {LoginService} from 'src/app/services/login.service';
import {ProfileService} from 'src/app/services/profile.service';
import {SelectSubjectService} from 'src/app/services/select-subject.service';
import {FilterSubjectPipe} from './filter-subject.pipe';
import {MatTabChangeEvent} from "@angular/material/tabs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  cTitle;
  selectedCategories = [];
  series = [];
  pieChartArray = [];
  pageNumber: number = 0;
  userId;
  user = null;
  userHistory = [];
  showMoreBtn;
  lineChart;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private selectSubjectServeice: SelectSubjectService,
    private pipe: FilterSubjectPipe
  ) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.user = this.loginService.getUser();
    this.getAllSelectedCategories();
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
          "name": i + 1,
          "value": p.yourMarks
        });
      });

    this.pieChartArray = [
      {
        "name": "Correct",
        "value": allMarks
      },
      {
        "name": "Wrong",
        "value": (length + 1) * 50 - allMarks
      }
    ];
    this.lineChart = [{
      "name": "Marks",
      "series": this.series
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


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////

  colorSchemePie = {
    domain: ['#4e3295', '#d72c2c', '#B67A3D', '#5B6FC8', '#25706F']
  };

  viewPie: any[] = [800, 300];
  /*Line CHart Begin*/
  productSalesMulti: any[];
  view: any[] = [700, 370];

  // options
  legendLineChart: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Marks';
  timeline: boolean = true;

  colorSchemeLineChart = {
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
  };

  onSelect(event) {
    console.log(event);
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  /*Line Chart End*/


  ///////////////////////////////////////////////

}
