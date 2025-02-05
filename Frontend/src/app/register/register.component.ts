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

  onSubmit() {
    console.log('onSubmit() triggered');

    if (this.registerForm.valid) {
        this.isLoading = true;
        this.errorMessage = '';

        const { name, email, password, confirmPassword } = this.registerForm.value;
        console.log('Form Values:', { name, email, password, confirmPassword });

        // Ensure the payload matches the backend's expectations
        const payload = {
            name,
            email,
            password,
            password_confirmation: confirmPassword
        };
        console.log('Payload:', payload);

        this.authService.register(payload).subscribe({
            next: (response) => {
                console.log('Registration Success:', response);

                // After successful registration, log the user in
                this.authService.login({ email, password }).subscribe({
                    next: (loginResponse) => {
                        this.isLoading = false;
                        console.log('Login Response:', loginResponse);

                        if (loginResponse.token) {
                            // Store the token in localStorage
                            localStorage.setItem('authToken', loginResponse.token);
                            console.log('Token Stored:', loginResponse.token);
                            sessionStorage.setItem('authToken', response.token);
                            this.authService.setCurrentUser(response.user);
                            // Redirect to the workspace or dashboard
                            this.router.navigate(['/workspace', loginResponse.token]);
                            console.log('Navigation to /workspace successful');
                        } else {
                            this.errorMessage = 'Login failed after registration. No token received.';
                            console.error(this.errorMessage);
                        }
                    },
                    error: (loginError) => {
                        this.isLoading = false;
                        this.errorMessage = loginError.error?.message || 'Login failed after registration. Please try again.';
                        console.error('Login Error:', loginError);
                    }
                });
            },
            error: (err) => {
                this.isLoading = false;
                this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
                console.error('Registration Error:', err);
            }
        });
    } else {
        console.warn('Form is invalid:', this.registerForm.errors);
    }
}

}