import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../../services/category.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectSubjectService} from "../../../services/select-subject.service";
import {MatTabChangeEvent} from "@angular/material/tabs";
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  selectedCategories;
  userId;
  epicQuizzes = [];
  pageNumberEpic = 0;
  showMoreBtnEpic;
  categoryName;
  isEmpty: boolean;

  constructor(
    private _quiz: QuizService,
    private cat: CategoryService,
    private snack: MatSnackBar,
    private selectSubjectServeice: SelectSubjectService,
  ) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.getSelectedCategory();
  }

  getSelectedCategory() {
    console.log(this.userId);

    this.selectSubjectServeice.getSelectedUserCategory(this.userId).subscribe(response => {
        console.log(response);
        this.selectedCategories = response;
        console.log(this.selectedCategories.length);
        if (this.selectedCategories.length === 0) {
          this.isEmpty = true;
          console.log('empty');
        }else{
          this.isEmpty = false;
        }
      },
      (error) => {
        //error
        console.log(error);

      }
    );
  }


  myTabFocusChange(changeEvent: MatTabChangeEvent) {
    console.log(changeEvent);
    this.categoryName = changeEvent.tab.textLabel;
    console.log(this.categoryName);
    this.pageNumberEpic = 0;
    this.epicQuizzes = [];
    this.getQuiz();
  }

  getQuiz() {
    this._quiz.getActiveQuizzesOfCategory(this.categoryName, this.pageNumberEpic).subscribe(
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


  loadMoreEpic() {
    this.pageNumberEpic = this.pageNumberEpic + 1;
    this.getQuiz();
  }

}
