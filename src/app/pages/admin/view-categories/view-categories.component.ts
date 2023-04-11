import { Component, OnInit } from '@angular/core';
import { error, log } from 'console';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css'],
})
export class ViewCategoriesComponent implements OnInit {
  categories = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  

  deleteCategory(categoryId: number) {
    Swal.fire({
      title: 'Are you sure ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      confirmButtonText: 'Yes, Delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(categoryId).subscribe(resp => {
          Swal.fire('Deleted', 'Category has been deleted', 'success');
          this.ngOnInit();
        },
          error => {
            Swal.fire('Oops! Try Again', 'Erorr', 'error');
          });

      }
    });
    console.log(categoryId);

  }

}
