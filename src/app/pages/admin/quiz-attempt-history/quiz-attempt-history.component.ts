import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { error } from 'console';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-quiz-attempt-history',
  templateUrl: './quiz-attempt-history.component.html',
  styleUrls: ['./quiz-attempt-history.component.css']
})
export class QuizAttemptHistoryComponent implements OnInit {
category;
title;
  qid: number;
  quizHistory;
  constructor(
    private activeRoute: ActivatedRoute,
    private userHistoryService: HistoryService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.qid = params.qid;
    });
    this.getQuizAttempts();
  }

  getQuizAttempts() {
    this.userHistoryService.getQuizAttempts(this.qid).subscribe(response => {
      this.quizHistory = response;
      this.category = this.quizHistory[0].category;
      this.title = this.quizHistory[0].title;
      

    }, error => {
      console.log(error);
    });


  }

}
