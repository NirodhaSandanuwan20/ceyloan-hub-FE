import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {

  catId;
  previousCatId;
  epicQuizzes = [];
  pageNumberEpic = 0;
  showMoreBtnEpic;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
  ) {
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.catId = params.catId;
    });
    this.pageNumberEpic = 0;
    this.epicQuizzes = [];
    this.getQuiz();
  }


  getQuiz() {
    this.previousCatId = this.catId;
    if (this.catId === 0) {
      /*this._quiz.getActiveQuizzes(this.pageNumber, this.searchText2, this.searchText1).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length === 20) {
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
      );*/
    } else {
      this._quiz.getActiveQuizzesOfCategory(this.catId, this.pageNumberEpic).subscribe(
        (data: any) => {
          console.log(data);
          if (data.length === 2) {
            this.showMoreBtnEpic = true;
          } else {
            this.showMoreBtnEpic = false;
          }
          data.forEach(p => this.epicQuizzes.push(p));
          console.log(this.epicQuizzes);
        },
        (error) => {
          alert('error in loading quiz data');
        });
    }
  }

  loadMoreEpic() {
      this.pageNumberEpic = this.pageNumberEpic + 1;
      this.getQuiz();
  }


}


/*
  search() {

    this.pageNumber = 0;
    this.quizzes = [];
    this.getAllQuiz();
    if (this.catId != 0) {
      this.router.navigateByUrl('/user-dashboard/0');
    }

  }

  clear2() {
    this.searchText2 = '';
    this.search();
  }

  clear1() {
    this.searchText1 = '';
    this.search();
  }
*/
