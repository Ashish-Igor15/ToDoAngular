import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthPayload, AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerUserData: AuthPayload = { email: '', password: '' };
  message = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.registerUserData.email || !this.registerUserData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    if (this.registerUserData.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters long.';
      return;
    }

    const payload = {
      email: this.registerUserData.email.trim().toLowerCase(),
      password: this.registerUserData.password,
    };

    this.auth.registerUser(payload).subscribe({
      next: () => {
        this.message = 'Registration successful. Please login.';
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Unable to register right now.';
      },
    });
  }
}
