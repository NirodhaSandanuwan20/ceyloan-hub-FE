
import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { Question } from '../../../model/Question';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../../../services/ImageProcessingService';
import { any } from "codelyzer/util/function";
import { DatePipe, LocationStrategy } from '@angular/common';
import { HistoryService } from 'src/app/services/history.service';
import { error, log } from 'console';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [DatePipe]
})
export class StartComponent implements OnInit {

  date:string;
  myDate = new Date();
  qid;
  questions;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;
  mm;
  ss;
  qNumber;
  pipe: any;

  constructor(
    private imageProcessingService: ImageProcessingService,
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private historyService: HistoryService,
    private datePipe: DatePipe,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }

  // tslint:disable-next-line:typedef
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid)
      .pipe(
        map((x: Question[], i) => x.map((question: Question) => this.imageProcessingService.creatImages(question)))
      )
      .subscribe(
        (data: any) => {
          this.questions = data;
          this.timer = this.questions[0].quiz.timeDuration * 60;
          this.startTimer();
        },

        (error) => {
          console.log(error);
          Swal.fire('Oops', 'Empty Question For Now. Questions Will Be Added ASAP', 'error');
          this.router.navigateByUrl('user-dashboard/0');
        }
      );

  }

  // tslint:disable-next-line:typedef
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  // tslint:disable-next-line:typedef
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  // tslint:disable-next-line:typedef
  startTimer() {
    const t = window.setInterval(() => {
      // code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  // tslint:disable-next-line:typedef
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} m : ${ss} s`;
  }

  // tslint:disable-next-line:typedef
  evalQuiz() {
    // calculation
    // call to sever  to check questions
    /* this._question.evalQuiz(this.questions).subscribe(
       (data: any) => {
         console.log(data);
         this.marksGot = data.marksGot;
         this.correctAnswers = data.correctAnswers;
         this.attempted = data.attempted;
         this.isSubmit = true;
       },
       (error) => {
         console.log(error);
       }
     );*/
    this.isSubmit = true;
    this.questions.forEach((q, i) => {
      if (q.givenAnswer === q.answer) {
        q.accuracy = true;
        this.correctAnswers++;
        this.marksGot = this.correctAnswers;
      } else {
        q.accuracy = false;
      }

      if (q.givenAnswer.trim() !== '') {
        this.attempted++;
      }
    });
    console.log('Correct Answers :' + this.correctAnswers);
    console.log('Marks Got ' + this.marksGot);
    console.log('attempted ' + this.attempted);
    console.log(this.questions);
    console.log(JSON.parse(localStorage.getItem('user')).id);
    console.log();
    this.saveHistory();
}


  seekQuestion(number: number) {
    console.log(number);
    console.log(this.questions);
  }

  saveHistory() {
    this.date= this.datePipe.transform(this.myDate, 'yyyy-MM-dd  h:mm a');
    let userId = JSON.parse(localStorage.getItem('user')).id;
    let nowTime:any = this.getFormattedTime();
    
    let h = {
      date: this.date,
      category: this.questions[0].quiz.category.title,
      title: this.questions[0].quiz.title ,
      fullMarks: this.questions[0].quiz.maxMarks,
      yourMarks: this.marksGot,
      savedTime: nowTime,
      user: {
        id:userId,
      },
    };
    this.historyService.addHistory(h).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      });
  }

}

