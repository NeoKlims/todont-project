import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { TodoList } from '../models/todo-list.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
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
