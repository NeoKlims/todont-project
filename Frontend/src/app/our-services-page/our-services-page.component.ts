import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services-page',
  standalone: false,
  templateUrl: './our-services-page.component.html',
  styleUrls: ['./our-services-page.component.css'],
})
export class OurServicesPageComponent {
  // Sección de tarjetas de servicios (sin cambios)
  cards = [
    {
      image: 'assets/images/services1.jpg',
      title: 'Organize with Purpose',
    },
    {
      image: 'assets/images/services2.jpg',
      title: 'Beat the Clock',
    },
    {
      image: 'assets/images/services3.jpg',
      title: 'Break Free',
    },
  ];

  // Sección de videos con descripciones
  services = [
    {
      video: 'assets/videos/services-video1.mp4',
      title: 'Master Your Time',
      description: 'Stay on top of deadlines and make every second count.',
      align: 'left-align',
    },
    {
      video: 'assets/videos/services-video2.mp4',
      title: 'Track Your Progress',
      description: 'Check off tasks, stay motivated, and achieve more.',
      align: 'right-align',
    },
  ];
}
