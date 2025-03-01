import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false
})
export class ForgotPasswordComponent {
  resetForm: FormGroup;
  isLoading = false;
  isSuccess = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const emailPayload = { email: this.resetForm.value.email };
  
      this.authService.resetPassword(emailPayload).subscribe({
        next: (response: any) => {
          this.isSuccess = true;
          this.isLoading = false; 
        },
        error: (error) => {
          if (error.status === 429) {
            this.errorMessage = 'Debes esperar antes de intentar nuevamente.';
          } else {
            this.errorMessage = error?.error?.message || 'Ha ocurrido un error al enviar el correo.';
          }
          this.isLoading = false;
        }
      });
    }
  }
  
}
