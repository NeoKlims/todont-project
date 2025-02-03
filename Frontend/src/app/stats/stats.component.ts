import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Stat } from '../models/stat.model';
interface StatItem {
  icon: string;
  value: string;
  label: string;
  color: string;
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
      icon: 'users',
      value: '2,500+',
      label: 'Satisfied Clients',
      color: '#3498db',
    },
    {
      icon: 'rocket',
      value: '150+',
      label: 'Projects Completed',
      color: '#2ecc71',
    },
    {
      icon: 'trophy',
      value: '25',
      label: 'Awards Won',
      color: '#f39c12',
    },
    {
      icon: 'globe',
      value: '10+',
      label: 'Countries Served',
      color: '#e74c3c',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
