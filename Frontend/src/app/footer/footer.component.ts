import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,

  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  socialLinks = [
    {
      platform: 'Facebook',
      url: 'https://facebook.com',
      icon: 'assets/images/facebook.png',
    },
    { platform: 'X', url: 'https://x.com', icon: 'assets/images/x.png' },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'assets/images/linkedin.png',
    },
  ];
}
