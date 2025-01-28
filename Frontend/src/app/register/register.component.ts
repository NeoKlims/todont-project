import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  /*onSubmit() {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.errorMessage = error.message || 'Registration failed';
          this.isLoading = false;
        }
      });
    }
  }*/

    onSubmit() {
      if (this.registerForm.valid) {
        this.isLoading = true;
        this.errorMessage = '';
    
        const { name, email, password } = this.registerForm.value;
    
        this.authService.register({ name, email, password, password_confirmation: this.registerForm.value.confirmPassword })
          .subscribe({
            next: () => {
              this.isLoading = false;
              this.router.navigate(['/login']);
            },
            error: (err) => {
              this.isLoading = false;
              this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
            }
          });
      }
    }
}