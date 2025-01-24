import { Component } from '@angular/core';

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
  styleUrl: './about.component.css'
})
export class AboutComponent {
  companyDescription = `
  TCODNT is an innovative technology company dedicated to transforming 
  digital experiences through cutting-edge solutions and user-centric design.
`;

teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 15 years of tech innovation experience.',
    image: 'assets/team/john-doe.jpg'
  },
  {
    name: 'Jane Smith',
    role: 'CTO',
    bio: 'Technical expert specializing in cloud and AI technologies.',
    image: 'assets/team/jane-smith.jpg'
  },
  {
    name: 'Mike Johnson',
    role: 'Design Director',
    bio: 'Award-winning designer focusing on user experience.',
    image: 'assets/team/mike-johnson.jpg'
  }
];

companyValues = [
  'Innovation',
  'Integrity',
  'Customer Success',
  'Continuous Learning'
];
}
