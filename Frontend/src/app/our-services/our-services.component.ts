import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { ServiceItem } from '../models/service-item.model';

@Component({
  selector: 'app-services',
  standalone: false,

  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css',
})
export class OurServicesComponent {
  serviceItems: ServiceItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.serviceItems = this.dataService.getServiceItems();
  }
}
