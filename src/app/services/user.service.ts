import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //add user
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  public verify(code: string, email: string): Observable<any> {
    console.log(code);
    console.log(email);
    return this.http.post(`${baseUrl}/user/`+code+'?email='+email,{});
  }

  resendMail(email: string) {
    return this.http.post(`${baseUrl}/user/`+'?email='+email,{});
  }
}
