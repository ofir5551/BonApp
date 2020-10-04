import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription = new Subscription();
  userName: string;
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // The 500ms delay is for UX purposes only
      // fix bug: unwanted 500ms delay when refreshing page, keep only for login
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        this.isAdmin=null;
        if (this.isAuthenticated){
          this.userName = user.name.split(' ')[0];
          if (user.isAdmin) this.isAdmin=true;
        } else this.userName = null;
      }, 500);
    });
  }

  onLogout() {
      this.authService.logout();
      this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
