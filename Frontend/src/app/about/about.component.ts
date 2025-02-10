import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  carouselSlideCode: SafeHtml;
  constructor(private sanitizer: DomSanitizer) {
    this.carouselSlideCode = this.sanitizer.bypassSecurityTrustHtml(`
    <svg
      class="bd-placeholder-img"
      width="100%"
      height="70vh"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <rect width="100%" height="100%" fill="var(--bs-secondary-color)" />
    </svg>
  `);
  }

  slides = [
    {
      title: 'Example headline.',
      text: 'Some representative placeholder content for the first slide of the carousel.',
      buttonText: 'Sign up today',
      buttonLink: '#',
    },
    {
      title: 'Another example headline.',
      text: 'Some representative placeholder content for the second slide of the carousel.',
      buttonText: 'Learn more',
      buttonLink: '#',
    },
    {
      title: 'One more for good measure.',
      text: 'Some representative placeholder content for the third slide of this carousel.',
      buttonText: 'Browse gallery',
      buttonLink: '#',
    },
  ];

  cards = [
    {
      title: 'Heading 1',
      description: 'Content for the first column.',
      link: '#',
    },
    {
      title: 'Heading 2',
      description: 'Content for the second column.',
      link: '#',
    },
    {
      title: 'Heading 3',
      description: 'Content for the third column.',
      link: '#',
    },
  ];
}
