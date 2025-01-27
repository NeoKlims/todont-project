import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navLinks = [
    { label: 'Home', url: '/home' },
    { label: 'About', url: '/about' },
    { label: 'Services', url: '/workspace' },
    { label: 'Contact', url: '/contact-us' }
  ];
}
