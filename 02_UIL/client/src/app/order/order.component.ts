import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../shared/models/menu-item.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  menu: MenuItem[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.menu = this.orderService.getMenu();
  }

  onAddItemToCart(item: MenuItem) {
    this.orderService.addItemToCart({ name: item.name, price: item.price });
  }
}
