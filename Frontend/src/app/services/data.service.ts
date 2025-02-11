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
        title: 'High Quality',
        description: 'Web Design',
      },
      {
        image: 'icon2.png',
        title: 'Fast Delivery',
        description: 'App Development',
      },
      {
        image: 'icon3.png',
        title: 'Affordable Prices',
        description: 'SEO Optimization',
      },
    ];
  }
}
