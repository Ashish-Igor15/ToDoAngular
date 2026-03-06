import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  registerUser(user: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/register`, user);
  }

  loginUser(user: AuthPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiBaseUrl}/login`, user);
  }
}
