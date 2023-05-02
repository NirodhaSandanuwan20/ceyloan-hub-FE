import {Component, OnInit} from '@angular/core';
import {CategoryService} from 'src/app/services/category.service';
import {LoginService} from 'src/app/services/login.service';
import {ProfileService} from 'src/app/services/profile.service';
import {productSales, productSalesMulti} from './product';
import {SelectSubjectService} from 'src/app/services/select-subject.service';
import {log} from 'console';
import {FilterSubjectPipe} from './filter-subject.pipe';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  analyseArray = [];
  selectedCategories = [];
  BarChartArray = [];
  pieChartArray = [];
  pageNumber: number = 0;
  userId;
  user = null;
  userHistory = [];
  selectSubject = '';
  showMoreBtn;
  lineChart;

  constructor(
    private loginService: LoginService,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private selectSubjectServeice: SelectSubjectService,
    private pipe: FilterSubjectPipe
  ) {
    Object.assign(this, { productSalesMulti });
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
        //error
        console.log(error);

      }
    );
  }

  setAnalyse() {
    this.BarChartArray = [];
    let allMarks = 0;
    let length = 0;
    this.analyseArray = this.pipe.transform(this.userHistory, this.selectSubject, 'a');
    this.analyseArray.forEach((p, i) => {
      allMarks = allMarks + parseInt(p.yourMarks);
      length = i;

      this.BarChartArray.push(
        {
          "name": i+1,
          "value": p.yourMarks
        }
      );


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
      "series":this.BarChartArray
    }]
    console.log(this.lineChart);

  }


  /*loadMore() {
    this.selectSubject = '';
    this.pageNumber = this.pageNumber + 1;
    this.ngOnInit();
  }*/




  getHistoryForSubject(cTitle: string) {
    this.userHistory = [];
    console.log(cTitle);
    console.log(this.userId);
    console.log(this.pageNumber);
    this.profileService.getHistoryForSub(cTitle, this.userId).subscribe((response:any) => {
        /*if (response.length === 4) {
          this.showMoreBtn = true;
        } else {
          this.showMoreBtn = false;
        }*/
        response.forEach(p => this.userHistory.push(p));
        console.log(response);
        this.setAnalyse();
      },
      error => {
        console.log(error);
      });
  }

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




}
