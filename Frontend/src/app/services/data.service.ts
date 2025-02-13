import { Injectable } from '@angular/core';
import { ServiceItem } from '../models/service-item.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  // Método que devuelve los items de servicio
  getServiceItems(): ServiceItem[] {
    return [
      {
        image: 'icon1.png',
        title: 'Effortless Productivity',
        description:
          'Stay organized with an intuitive design. Focus on what truly matters',
      },
      {
        image: 'icon2.png',
        title: 'Streaks & Deadlines',
        description:
          'Hit your goals on time with smart reminders and a streak system that keeps you motivated',
      },
      {
        image: 'icon3.png',
        title: 'Save Time with Lists',
        description:
          'Stay efficient by focusing on the right tasks, skipping the distractions and managing your time.',
      },
    ];
  }
}
