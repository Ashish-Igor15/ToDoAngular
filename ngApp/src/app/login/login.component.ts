import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPayload, AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUserData: AuthPayload = { email: '', password: '' };
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.errorMessage = '';

    if (!this.loginUserData.email || !this.loginUserData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    const payload = {
      email: this.loginUserData.email.trim().toLowerCase(),
      password: this.loginUserData.password,
    };

    this.auth.loginUser(payload).subscribe({
      next: () => this.router.navigate(['/todo']),
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Unable to login right now.';
      },
    });
  }
}
