import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services-page', // Selector del componente
  standalone: false,
  templateUrl: './our-services-page.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./our-services-page.component.css'], // Ruta de los estilos CSS
})
export class OurServicesPageComponent {
  // Sección de tarjetas de servicios (sin cambios)
  cards = [
    {
      image: 'assets/images/services1.jpg',
      title: 'Short title, long jacket',
    },
    {
      image: 'assets/images/services2.jpg',
      title: 'Much longer title that wraps to multiple lines',
    },
    {
      image: 'assets/images/services3.jpg',
      title: 'Another longer title belongs here',
    },
  ];

  // Sección de videos con descripciones
  services = [
    {
      video: 'assets/videos/services-video1.mp4', // Cambia la imagen por un video
      title: 'Servicio 1',
      description: 'Descripción breve del servicio 1.',
      align: 'left-align',
    },
    {
      video: 'assets/videos/services-video2.mp4', // Cambia la imagen por un video
      title: 'Servicio 2',
      description: 'Descripción breve del servicio 2.',
      align: 'right-align',
    },
  ];
}
