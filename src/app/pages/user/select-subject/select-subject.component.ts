import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import { SelectSubjectService } from 'src/app/services/select-subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: ['./select-subject.component.css']
})
export class SelectSubjectComponent implements OnInit {
  userId;
  categories = [];
  selectedCategories: any = [];
  date = 'not yet';
  /* myDate = new Date(); */

  constructor(
    private selectSubjectServeice: SelectSubjectService,
    private categoryServeice: CategoryService,
    private snackBar: MatSnackBar,
    /* private datePipe: DatePipe */
  ) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.getAllCategories();
    this.getAllSelectedCategories();
  }


  getAllCategories() {
    this.categoryServeice.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(data);
        console.log('sidebar');
      },
      (error) => {
        this.snackBar.open('Error in loading categories from server', '', {
          duration: 3000,
        });
      }
    );
  }

  addCategory(cid, title) {
let text = "Do you want to Add "+ title +" as your subject ?"

    console.log(cid);
    console.log(title);

    /* this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd  h:mm a'); */


    let c = {
      cid: cid,
      date: this.date,
      cTitle: title,
      user: {
        id: this.userId,
      },
    };

    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      console.log(c);

      if (e.isConfirmed) {
        this.selectSubjectServeice.addUserCategory(c).subscribe((Response) => {
          console.log(Response);
          this.ngOnInit();
        },
          (error) => {
            this.snackBar.open(error.error.text, 'Oops !!', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });

          });
      }
    });

  }

  getAllSelectedCategories() {
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




  deleteCategory(userCategoryId,cTitle){
  console.log(userCategoryId);
  let text = 'Do you really want delete this '+cTitle+' Subject ?'

    Swal.fire({
      title: text,
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {

      if (e.isConfirmed) {
        this.selectSubjectServeice.deleteSelectedUserCategory(userCategoryId).subscribe((Response) => {
          console.log(Response);
          this.ngOnInit();
        },
          (error) => {
            this.snackBar.open("Error !! Try Again later", 'Oops !!', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });

          });
      }
    });

  }




}
