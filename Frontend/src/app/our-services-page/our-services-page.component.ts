import { Component } from '@angular/core';

@Component({
  selector: 'app-our-services-page',
  standalone: false,

  templateUrl: './our-services-page.component.html',
  styleUrl: './our-services-page.component.css',
})
export class OurServicesPageComponent {
  cards = [
    {
      image: 'unsplash-photo-1.jpg',
      title: 'Short title, long jacket',
      avatar: 'https://github.com/twbs.png',
      location: 'Earth',
      time: '3d',
    },
    {
      image: 'unsplash-photo-2.jpg',
      title: 'Much longer title that wraps to multiple lines',
      avatar: 'https://github.com/twbs.png',
      location: 'Pakistan',
      time: '4d',
    },
    {
      image: 'unsplash-photo-3.jpg',
      title: 'Another longer title belongs here',
      avatar: 'https://github.com/twbs.png',
      location: 'California',
      time: '5d',
    },
  ];
}
