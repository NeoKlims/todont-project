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
      image: '',
      value: '150+',
      label: 'Projects Completed',
    },
    {
      image: '',
      value: '25',
      label: 'Awards Won',
    },
    {
      image: '',
      value: '10+',
      label: 'Countries Served',
    },
  ];

  getImageUrl(image: string): string {
    return `assets/images/${image}`; // Forma la URL correcta
  }
  constructor() {}

  ngOnInit(): void {}
}
