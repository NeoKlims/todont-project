import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  standalone: false,
  
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features = [
    {
      title: 'Captura tareas a la velocidad del pensamiento',
      description: 'Hemos puesto todo de una manera eficiente. Todo está para que sea una extensión de tu mente.'
    },
    {
      title: 'Aumenta la concentración y organización',
      description: 'Mantén todo perfectamente organizado y las tareas en línea. Prioriza y utilízalo como personalmente te saca más provecho.'
    },
    {
      title: 'Simplifica la planificación',
      description: 'Automatiza tu tiempo y esfuerzo. Establece fechas de vencimiento y programa tareas periódicas.'
    }
  ];
}
