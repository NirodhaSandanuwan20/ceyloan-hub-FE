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

//pending  and paid
  public getSelectedUserCategory(userId:number) {
    console.log(userId);
    return this.http.get(`${baseUrl}/my-category/`+userId);
  }

//activated
  getPaidUserCategory(userId) {
    console.log(userId);
    return this.http.get(`${baseUrl}/my-category/`+'?userId='+userId,{});
  }

  public deleteSelectedUserCategory(userCategoryId:number) {
    console.log(userCategoryId);
    return this.http.delete(`${baseUrl}/my-category/` + '?userCategoryId=' + userCategoryId);
  }

  public getHashCode(userID:number) {
    console.log(userID);
    // @ts-ignore
    return this.http.post(`${baseUrl}/user/hashcode/` + '?userID=' + userID);
  }


  getAllUserCategory(cid,b,email) {
    return this.http.get(`${baseUrl}/my-category/all/`+ "?cid=" + cid + "&b=" + b + "&email=" + email);
  }

  paymentStatus(userCategoryId: any) {
    return this.http.put(`${baseUrl}/my-category/` + userCategoryId, {});
  }

}
