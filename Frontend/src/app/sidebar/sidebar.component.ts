import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoList } from '../models/todo-list.model';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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
  todontLists$!: Observable<TodoList[]>; // Observable for Todont lists

  showCreateList = false; // Toggle visibility of the create list form
  showMenu: { [key: string]: boolean } = {}; // Toggle visibility of list menus
  editingListId: string | null = null; // Track which list is being edited

  constructor(private todoService: TodoService) {}

  toggleListVisibility(listId: string, isTodont: boolean = false) {
    this.todoService.toggleListVisibility(listId); // Llama al servicio para alternar la visibilidad
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
      this.todontLists$ = this.todoService.getTodontLists();
    } else {
      this.todoLists$ = this.todoService.getTodoLists();
    }
  }

  // Create a new list
  createList(name: string): void {
    if (name.trim()) {
      this.todoService.addTodoList(name, this.showTodont);
      this.showCreateList = false;
    }
  }

  // Delete a list
  deleteList(listId: string): void {
    this.todoService.deleteList(listId, this.showTodont);
    this.showMenu[listId] = false;
  }

  // Start editing a list name
  startEditing(listId: string): void {
    this.editingListId = listId;
    this.showMenu[listId] = false;
  }

  // Update a list name
  updateListName(listId: string, newName: string): void {
    if (newName.trim()) {
      this.todoService.updateListName(listId, newName, this.showTodont);
      this.editingListId = null;
    }
  }

  // Toggle list star status
  toggleListStar(listId: string): void {
    this.todoService.toggleListStar(listId, this.showTodont);
  }
}
