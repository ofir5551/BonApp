import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user: User;
  public signupForm: FormGroup;
  public registrationSuccess: boolean;

  constructor(private AuthService: AuthService) {}

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public checkPassword(password: string) {
    return password === this.signupForm.get('password').value ? null : true;
  }

  public onSubmit() {
    const userInfo = {
      name: this.signupForm.get('name').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    };

    this.AuthService.SignUp(userInfo).subscribe(
      (res) => {
        this.registrationSuccess = true;
        this.signupForm.reset();
      },
      (err) => {
        this.registrationSuccess = false;
        console.log('Failed..');
      }
    );
  }
}
