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
    console.log(user);

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

  forgotPassowrd(otp:string,newPassword:string,mail: string) {
    return this.http.post(`${baseUrl}/user/forgot` + '?otp=' + otp + '&newPassword=' + newPassword + '&mail=' + mail ,{});
  }

  changeEmailRequest(oldEmail: string , newEmail: string) {
    return this.http.post(`${baseUrl}/user/change-mail` + '?oldEmail=' + oldEmail + '&newEmail=' + newEmail ,{});
  }

  public verifyNewMail(otp: string, newEmail: string, oldEmail: string): Observable<any> {
    console.log(otp);
    console.log(newEmail);
    return this.http.post(`${baseUrl}/user/verify-newMail` + '?otp=' + otp + '&newEmail=' + newEmail + '&oldEmail=' + oldEmail,{});
  }

}
