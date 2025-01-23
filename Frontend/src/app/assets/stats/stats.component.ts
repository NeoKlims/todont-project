import { Component,OnInit  } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Stat } from '../../models/stat.model';

@Component({
  selector: 'app-stats',
  standalone: false,
  
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  stats: Stat[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.stats = this.dataService.getStats();
  }
}
