import { Injectable } from '@angular/core';

import { FeaturedService } from '../models/featured-service.model';
import { ServiceItem } from '../models/service-item.model';
import { Stat } from '../models/stat.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getFeaturedServices(): FeaturedService[] {
    return [
      {
        image: 'nanozest-mate.jpg',
        title: 'Nanozest Mate',
        description: 'Discover the latest digital trends and innovations.'
      },
      {
        image: 'evole-commend.jpg',
        title: 'Evole Commend',
        description: 'Collaborate seamlessly with your team.'
      },
      {
        image: 'laido-hoist.jpg',
        title: 'Laido Hoist',
        description: 'Leverage powerful tools to boost your productivity.'
      }
    ];
  }

  getServiceItems(): ServiceItem[] {
    return [
      {
        title: 'Create TCODNT Lists',
        description: 'Effortlessly manage your tasks and projects.'
      },
      {
        title: 'Match your priorities',
        description: 'Align your efforts with your key objectives.'
      },
      {
        title: 'Share your creation with others',
        description: 'Collaborate and get feedback from your team.'
      },
      {
        title: 'Other thing',
        description: 'Explore our other valuable services.'
      }
    ];
  }

  getStats(): Stat[] {
    return [
      { value: 'Amount of', label: '-' },
      { value: 'Infinity', label: '-' },
      { value: '24/7', label: '-' },
      { value: '4', label: '-' }
    ];
  }
}
