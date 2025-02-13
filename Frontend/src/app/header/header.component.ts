import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn: boolean = false; // Track login status

  constructor(private authService: AuthService, private router: Router) {
    // Check if the user is logged in when the component initializes
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  navLinks = [
    { label: 'Home', url: '/home' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact-us' }
  ];

  get hasAuthToken(): boolean {
    return this.authService.hasAuthToken();
  }
  
  logout(event: Event): void {
    event.preventDefault();

    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}