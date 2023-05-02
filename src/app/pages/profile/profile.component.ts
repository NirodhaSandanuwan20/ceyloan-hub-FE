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
    this.loadData();
    this.getAllSelectedCategories();
    this.setAnalyse();
  }


  loadData() {
    console.log(this.user);
    this.profileService.getUserHistory(this.userId, this.pageNumber).subscribe((response:any) => {
      if (response.length === 4) {
        this.showMoreBtn = true;
      } else {
        this.showMoreBtn = false;
      }
      response.forEach(p => this.userHistory.push(p));
      // this.userHistory = response;
    }, erorr => {
      console.log(erorr);
    });

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
    console.log(this.analyseArray);
    console.log(this.analyseArray[0].category);
    this.analyseArray.forEach((p, i) => {
      console.log(p.yourMarks);
      console.log(p.date);
      console.log(i + 1);
      allMarks = allMarks + parseInt(p.yourMarks);
      console.log(allMarks);
      length = i

      this.BarChartArray.push(
        {
          "name": p.date,
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


    console.log(this.pieChartArray);
    console.log(this.BarChartArray);


  }


  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.ngOnInit();
  }


  /* productSales: any[] */
  /* productSalesMulti: any[] */

  viewPie: any[] = [700, 300];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;
  legendPositionPie: string = 'right';

  gradient: boolean = false;
  isDoughnut: boolean = true;

  colorSchemePie = {
    domain: ['#4e3295', '#d72c2c', '#B67A3D', '#5B6FC8', '#25706F']
  };


  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }


  viewBar: any[] = [1000, 370];

  // options
  //legendTitle: string = 'Marks';
  //legendPosition: string = 'below'; // ['right', 'below']
  //legend: boolean = true;
  colorSchemeBar = {
    domain: ['#4e3295']
  };

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Marks';
  xAxisLabel: string = 'Date';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;


  /* xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000] */

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  noBarWhenZero: boolean = true;


  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'
  barPadding: number = 1;
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;


}
