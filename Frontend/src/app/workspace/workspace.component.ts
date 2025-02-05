import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, TodoListComponent, SidebarComponent],
  template: `
     <div class="workspace">
      <div class="toggle-container">
        <div class="toggle-switch">
          <input
            type="checkbox"
            id="listToggle"
            [checked]="showTodont"
            (change)="toggleListType(!showTodont)"
          />
          <label for="listToggle" class="toggle-label">
            <span class="toggle-button">
              <i class="toggle-icon">
                {{ !showTodont ? '✓' : '✕' }}
              </i>
            </span>
          </label>
          <span class="toggle-text" [class.active]="!showTodont">Todo</span>
          <span class="toggle-text" [class.active]="showTodont">Todont</span>
        </div>
      </div>
      <div class="main-content">
        <app-sidebar [showTodont]="showTodont"></app-sidebar>
        <app-todo-list
          *ngFor="let list of (showTodont ? todontLists$ : todoLists$) | async"
          [list]="list"
          [isTodont]="showTodont"
        ></app-todo-list>
      </div>
    </div>
  `,
  styles: [`
    .workspace {
      padding: 120px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100vh;
      overflow-y: auto;
    }

    .toggle-container {
      display: flex;
      justify-content: flex-start;
      padding: 8px 16px;
    }

    .toggle-switch {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    input[type="checkbox"] {
      display: none;
    }

    .toggle-label {
      position: relative;
      display: block;
      width: 48px;
      height: 24px;
      background-color: #e4e4e4;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .toggle-button {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background-color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease;
    }

    .toggle-icon {
      font-style: normal;
      font-size: 12px;
      color: #007bff;
    }

    input[type="checkbox"]:checked + .toggle-label {
      background-color: #e4e4e4;
    }

    input[type="checkbox"]:checked + .toggle-label .toggle-button {
      transform: translateX(24px);
      background-color: #fff;
    }

    input[type="checkbox"]:checked + .toggle-label .toggle-icon {
      color: #dc3545;
    }

    .toggle-text {
      font-size: 14px;
      font-weight: 500;
      color: #666;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .toggle-text.active {
      color: #007bff;
    }

    .lists-container {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }
    .main-content{
        display: flex;
        height: 100%;
    }
  `],
})
export class WorkspaceComponent {
  todoLists$: any;
  todontLists$: any;
  showTodont = false;
  token: string | null = '';
  workspaceData: any;

  constructor(private todoService: TodoService,private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLists();
    /*this.authService.getWorkspaceData().subscribe({
      next: (data) => {
        this.workspaceData = data;
        console.log('Workspace Data:', data);
      },
      error: (err) => {
        console.error('Error fetching workspace data:', err);
      },
    });*/

  }

  toggleListType(showTodont: boolean): void {
    this.showTodont = showTodont;
    this.loadLists(); // Reload lists when toggle changes
  }

  private loadLists() {
      if (this.showTodont) {
          this.todontLists$ = this.todoService.getTodontLists();
      } else {
          this.todoLists$ = this.todoService.getTodoLists();
      }
  }
}