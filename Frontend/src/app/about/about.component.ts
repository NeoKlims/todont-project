import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  slides = [
    {
      title: 'Hard Work, Smart Results',
      text: 'We believe in dedication and efficiency. Great things happen when we stay focused.',
      buttonText: 'Sign up today',
      buttonLink: '/login',
      image: 'aboutus1.jpg',
    },
    {
      title: 'Stronger Together',
      text: 'Collaboration fuels success. We support and uplift each other every step of the way.',
      buttonText: 'Stay organized',
      buttonLink: '/login',
      image: 'aboutus2.jpg',
    },
    {
      title: 'Celebrate Every Win',
      text: 'Every milestone counts. We grow, improve, and celebrate as a team.',
      buttonText: 'Enter the workspace',
      buttonLink: '/login',
      image: 'aboutus3.jpg',
    },
  ];

  cards = [
    {
      title: 'Adrian & Archie',
      subtitle: 'Backend Architects',
      description:
        'The fundamental pillars of Todont. They ensure everything runs smoothly behind the scenes, suffering with AWS, handling databases and APIs.',
    },
    {
      title: 'Nikita & Diego',
      subtitle: 'Frontend Innovators',
      description:
        'Designing and building an intuitive, pretty experience. They bring the vision to life with clean and responsive UI.',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getImageUrl(image: string): string {
    return `assets/images/${image}`; // Asegúrate de que las imágenes estén en 'assets/images/'
  }
}
