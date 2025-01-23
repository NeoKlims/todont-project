import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  companyInfo = {
    email: 'info@tcodnt.com',
    phone: '123-456-7890',
    address: 'Address'
  };

  socialLinks = [
    { platform: 'Facebook', url: '#' },
    { platform: 'Twitter', url: '#' },
    { platform: 'LinkedIn', url: '#' }
  ];
}
