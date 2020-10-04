import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Order } from '../shared/models/order.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: Order[] = [];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderService.getOrderHistory().subscribe((orderHistory: Order[]) => {
      this.orderHistory = orderHistory;
    });
  }

  onOrderNow() {
    this.router.navigate(['/order'])
  }
}
