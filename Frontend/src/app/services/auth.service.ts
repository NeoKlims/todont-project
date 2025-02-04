import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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
  private currentUserSubject = new BehaviorSubject<any>(null); // Stores the current user
  public currentUser$ = this.currentUserSubject.asObservable(); // Expose current user as an observable

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  // Set the current user after successful login
  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user); // Update the current user
    sessionStorage.setItem('currentUser', JSON.stringify(user)); // Store user in sessionStorage
  }

  // Get the current user
  getCurrentUser(): any {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  // Get the current user's ID
  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null; // Return the user ID or null if no user is logged in
  }

  // Clear the current user (logout)
  clearCurrentUser(): void {
    this.currentUserSubject.next(null); // Clear the current user
    sessionStorage.removeItem('currentUser'); // Remove user from sessionStorage
  }

  setNewPassword(payload: { token: string; password: string }) {
    return this.http.post(`${environment.apiUrl}/reset-password`, payload);
  }

  getWorkspaceData(): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // Retrieve stored token
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

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  resetPassword(payload: any) {
    return this.http.post(`${environment.apiUrl}/forgot-password`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}