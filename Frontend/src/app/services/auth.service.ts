import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  LoginCredentials,
  RegisterCredentials,
  ResetPassword,
} from '../models/auth.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /*login(credentials: LoginCredentials): Observable<any> {
    // Implement actual login logic here
    return of({ success: true });
  }*/

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  setNewPassword(payload: { token: string, password: string }) {
    return this.http.post(`${environment.apiUrl}/reset-password`, payload);
  }
  
  getWorkspaceData(): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve stored token
    if (!token) {
      throw new Error('No authentication token found');
    }

    return this.http.get(`${this.apiUrl}/workspace`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`, // Include the token in the header
        'Content-Type': 'application/json',
      }),
    });
  }
  
  /*register(credentials: RegisterCredentials): Observable<any> {
    // Implement actual registration logic here
    return of({ success: true });
  }*/

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  resetPassword(payload: any) {
    return this.http.post(`${environment.apiUrl}/forgot-password`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  
  
}
