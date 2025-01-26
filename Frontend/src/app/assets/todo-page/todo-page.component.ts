import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
@Component({
  selector: 'app-todo-page',
  imports: [SidebarComponent, WorkspaceComponent],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.css'
})
export class TodoPageComponent {

}
