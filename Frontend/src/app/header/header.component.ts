import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  navLinks = [
    { label: 'Home', url: '/home' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/services' },
    { label: 'Contact', url: '/contact-us' }
  ];

  isLoggedIn: boolean = false;
  username: string = '';
  dropdownOpen: boolean = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) {}

ngOnInit() {
  this.authService.isLoggedIn.subscribe(status => {
    this.isLoggedIn = status;
    this.cdr.detectChanges();
  });

  this.authService.currentUsername.subscribe(name => {
    this.username = name;
    this.cdr.detectChanges();
  });
}

  logout() {
    this.authService.logout();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
