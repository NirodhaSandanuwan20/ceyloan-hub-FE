
import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { Question } from '../../../model/Question';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../../../services/ImageProcessingService';
import {DatePipe, LocationStrategy, ViewportScroller} from '@angular/common';
import { HistoryService } from 'src/app/services/history.service';
import {MatStep, MatStepper} from '@angular/material/stepper';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [DatePipe]
})
export class StartComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('yourStep') yourStep: MatStep;

  stepDuration: number; // Duration in seconds (2 minutes)
  countdown: number;
  countdownInterval: any;

  date: string;
  myDate = new Date();
  qid;
  questions = [];
  marksGot = 0;
  correctAnswers = 0;
  isSubmit = false;
  timer: any;
  mm;
  pageNumber = 0;
  showMoreBtn;
  position = 'above';


  constructor(
    private imageProcessingService: ImageProcessingService,
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _quiz: QuizService,
    private historyService: HistoryService,
    private datePipe: DatePipe,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private snackBar: MatSnackBar
  ) {
    this.startCountdown();
  }

  ngOnInit(): void {
   this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }


  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid,this.pageNumber)
      .pipe(
        map((x: Question[], i) => x.map((question: Question) => this.imageProcessingService.creatImages(question)))
      )
      .subscribe(
        (data: Question[]) => {
          if (data.length === 5) {
            this.showMoreBtn = true;
          } else {
            this.showMoreBtn = false;
          }
          console.log(data);
          data.forEach(p => this.questions.push(p));
          console.log(this.questions.length);
          if(this.questions.length === 5){
            this.timer = this.questions[0].quiz.timeDuration * 60;
            this.startTimer();
            this.stepDuration = this.questions[0].quiz.timeDuration * 60 / this.questions[0].quiz.numberOfQuestions;
            this.countdown = this.stepDuration;
            console.log(this.countdown);
            console.log(this.stepDuration);
          }

        },

        (error) => {
          console.log(error);
          Swal.fire('Oops', 'Empty Question For Now. Questions Will Be Added ASAP', 'error');
          this.router.navigateByUrl('user-dashboard');
        }
      );

  }


  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }




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


  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} m : ${ss} s`;
  }


  evalQuiz() {
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
    this.questions.forEach((q, i) => {
      if (q.givenAnswer === q.answer) {
        q.accuracy = true;
        this.correctAnswers++;
        this.marksGot = this.correctAnswers;
      } else {
        q.accuracy = false;
      }
    });
    this.viewportScroller.scrollToPosition([0, 0]);
    this.saveHistory();
    this.isSubmit = true;
  }


  saveHistory() {
    this.date = this.datePipe.transform(this.myDate, 'yyyy-MM-dd  h:mm a');
    let userId = JSON.parse(localStorage.getItem('user')).id;
    let nowTime: any = this.getFormattedTime();

    let h = {
      date: this.date,
      category: this.questions[0].quiz.category.title,
      title: this.questions[0].quiz.title,
      fullMarks: this.questions[0].quiz.maxMarks,
      yourMarks: this.marksGot,
      savedTime: nowTime,
      qid: this.qid,
      user: {
        id: userId,
      },
    };
    this.historyService.addHistory(h).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }




  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.loadQuestions();
  }

  checkStatus(i: number) {
    /*if( i + 1 === this.questions.length){
      this.loadMore();
    }*/
    console.log(this.questions[i].givenAnswer);
    if(this.questions[i].givenAnswer === null){
      this.stepper._steps.toArray()[i].label = 'Question ' + (i + 1) + ' - not marked yet';
    }else{
      this.stepper._steps.toArray()[i].label = 'Question ' + (i + 1);
    }
  }

  onStepClick(stepper: MatStepper, step: number) {
    console.log(step);
    this.checkStatus(step);
    clearInterval(this.countdownInterval);
    this.resetCountdown();
  }

  startCountdown(): void {
    this.countdown = this.stepDuration;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        let message  = 'You have spent ' + this.stepDuration / 60 + ' (Avg time per Q) minutes on this problem. Hurry Up !'
        this.openSnackBar(message);
      }
    }, 1000);
  }

  resetCountdown(): void {
    clearInterval(this.countdownInterval);
    this.startCountdown();
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition:"right",
      verticalPosition:"top",
    });
  }

}

