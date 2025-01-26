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
      <app-todo-list
        *ngFor="let list of todoLists$ | async"
        [list]="list"
      ></app-todo-list>
    </div>
  `,
  styles: [
    `
      .workspace {
        padding: 16px;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        height: 100%;
        overflow-y: auto;
      }
    `,
  ],
})
export class WorkspaceComponent {
  todoLists$: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoLists$ = this.todoService.getTodoLists();
  }
}
