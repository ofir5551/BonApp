import { Component, OnInit } from '@angular/core';

import { NotificationMsg } from 'src/app/shared/models/notification-msg.model';
import { NotificationsService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: NotificationMsg[] = [];
  unseenNotifications: NotificationMsg[] = [];

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {
    this.notificationService
      .fetchNotifications();

      this.notificationService.notificationsChanged.subscribe((notifications: NotificationMsg[]) => {
        this.notifications = notifications;
        this.unseenNotifications = notifications.filter((notification: NotificationMsg) => !notification.seen)
      })
  }

  onMarkNotificationsAsSeen() {
    this.notificationService.markNotificationsAsSeen().subscribe(notification => {
      this.unseenNotifications = [];
    })
  }
}
