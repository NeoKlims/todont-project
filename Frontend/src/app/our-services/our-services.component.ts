import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ServiceItem } from '../models/service-item.model';

@Component({
  selector: 'app-services',
  standalone: false,
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css'],
})
export class OurServicesComponent implements OnInit {
  serviceItems: ServiceItem[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    // Obtiene los items de servicio desde el servicio
    this.serviceItems = this.dataService.getServiceItems();
  }

  // Método para obtener la URL correcta de la imagen
  getImageUrl(image: string): string {
    return `assets/images/${image}`; // Asegúrate de que las imágenes estén en la carpeta 'assets/images/'
  }
}
