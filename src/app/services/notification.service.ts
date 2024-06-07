// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationCount = new BehaviorSubject<number>(0);
  currentCount = this.notificationCount.asObservable();

  constructor() {}

  updateNotificationCount(count: number) {
    this.notificationCount.next(count);
  }

  resetNotificationCount() {
    this.notificationCount.next(0);
  }
}
