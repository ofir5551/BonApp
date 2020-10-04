import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/shared/services/order.service';
import { MenuItem } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingCart: MenuItem[] = [];
  totalPrice: number = 0;

  orderCompleted: boolean = false;
  isLoading: boolean = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.shoppingCart = this.orderService.getCart();
    this.calculateTotalPrice();

    this.orderService.cartChanged.subscribe((cart) => {
      this.shoppingCart = cart;
      this.calculateTotalPrice();
    });
  }

  private calculateTotalPrice() {
    this.totalPrice = 0;
    this.shoppingCart.forEach((item) => {
      this.totalPrice += item.price;
    });
  }

  onRemoveItem(index: number) {
    this.orderService.removeItemFromCart(index);
  }

  onSubmitOrder() {
    this.orderService.submitOrder().subscribe(
      (res) => {
        // UX: Display loading spinner for 500ms and then success message ------- keep?
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.orderCompleted = true;
        }, 500);
      },
      (errResponse) => console.log(errResponse.error.error)
    );
  }
}
