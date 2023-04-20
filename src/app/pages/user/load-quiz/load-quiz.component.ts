import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {

  catId;
  quizzes = [];
  epicQuizzes = [];
  tempEpicQuizzes = [];
  pageNumber:number = 0;
  pageNumberEpic = 0;
  showMoreBtn;
  showMoreBtnEpic;
  allQues;
  searchText:string = '';

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) { }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params.catId;
      this.getAllQuiz();
    });
  }



  getAllQuiz(){

    if (this.catId == 0) {
      this.allQues = true;
      this._quiz.getActiveQuizzes(this.pageNumber,this.searchText).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length === 4) {
            this.showMoreBtn = true;
          } else {
            this.showMoreBtn = false;
          }
          data.forEach(p => this.quizzes.push(p));
          console.log(this.quizzes);
        },
        (error) => {
          console.log(error);
          alert('error in loading all quizzes');
        }
      );
    } else {
      this.allQues = false;
      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
        (data: any) => {
          console.log(data);
          /* if (data.length === 1) {
            this.showMoreBtnEpic = true;
          } else {
            this.showMoreBtnEpic = false;
          }
          data.forEach(p => this.epicQuizzes.push(p)); */
          this.epicQuizzes = data;
          console.log(this.epicQuizzes);
        },
        (error) => {
          alert('error in loading quiz data');
        }
      );
    }
    
  }

  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.ngOnInit();
  }


 /*  loadMoreEpic() {
    this.pageNumberEpic = this.pageNumberEpic + 1;
    this.ngOnInit();
  }
 */

  search() {

    this.pageNumber = 0;
    this.quizzes = [];
    this.ngOnInit();
    
  }

}
