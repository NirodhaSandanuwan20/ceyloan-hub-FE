// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationCount = new BehaviorSubject<number>(0);
  currentCount = this.notificationCount.asObservable();
  private baseUrl = 'http://localhost:8080/notification';

  constructor(private http: HttpClient) { }

  getNewNotifications(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/new?userId=${userId}`);
  }

  /*markNotificationAsSeen(notificationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-seen`, { notificationId });
  }*/

  markNotificationAsSeen(notificationId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/mark-seen?notificationId=${notificationId}`, {});
  }

  notifyProductPurchase(userId: number, message: string): Observable<any> {
    const body = { userId, message };
    return this.http.post<any>(`${this.baseUrl}/add`, body);
  }

  getAllNotifications(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/all?userId=${userId}`);
  }
}
