import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { SelectSubjectService } from 'src/app/services/select-subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: ['./select-subject.component.css']
})
export class SelectSubjectComponent implements OnInit {

  categories = [];
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
    this.getAllCategories();
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
    console.log(cid);
    console.log(title);

    /* this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd  h:mm a'); */
    let userId = JSON.parse(localStorage.getItem('user')).id;

    let c = {
      cid: cid,
      date: this.date,
      cTitle: title,
      user: {
        id: userId,
      },
    };

    Swal.fire({
      title: 'Do you want to Add this Subject ?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      console.log(c);
      
      if (e.isConfirmed) {
        this.selectSubjectServeice.addUserCategory(c).subscribe(Response => {
          console.log(Response);

        },
          erorr => {
            console.log(erorr);
          });
      }
    });

  }





}
