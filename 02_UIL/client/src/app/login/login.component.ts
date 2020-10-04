import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public signupForm: FormGroup;
  isLoading: boolean = false;

  constructor(private AuthService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public onSubmit() {
    const userCredentials = {
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    };
    
    this.AuthService.Login(userCredentials).subscribe(
      (res) => {
        this.isLoading = true;
        setTimeout(() => {
          this.router.navigateByUrl('/order');
        }, 500)
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
