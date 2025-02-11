import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Stat } from '../models/stat.model';
interface StatItem {
  image: string;
  value: string;
  label: string;
}
@Component({
  selector: 'app-stats',
  standalone: false,

  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  stats: StatItem[] = [
    {
      image: 'satisfiedclient.jpg',
      value: '2,500+',
      label: 'Satisfied Clients',
    },
    {
      image: 'girlwriting.jpg',
      value: '500+',
      label: 'Lists Created',
    },
    {
      image: 'peopleworking.jpg',
      value: '200+',
      label: 'Projects Completed',
    },

    {
      image: 'win.jpg',
      value: '1,000+',
      label: 'Goals Achieved',
    },
  ];

  getImageUrl(image: string): string {
    return `assets/images/${image}`; // Forma la URL correcta
  }
  constructor() {}

  ngOnInit(): void {}
}
