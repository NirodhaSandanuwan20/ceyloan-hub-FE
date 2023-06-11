import {Component, OnInit, ViewChild} from '@angular/core';
import {MatStepper} from "@angular/material/stepper";
import {DialogContentComponent} from "../../pages/user/start/start.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Todo} from "../../pages/user/todo-list/Todo";
@Component({
  selector: 'app-news-letter',
  templateUrl: './news-letter.component.html',
  styleUrls: ['./news-letter.component.css']
})
export class NewsLetterComponent implements OnInit {
  pause = true;
  introShow = true;
  QuestionShow = false;
  position = 'below';
  timer: number;
  fullTime: number;
  stepDuration: number;
  countdown: number;
  timerInterval: any;
  countdownInterval: any;
  showAnswers  = false;


  constructor(
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {}

  hideIntro() {
    this.introShow = false;
    this.QuestionShow = true;
    this.setUpTime();
    this.startCountdown();
  }

  setUpTime(){
    this.timer = 120 * 60;
    this.fullTime = 120 * 60;
    this.startTimer();
    this.stepDuration = 120 * 60 / 50;
    this.countdown = this.stepDuration;
  }


  startTimer() {
    this.timerInterval = setInterval(() => {
      // code
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        /*this.evalQuiz();*/
      } else {
        this.timer--;
        if(this.timer === this.fullTime * 3 / 4 || this.timer === this.fullTime / 2 || this.timer === this.fullTime / 4 ){
          this.openSnackBar('මිනිත්තු ' + (this.fullTime - this.timer) / 60 + ' ක් ගත වී අවසන්');
        }
        if(this.timer === 300){
          this.openSnackBar('අවසන් මිනිත්තු 5 !! ');
        }
      }
    }, 1000);
  }

  pauseTimer() {
    this.pause = false;
    clearInterval(this.timerInterval);
    this.stopCountdown();
  }

  resumeTimer() {
    this.pause = true;
    this.startTimer();
    this.startCountdown();
  }


  getFormattedTime() {
    const mm = Math.floor(this.timer / 60);
    const ss = this.timer - mm * 60;
    return `${mm} m : ${ss} s`;
  }


  startCountdown(): void {
    this.countdown = this.stepDuration;
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        const message = 'You have spent ' + this.stepDuration / 60 + ' m on this problem. Hurry Up !!';
        this.openSnackBar(message);
      }
    }, 1000);
  }

  resetCountdown(): void {
    clearInterval(this.countdownInterval);
    this.startCountdown();
  }

  stopCountdown(): void {
    clearInterval(this.countdownInterval);
  }


  onStepClick(stepper: MatStepper, step: number) {
    console.log(step);
    clearInterval(this.countdownInterval);
    this.resetCountdown();
  }


  openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }


  submit() {
    this.QuestionShow = false;
    this.showAnswers = true;
    this.stopCountdown();
  }
}





