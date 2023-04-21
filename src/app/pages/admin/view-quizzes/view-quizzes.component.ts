import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [];
  pageNumber = 0;
  searchText1 = '';
  searchText2 = '';
  showMoreBtn;

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this.getAllQuiz();
  }

  //
  deleteQuiz(qId) {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete...
        this._quiz.deleteQuiz(qId).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qId != qId);
            Swal.fire('Success', 'Quiz deleted ', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error');
          }
        );
      }
    });
  }

  getAllQuiz(){

    this._quiz.quizzes(this.pageNumber,this.searchText2,this.searchText1).subscribe(
      (data: any) => {
        console.log(data);
        if (data.length === 1) {
          this.showMoreBtn = true;
        } else {
          this.showMoreBtn = false;
        }


        data.forEach(p=>this.quizzes.push(p));
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !', 'Error in loading data !', 'error');
      }
    );

  }

  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.ngOnInit();
  }


  search() {

    this.pageNumber = 0;
    this.quizzes = [];
    this.getAllQuiz();
    
  }

  clear2(){
    this.searchText2 = '';
    this.search();
  }
  
  clear1(){
    this.searchText1 = '';
    this.search();
  }

}
