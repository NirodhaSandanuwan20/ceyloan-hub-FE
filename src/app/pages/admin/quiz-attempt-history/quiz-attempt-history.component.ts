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
  quizHistory = [];
  pageNumber = 0 ;
  searchText1 = '';
  searchText2 = '';
  showMoreBtn;
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
    this.userHistoryService.getQuizAttempts(this.qid,this.pageNumber,this.searchText1,this.searchText2).subscribe((response:any) => {
      console.log(response);
        if (response.length === 4) {
          this.showMoreBtn = true;
        } else {
          this.showMoreBtn = false;
        }


        response.forEach(p=>this.quizHistory.push(p));
        console.log(this.quizHistory);
      this.category = this.quizHistory[0].category;
      this.title = this.quizHistory[0].title;
      

    }, error => {
      console.log(error);
    });


  }




  loadMore() {
    this.pageNumber = this.pageNumber + 1;
    this.getQuizAttempts();
  }


  search() {

    this.pageNumber = 0;
    this.quizHistory = [];
    this.getQuizAttempts();
    
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
