import { Injectable } from '@angular/core';
import baseUrl from "./helper";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  public submit(message: any) {
    console.log(message);
    return this.http.post(`${baseUrl}/message/`, message);
  }
}
