import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  public getUserHistory(id:number) {
    return this.http.get(`${baseUrl}/history/${id}`);
  }

}
