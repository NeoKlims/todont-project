import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoList, TodoTask } from '../models/todo-list.model';
import { TodoService } from '../task-services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="todo-list">
      <div class="list-header">
        <div class="header-left">
          <h2 *ngIf="!isEditing">{{ list.name }}</h2>
          <input
            *ngIf="isEditing"
            #editInput
            type="text"
            [value]="list.name"
            (keyup.enter)="updateListName(editInput.value)"
            (blur)="updateListName(editInput.value)"
            class="edit-input"
          />
        </div>
        <div class="header-actions">
          <button
            class="star-btn"
            [class.starred]="list.isStarred"
            (click)="toggleListStar()"
          >
            ★
          </button>
          <div class="menu-container">
            <button class="more-options" (click)="showListMenu = !showListMenu">
              ⋮
            </button>
            <div class="menu" *ngIf="showListMenu">
              <button (click)="startEditing()">Edit</button>
              <button (click)="deleteList()">Delete</button>
            </div>
          </div>
        </div>
      </div>

      <div class="tasks">
        <div
          *ngFor="let task of pendingTasks"
          class="task-item"
          [class.completed]="task.completed"
        >
          <div class="task-content">
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
            />
            <span *ngIf="!editingTaskId || editingTaskId !== task.id">
              {{ task.title }}
            </span>
            <input
              *ngIf="editingTaskId === task.id"
              #taskEditInput
              type="text"
              [value]="task.title"
              (keyup.enter)="updateTaskTitle(task.id, taskEditInput.value)"
              (blur)="updateTaskTitle(task.id, taskEditInput.value)"
              class="edit-input"
            />
          </div>
          <div class="task-actions">
            <button
              class="star-btn"
              [class.starred]="task.isStarred"
              (click)="toggleTaskStar(task.id)"
            >
              ★
            </button>
            <div class="menu-container">
              <button
                class="more-options"
                (click)="showTaskMenu[task.id] = !showTaskMenu[task.id]"
              >
                ⋮
              </button>
              <div class="menu" *ngIf="showTaskMenu[task.id]">
                <button (click)="startEditingTask(task.id)">Edit</button>
                <button (click)="deleteTask(task.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button (click)="toggleCompletedSection()">
        {{ showCompleted ? 'Hide completed tasks' : 'Show completed tasks' }}
      </button>

      <div *ngIf="showCompleted" id="completed-section">
        <h4>Completed tasks</h4>
        <div *ngFor="let task of completedTasks" class="task-item completed">
          <div class="task-content">
            <input
              type="checkbox"
              [checked]="task.completed"
              (change)="toggleTask(task.id)"
            />
            <span>{{ task.title }}</span>
          </div>
          <div class="task-actions">
            <button
              class="star-btn"
              [class.starred]="task.isStarred"
              (click)="toggleTaskStar(task.id)"
            >
              ★
            </button>
          </div>
        </div>
      </div>

      <div class="add-task">
        <input
          #taskInput
          type="text"
          placeholder="Add a task"
          (keyup.enter)="addTask(taskInput.value); taskInput.value = ''"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .todo-list {
        background: white;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        margin: 16px;
        padding: 16px;
        width: 300px;
      }

      .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      }

      .header-left {
        flex: 1;
      }

      .header-actions {
        display: flex;
        gap: 8px;
      }

      .list-header h2 {
        margin: 0;
        font-size: 18px;
      }

      .more-options {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 20px;
        padding: 4px 8px;
      }

      .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 0;
        gap: 8px;
      }

      .task-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .task-actions {
        display: flex;
        gap: 4px;
      }

      .task-item.completed span {
        text-decoration: line-through;
        color: #666;
      }

      .add-task input {
        width: 100%;
        padding: 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-top: 16px;
      }

      .menu-container {
        position: relative;
      }

      .menu {
        position: absolute;
        right: 0;
        top: 100%;
        background: white;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        min-width: 120px;
      }

      .menu button {
        display: block;
        width: 100%;
        padding: 8px 16px;
        text-align: left;
        border: none;
        background: none;
        cursor: pointer;
      }

      .menu button:hover {
        background: #f5f5f5;
      }

      .edit-input {
        width: 100%;
        padding: 4px 8px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        font-size: inherit;
      }

      .star-btn {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 16px;
        color: #ccc;
        padding: 4px;
      }

      .star-btn.starred {
        color: #f8c931;
      }
    `,
  ],
})
export class TodoListComponent {
  @Input() list!: TodoList;
  showListMenu = false;
  showTaskMenu: { [key: string]: boolean } = {};
  isEditing = false;
  editingTaskId: string | null = null;
  showCompleted: boolean = false;

  constructor(private todoService: TodoService) {}

  get pendingTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => !task.completed);
  }

  get completedTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => task.completed);
  }

  addTask(title: string) {
    if (title.trim()) {
      this.todoService.addTask(this.list.id, title);
    }
  }

  toggleTask(taskId: string) {
    this.todoService.toggleTask(this.list.id, taskId);
  }

  deleteTask(taskId: string) {
    this.todoService.deleteTask(this.list.id, taskId);
    this.showTaskMenu[taskId] = false;
  }

  deleteList() {
    this.todoService.deleteList(this.list.id);
  }

  startEditing() {
    this.isEditing = true;
    this.showListMenu = false;
  }

  startEditingTask(taskId: string) {
    this.editingTaskId = taskId;
    this.showTaskMenu[taskId] = false;
  }

  updateListName(newName: string) {
    this.todoService.updateListName(this.list.id, newName);
    this.isEditing = false;
  }

  updateTaskTitle(taskId: string, newTitle: string) {
    this.todoService.updateTaskTitle(this.list.id, taskId, newTitle);
    this.editingTaskId = null;
  }

  toggleListStar() {
    this.todoService.toggleListStar(this.list.id);
  }

  toggleTaskStar(taskId: string) {
    this.todoService.toggleTaskStar(this.list.id, taskId);
  }

  toggleCompletedSection() {
    this.showCompleted = !this.showCompleted;
  }
}
