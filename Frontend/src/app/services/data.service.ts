import { Injectable } from '@angular/core';

import { ServiceItem } from '../models/service-item.model';
import { Stat } from '../models/stat.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getServiceItems(): ServiceItem[] {
    return [
      {
        title: 'Create TODONT Lists',
        description: 'Effortlessly manage your tasks and projects.',
      },
      {
        title: 'Match your priorities',
        description: 'Align your efforts with your key objectives.',
      },
      {
        title: 'Share your creation with others',
        description: 'Collaborate and get feedback from your team.',
      },
    ];
  }
}
