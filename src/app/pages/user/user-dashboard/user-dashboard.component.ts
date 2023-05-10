import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectSubjectService} from "../../../services/select-subject.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  selectedCategories;
  userId;


  constructor(
    private cat: CategoryService,
    private snack: MatSnackBar,
    private selectSubjectServeice: SelectSubjectService,
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    // this.getCategory();
    this.getSelectedCategory();
  }

  getSelectedCategory(){
    console.log(this.userId);

    this.selectSubjectServeice.getSelectedUserCategory(this.userId).subscribe(response => {
        console.log(response);
        this.selectedCategories = response;

      },
      (error) => {
        //error
        console.log(error);

      }
    );
  }


}
