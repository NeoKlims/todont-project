import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoList,TodontList } from '../models/todo-list.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { TodontService } from '../services/todont.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Input() showTodont: boolean = false; // Determines if it's a To-Don't list

  todoLists$!: Observable<TodoList[]>; // Observable for Todo lists
  todontLists$!: Observable<TodontList[]>; // Observable for Todont lists

  showCreateList = false; // Toggle visibility of the create list form
  showMenu: { [key: string]: boolean } = {}; // Toggle visibility of list menus
  editingListId: number | null = null; // Track which list is being edited

  constructor(private todoService: TodoService, private todontService: TodontService) {}

  toggleListVisibility(listId: number, isTodont: boolean = false) {
    
    if (this.showTodont) {
      this.todontService.toggleListVisibility(listId);
    } else {
      this.todoService.toggleListVisibility(listId);
    }
  }

  ngOnInit(): void {
    this.loadLists();
  }

  ngOnChanges(): void {
    this.loadLists();
  }

  // Load lists based on the current mode (Todo or Todont)
  private loadLists(): void {
    if (this.showTodont) {
      this.todontLists$ = this.todontService.getTodontLists();
    } else {
      this.todoLists$ = this.todoService.getTodoLists();
    }
  }

  // Create a new list
  createList(name: string): void {
    if (name.trim()) {
      if (this.showTodont) {
        this.todontService.addTodontList(name);
        this.showCreateList = false;
      } else {
        this.todoService.addTodoList(name);
        this.showCreateList = false;
      }
    }
  }

  // Delete a list
  deleteList(listId: number): void {
    if (this.showTodont) {
      this.todontService.deleteList(listId);
      this.showMenu[listId] = false;
    } else {
      this.todoService.deleteList(listId);
      this.showMenu[listId] = false;
    }
  }

  // Start editing a list name
  startEditing(listId: number): void {
    this.editingListId = listId;
    this.showMenu[listId] = false;
  }

  // Update a list name
  updateListName(listId: number, newName: string): void {
    if (newName.trim()) {
      if (this.showTodont) {
        this.todontService.updateListName(listId, newName, this.showTodont);
        this.editingListId = null;
      } else {
        this.todoService.updateListName(listId, newName, this.showTodont);
        this.editingListId = null;
      }
    }
  }

  // Toggle list star status
  // toggleListStar(listId: string): void {
  //   this.todoService.toggleListStar(listId, this.showTodont);
  // }
}

