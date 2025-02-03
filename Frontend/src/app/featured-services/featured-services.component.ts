import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { FeaturedService } from '../models/featured-service.model';

@Component({
  selector: 'app-featured-services',
  standalone: false,

  templateUrl: './featured-services.component.html',
  styleUrl: './featured-services.component.css',
})
export class FeaturedServicesComponent {
  featuredServices: FeaturedService[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.featuredServices = this.dataService.getFeaturedServices();
  }
}
