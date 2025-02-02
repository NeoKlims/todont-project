import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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
  private loggedIn = new BehaviorSubject<boolean>(false);
  private username = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  /*login(credentials: LoginCredentials): Observable<any> {
    // Implement actual login logic here
    return of({ success: true });
  }*/
 
    private checkToken() {
      if (typeof window !== 'undefined' && window.localStorage) {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Si el token está presente, se considera que el usuario está autenticado
          this.loggedIn.next(true);
          this.getUsernameFromToken(token); // Puedes llamar a un método para obtener el nombre si es necesario
        }
      }
    }
  
    // Obtener el nombre de usuario usando el token (si es necesario)
    private getUsernameFromToken(token: string) {
      // Aquí deberías hacer una petición al backend si necesitas recuperar el nombre
      // de usuario desde el token. Puedes crear un endpoint para obtener el usuario.
      this.http.get(`${this.apiUrl}/user`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      }).subscribe((response: any) => {
        this.username.next(response.name);
      });
    }

    getUserNameByEmail(email: string): void {
      this.http.get(`${this.apiUrl}/get-name-by-email?email=${email}`).subscribe(
        (response: any) => {
          this.username.next(response.name);
        },
        error => {
          console.error('Error al obtener el nombre del usuario:', error);
        }
      );
    }
    


    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }).pipe(
        tap((response: any) => {
          console.log(response);
          if (response.token) {
            this.loggedIn.next(true);
            localStorage.setItem('authToken', response.token);
            this.getUserNameByEmail(credentials.email);
          }
        })
      );
    }

    logout() {
      this.loggedIn.next(false);
      this.username.next('');
      localStorage.removeItem('authToken');
    }
  
    get isLoggedIn() {
      return this.loggedIn.asObservable();
    }
  
    get currentUsername() {
      return this.username.asObservable();
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
