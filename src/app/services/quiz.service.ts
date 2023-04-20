import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //add quiz
  public addQuiz(quiz) {
    console.log(quiz);
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId) {
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  //get the single quiz

  public getQuiz(qId) {
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  //get quizzes of category
  public getQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  //qet active quizzes
  public getActiveQuizzes(pageNumber,searchText: string = '') {
    console.log(searchText);
    
    return this._http.get(`${baseUrl}/quiz/active`+"?pageNumber="+pageNumber+"&searchText="+searchText);
  }

  //get active quizzes of category pageNumberEpic
  public getActiveQuizzesOfCategory(cid) {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
}
