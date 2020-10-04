import { Component, OnInit } from '@angular/core';

import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './shared/services/order.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BonApp';

  constructor(private authService: AuthService, private http: HttpClient, private OrderService:OrderService) {}

  ngOnInit() {
    this.authService.autoLogin();

    // Add the menu from external json
    this.http.get('./assets/menu.json').subscribe(
      data => {
        for(var key in data) this.OrderService.menu[key]=data[key];
      });
  }
}
