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
  token: string = '';

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
    if (this.newPasswordForm.valid && this.token) {
      this.isLoading = true;
      this.errorMessage = '';

      const payload = {
        token: this.token,
        password: this.newPasswordForm.get('password')?.value
      };

      this.authService.setNewPassword(payload).subscribe({
        next: () => {
          this.isSuccess = true;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to update password';
          this.isLoading = false;
        }
      });
    }
  }
}