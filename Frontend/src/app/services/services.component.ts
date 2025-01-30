import { Component } from '@angular/core';
import { DataService } from '../task-services/data.service';
import { ServiceItem } from '../models/service-item.model';

@Component({
  selector: 'app-services',
  standalone: false,

  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent {
  serviceItems: ServiceItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.serviceItems = this.dataService.getServiceItems();
  }
}
