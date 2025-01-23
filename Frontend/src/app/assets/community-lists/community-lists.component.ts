import { Component } from '@angular/core';

@Component({
  selector: 'app-community-lists',
  standalone: false,

  templateUrl: './community-lists.component.html',
  styleUrl: './community-lists.component.css',
})
export class CommunityListsComponent {
  // Future: Add community list data and logic
  communityLists: any[] = [];
}
