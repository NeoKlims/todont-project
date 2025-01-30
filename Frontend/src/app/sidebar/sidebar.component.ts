import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../task-services/todo.service';
import { TodoList } from '../models/todo-list.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
     <div class="sidebar">
      <button class="create-btn" (click)="showCreateList = true">
        + Create List
      </button>

      <div class="lists-section">
        <div
          class="list-item"
          *ngFor="let list of (showTodont ? todontLists$ : todoLists$) | async"
          [class.starred]="list.isStarred"
        >
          <div class="list-item-content">
            <span class="checkbox">✓</span>
            <span *ngIf="!editingListId || editingListId !== list.id">
              {{ list.name }}
            </span>
            <input
              *ngIf="editingListId === list.id"
              #editInput
              type="text"
              [value]="list.name"
              (keyup.enter)="updateListName(list.id, editInput.value)"
              (blur)="updateListName(list.id, editInput.value)"
              class="edit-input"
            />
          </div>
          <div class="list-actions">
            <button
              class="star-btn"
              [class.starred]="list.isStarred"
              (click)="toggleListStar(list.id)"
            >
              ★
            </button>
            <div class="menu-container">
              <button
                class="more-options"
                (click)="showMenu[list.id] = !showMenu[list.id]"
              >
                ⋮
              </button>
              <div class="menu" *ngIf="showMenu[list.id]">
                <button (click)="startEditing(list.id)">Edit</button>
                <button (click)="deleteList(list.id)">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="create-list-form" *ngIf="showCreateList">
        <input
          #listInput
          type="text"
          placeholder="New list name"
          (keyup.enter)="createList(listInput.value); listInput.value = ''"
        />
        <div class="form-actions">
          <button (click)="showCreateList = false">Cancel</button>
          <button
            (click)="createList(listInput.value); listInput.value = ''"
            class="create"
          >
            Create
          </button>
        </div>
      </div>
    </div>  
  `,
  styles: [
    `
      .sidebar {
        width: 250px;
        height: 100%;
        border-right: 1px solid #e0e0e0;
        padding: 16px;
      }

      .create-btn {
        width: 100%;
        padding: 8px 16px;
        border-radius: 20px;
        border: none;
        background: #fff;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        margin-bottom: 16px;
      }

      .list-item {
        padding: 8px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        border-radius: 4px;
      }

      .list-item:hover {
        background: #f5f5f5;
      }

      .list-item-content {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
      }

      .checkbox {
        color: #1a73e8;
      }

      .list-actions {
        display: flex;
        gap: 4px;
        opacity: 0;
      }

      .list-item:hover .list-actions {
        opacity: 1;
      }

      .create-list-form {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 220px;
      }

      .create-list-form input {
        width: 100%;
        padding: 8px;
        margin-bottom: 16px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
      }

      .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }

      .form-actions button {
        padding: 6px 12px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }

      .form-actions button.create {
        background: #1a73e8;
        color: white;
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

      .more-options {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 20px;
        padding: 4px;
      }
    `,
  ],
})
export class SidebarComponent {
  @Input() showTodont: boolean = false; // Get showTodont from WorkspaceComponent
  todoLists$: any;
  todontLists$: any;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
      this.loadLists();
  }

  ngOnChanges() {
      this.loadLists();
  }

  private loadLists() {
      if (this.showTodont) {
          this.todontLists$ = this.todoService.getTodontLists();
      } else {
          this.todoLists$ = this.todoService.getTodoLists();
      }
  }



  showCreateList = false;
  showMenu: { [key: string]: boolean } = {};
  editingListId: string | null = null;

  createList(name: string) {
    if (name.trim()) {
      this.todoService.addTodoList(name, this.showTodont);
      this.showCreateList = false;
    }
  }

  deleteList(listId: string) {
    this.todoService.deleteList(listId, this.showTodont);
    this.showMenu[listId] = false;
  }

  startEditing(listId: string) {
    this.editingListId = listId;
    this.showMenu[listId] = false;
  }

  updateListName(listId: string, newName: string) {
    this.todoService.updateListName(listId, newName, this.showTodont);
    this.editingListId = null;
  }

  toggleListStar(listId: string) {
    this.todoService.toggleListStar(listId, this.showTodont);
  }
}
