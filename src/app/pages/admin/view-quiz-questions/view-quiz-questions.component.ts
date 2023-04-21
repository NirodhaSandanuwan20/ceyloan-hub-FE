import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/model/Question';
import { ImageProcessingService } from 'src/app/services/ImageProcessingService';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId;
  qTitle;
  category;
  questions = [];
  showMoreBtn;
  pageNumber = 0;

  constructor(
    private imageProcessingService: ImageProcessingService,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snak: MatSnackBar
  ) {}
  
  ngOnInit(): void {
    
    this._route.params.subscribe((params) => {
      this.qId = params.qid;
      this.qTitle = params.title;
    });
    this._question.getQuestionsOfQuiz(this.qId,this.pageNumber).pipe(
      map((x: Question[],i) => x.map((question: Question) => this.imageProcessingService.creatImages(question)))
    ).subscribe(
      (data: Question[]) => {
        console.log(data);
        if (data.length === 5) {
          this.showMoreBtn = true;
        } else {
          this.showMoreBtn = false;
        }
        data.forEach(p => this.questions.push(p));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //delete quesion
  deleteQuestion(qid) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure , want to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confirm
        this._question.deleteQuestion(qid).subscribe(
          (data) => {
            this._snak.open('Question Deleted ', '', {
              duration: 3000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },

          (error) => {
            this._snak.open('Error in deleting questions', '', {
              duration: 3000,
            });
            console.log(error);
          }
        );
      }
    });
  }

  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.ngOnInit();
  }

}
