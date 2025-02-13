import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
  standalone: false
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  isLoading = false;
  isSuccess = false;
  errorMessage = '';
  token: string ="";  // Declara el token
  email: string="";  // Declara el email

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.newPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];  // Obtén el token de la URL
      this.email = params['email'];  // Obtén el email de la URL
    });

  }

  ngOnInit() {
    // Get token from URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.errorMessage = 'Invalid reset link';
        //this.router.navigate(['/forgot-password']);
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      const payload = {
        token: this.token,  // El token que recibes en la URL
        email: this.email,  // El email del usuario
        password: this.newPasswordForm.value.password,  // La nueva contraseña
        password_confirmation: this.newPasswordForm.value.confirmPassword  // Confirmación de la nueva contraseña
      };
  
      this.authService.setNewPassword(payload).subscribe({
        next: (response) => {
          this.isSuccess = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error details:', err);
          this.errorMessage = err?.error?.message || 'Password reset request failed';
          this.isLoading = false;
        }
      });
    }
  }
  
}