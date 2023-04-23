import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { SelectSubjectService } from 'src/app/services/select-subject.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  selectedCategories;
  selectLevel='';
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

/* 
getCategory(){
  this.cat.categories().subscribe(
    (data: any) => {
      this.categories = data;
      console.log(data);
      console.log('sidebar');
    },
    (error) => {
      this.snack.open('Error in loading categories from server', '', {
        duration: 3000,
      });
    }
  );
}
*/

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
