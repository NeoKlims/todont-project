import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../task-services/todo.service';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, TodoListComponent],
  template: `
    <div class="workspace">
      <div class="toggle-container">
        <div class="toggle-switch">
          <input 
            type="checkbox" 
            id="listToggle" 
            [checked]="showTodont"
            (change)="toggleListType(!showTodont)"
          >
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
      <app-todo-list
        *ngFor="let list of (showTodont ? todontLists$ : todoLists$) | async"
        [list]="list"
        [isTodont]="showTodont"
      ></app-todo-list>
    </div>
  `,
  styles: [`
    .workspace {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      height: 100%;
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
  `],
})
export class WorkspaceComponent {
  todoLists$: any;
  todontLists$: any;
  showTodont = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoLists$ = this.todoService.getTodoLists();
    this.todontLists$ = this.todoService.getTodontLists();
  }

  toggleListType(showTodont: boolean): void {
    this.showTodont = showTodont;
  }
}