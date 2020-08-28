import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, pipe } from 'rxjs';

import { MenuItem } from '../models/menu-item.model';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  menu: MenuItem[] = [
    {
      name: 'Burger',
      description: 'A Tasty Burger',
      price: 50,
      imagePath:
        'https://www.eatnpark.com/UserFiles/Menu/BURGER_ClassicBurgerOLO.jpg',
    },
    {
      name: 'Pizza',
      description: 'Best Pizza In The World!',
      price: 35,
      imagePath:
        'https://www.jocooks.com/wp-content/uploads/2012/03/margherita-pizza-11.jpg',
    },
    {
      name: 'Toast',
      description: 'Great Toast!',
      price: 35,
      imagePath:
        'https://taste.co.za/wp-content/uploads/2015/11/The-ultimate-toasted-cheese.jpg',
    },
    {
      name: 'Pasta',
      description: 'Delicious Pasta!',
      price: 40,
      imagePath:
        'https://www.foxvalleyfoodie.com/wp-content/uploads/2017/12/blue-cheese-mushroom-pasta-feature-500x500.jpg',
    },
    {
      name: 'French Fries',
      description: 'French fries!',
      price: 14,
      imagePath:
        'https://static.toiimg.com/thumb/54659021.cms?imgsize=275086&width=800&height=800',
    },
    {
      name: 'Coke',
      description: 'Coca Cola',
      price: 12,
      imagePath:
        'https://p1.hiclipart.com/preview/942/770/358/10-coca-cola-items-coca-cola-glass-bottle-illustration.jpg',
    },
  ]; // TODO : export this to an external file

  readonly rootUrl = 'http://localhost:3000/';
  cartChanged = new Subject<MenuItem[]>();

  private shoppingCart: MenuItem[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  getMenu() {
    return this.menu;
  }

  getCart() {
    return this.shoppingCart;
  }

  addItemToCart(item: MenuItem) {
    this.shoppingCart.push({ ...item, quantity: 1 });
    this.cartChanged.next(this.shoppingCart);
    // TODO: add findDuplicateItems to automatically increase quantity of selected item

    console.log(this.shoppingCart);
  }

  removeItemFromCart(index: number) {
    this.shoppingCart.splice(index, 1);
    this.cartChanged.next(this.shoppingCart);

    console.log(this.shoppingCart);
  }

  clearShoppingCart() {
    this.shoppingCart = [];
    this.cartChanged.next(this.shoppingCart);
  }

  //TODO: add order as guest feature, add auth interceptor to save token as header
  submitOrder() {
    const tokenHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    };

    return this.http
      .post(this.rootUrl + 'orders', { items: this.shoppingCart }, tokenHeader)
      .pipe(
        tap((res) => {
          console.log(res);

          // UX: 500ms delay -------- keep?
          setTimeout(() => this.clearShoppingCart(), 500);
        })
      );
  }
}
