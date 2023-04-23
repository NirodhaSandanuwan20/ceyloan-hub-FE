import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SelectSubjectService {
  

  constructor(private http: HttpClient) { }

  public addUserCategory(c:any) {
    console.log(c);
    return this.http.post(`${baseUrl}/my-category/`, c);
  }


  public getSelectedUserCategory(userId:number) {
    console.log(userId);
    return this.http.get(`${baseUrl}/my-category/`+userId);
  }

  public deleteSelectedUserCategory(userCategoryId:number) {
    console.log(userCategoryId);
    return this.http.delete(`${baseUrl}/my-category/`+"?userCategoryId="+userCategoryId);
  }


}
