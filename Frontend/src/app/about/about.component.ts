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
      title: 'Example headline.',
      text: 'Some representative placeholder content for the first slide of the carousel.',
      buttonText: 'Sign up today',
      buttonLink: '/login',
      image: 'aboutus1.jpg',
    },
    {
      title: 'Another example headline.',
      text: 'Some representative placeholder content for the second slide of the carousel.',
      buttonText: 'Learn more',
      buttonLink: '/login',
      image: 'aboutus2.jpg',
    },
    {
      title: 'One more for good measure.',
      text: 'Some representative placeholder content for the third slide of this carousel.',
      buttonText: 'Enter the workspace',
      buttonLink: '/login',
      image: 'aboutus3.jpg',
    },
  ];

  cards = [
    {
      title: 'Adrian',
      description: 'Backend',
    },
    {
      title: 'Archie',
      description: 'Backend',
    },
    {
      title: 'Nikita',
      description: 'Frontend',
    },
    {
      title: 'Diego',
      description: 'Frontend',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getImageUrl(image: string): string {
    return `assets/images/${image}`; // Asegúrate de que las imágenes estén en 'assets/images/'
  }
}
