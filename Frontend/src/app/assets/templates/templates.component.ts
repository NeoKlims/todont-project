import { Component } from '@angular/core';

@Component({
  selector: 'app-templates',
  standalone: false,
  
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.css'
})
export class TemplatesComponent {
  templates = [
    {
      name: 'Tareas personales',
      description: 'Gestiona tus tareas diarias',
      icon: 'assets/personal-icon.svg'
    },
    // Add more templates...
  ];
}
