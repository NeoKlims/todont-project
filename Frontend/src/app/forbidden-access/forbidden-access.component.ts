// forbidden-access.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden-access',
  templateUrl: './forbidden-access.component.html',
  styleUrls: ['./forbidden-access.component.css']
})
export class ForbiddenAccessComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}