import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  public getUserHistory(id: number, pageNumber: number) {
    return this.http.get(`${baseUrl}/history/${id}` + '?pageNumber=' + pageNumber);
  }
  public getHistoryForSub(category, userId: number) {
    console.log(category);
    console.log(userId);
    return this.http.get(`${baseUrl}/history/specific/` + '?category=' + category + '&userId=' + userId );
  }

}
