import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NotificationMsg } from '../models/notification-msg.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly rootUrl = 'http://localhost:3000/';

  notifications: NotificationMsg[] = [];
  notificationsChanged = new BehaviorSubject<NotificationMsg[]>([]);

  constructor(private http: HttpClient) {}

  addNotification(notification: NotificationMsg) {
    this.http
      .post<NotificationMsg>(this.rootUrl + 'notification', notification)
      .pipe(
        tap((res) => {
          this.notifications.unshift(res);
          this.notificationsChanged.next(this.notifications);
        })
      )
      .subscribe();
  }

  fetchNotifications() {
    return this.http
      .get<NotificationMsg[]>(this.rootUrl + 'notification')
      .pipe(
        tap((notifications) => {
          this.notifications = notifications;
          this.notificationsChanged.next(this.notifications);
        })
      )
      .subscribe();
  }

  markNotificationsAsSeen() {
    return this.http
      .post<NotificationMsg[]>(this.rootUrl + 'notification/read', {})
      .pipe(
        tap((response) => {
          this.notifications.forEach(
            (notification) => (notification.seen = true)
          );
        })
      );
  }
}
