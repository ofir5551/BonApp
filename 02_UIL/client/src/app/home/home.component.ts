import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userSubscription = new Subscription();
  public userName: String;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserName();
  }

  public getUserName() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) this.userName = user.name;
      else this.userName = 'Guest';
    });
  }

  // public Home() {
  //   this.AuthService.GetHome().subscribe(
  //     (res) => this.name = res['name'],
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
