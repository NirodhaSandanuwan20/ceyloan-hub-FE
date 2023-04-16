import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

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
    ) {}

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
  
}
