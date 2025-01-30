// components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /*onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Login failed';
          this.isLoading = false;
        }
      });
    }
  }*/

    onSubmit() {
      if (this.loginForm.valid) {
        this.isLoading = true;
        this.errorMessage = '';
    
        this.authService.login(this.loginForm.value).subscribe({
          next: (response) => {
            this.isLoading = false;
    
            if (response.token) {
              // Store token for future requests
              localStorage.setItem('authToken', response.token);
    
              // Navigate to the workspace with the token
              this.router.navigate(['/workspace', response.token]);
            } else {
              this.errorMessage = 'Invalid login response. No token received.';
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage =
              err.error?.message || 'Login failed. Please try again.';
          },
        });
      }
    }
}
