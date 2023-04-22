import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';
import { productSales, productSalesMulti } from './product';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

 

  categories = [];
  user = null;
  userHistory;
  selectSubject='';
  constructor(private loginService: LoginService,
    private profileService: ProfileService,
    private categoryService: CategoryService
    ) {

      Object.assign(this, { productSales, productSalesMulti }) 

    }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.loadData();
    this.categoryService.categories().subscribe((data: any) => {
      //categories load
      this.categories = data;
      // console.log(this.categories);
    });
  }

  loadData() {
    console.log();
    this.profileService.getUserHistory(JSON.parse(localStorage.getItem('user')).id).subscribe(response=>{
      console.log(response);
      this.userHistory = response;
      console.log(this.userHistory);
      
    },erorr=>{
      console.log(erorr);
    });
    
    }
  



    productSales: any[]
    productSalesMulti: any[]
  
    view: any[] = [700, 370];
  
    // options
    showLegend: boolean = true;
    showLabels: boolean = true;
  
    gradient: boolean = false;
    isDoughnut: boolean = true;
  
    legendPosition: string = 'below';
  
    colorScheme = {
      domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F']
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





    
}
