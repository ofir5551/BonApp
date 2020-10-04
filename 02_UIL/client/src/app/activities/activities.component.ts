import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdminService } from '../shared/services/admin.service';
import { Order } from '../shared/models/order.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
})
export class ActivitiesComponent implements OnInit {
  details: boolean;
  allOrdersNotCompleted: Order[] = [];
  allOrdersCompleted: Order[] = [];
  isLoading: boolean = true;

  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    this.AllOrdersAndUsers();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  retrieveFlag(flag) {
    this.details = flag;
  }

  AllOrdersAndUsers() {
    this.AdminService.getAllUsers().subscribe((res) => {});

    this.AdminService.getAllOrders().subscribe((res) => {
      this.allOrdersNotCompleted = this.AdminService.allOrdersNotCompleted;
      this.allOrdersCompleted = this.AdminService.allOrdersCompleted;
    });
  }

  orderCompleted() {
    var completed = { completed: !this.AdminService.currentOrder.completed };
    this.AdminService.UpdateOrder(completed).subscribe((res) => {});
    this.AllOrdersAndUsers();
  }
}
