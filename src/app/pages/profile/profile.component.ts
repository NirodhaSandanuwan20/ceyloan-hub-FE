import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { productSales, productSalesMulti } from './product';
import { SelectSubjectService } from 'src/app/services/select-subject.service';
import { log } from 'console';
import { FilterSubjectPipe } from './filter-subject.pipe';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})

export class ProfileComponent implements OnInit {
  analyseArray = [];
  selectedCategories = [];
  userId;
  user = null;
  userHistory;
  selectSubject = '';
  constructor(private loginService: LoginService,
    private profileService: ProfileService,
    private categoryService: CategoryService,
    private selectSubjectServeice: SelectSubjectService,
    private pipe: FilterSubjectPipe
  ) {

    Object.assign(this, { productSales, productSalesMulti })

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
    this.profileService.getUserHistory(this.userId).subscribe(response => {
      this.userHistory = response;
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
    let one = [];
    let fullMakrs = 0;
    this.analyseArray = [];
    this.selectedCategories.forEach(p => {
      this.analyseArray.push(this.pipe.transform(this.userHistory, p.cTitle, 'a'));
      //array//koka wge ewda one//therenne na(Null noywa inna)
      console.log(this.analyseArray);
    });

    this.analyseArray.forEach((p, i = 0) => {
      p.forEach(element => {
        console.log(p[0].category + ' - ' + p[0].title + ' - ' + Number(element.yourMarks));

        fullMakrs = parseInt(element.yourMarks) + fullMakrs;
        one.push(fullMakrs);
        console.log(fullMakrs);

      });

    });


  }







  productSales: any[]
  productSalesMulti: any[]

  viewPie: any[] = [400, 370];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  gradient: boolean = false;
  isDoughnut: boolean = true;

  colorScheme = {
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










  viewBar: any[] = [200, 370];

  // options
  legendTitle: string = 'Marks';
  legendTitleMulti: string = 'Marks1';
  legendPosition: string = 'below'; // ['right', 'below']
  legend: boolean = true;

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

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [100, 1000, 2000, 5000, 7000, 10000]

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars



  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  activeEntries: any[] = ['book']
  barPadding: number = 5
  tooltipDisabled: boolean = false;

  yScaleMax: number = 9000;

  roundEdges: boolean = false;


















}
