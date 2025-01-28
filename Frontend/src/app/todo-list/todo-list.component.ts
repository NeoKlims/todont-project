import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoList, TodoTask } from '../models/todo-list.model';
import { TodoService } from '../task-services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() list!: TodoList;
  showListMenu = false;
  showTaskMenu: { [key: string]: boolean } = {}; // Menú de tareas independiente
  isEditing = false;
  editingTaskId: string | null = null;
  showCompleted: boolean = false;

  constructor(private todoService: TodoService) {}

  // TOGGLE MENU FOR THE COMPLETED TASKS
  get pendingTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => !task.completed);
  }

  get completedTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => task.completed);
  }

  // ADDING
  addTask(title: string) {
    if (title.trim()) {
      this.todoService.addTask(this.list.id, title);
    }
  }

  // DELETING
  deleteTask(taskId: string) {
    this.todoService.deleteTask(this.list.id, taskId);
    this.showTaskMenu[taskId] = false; // Cerrar el menú de la tarea al eliminarla
  }

  deleteList() {
    this.todoService.deleteList(this.list.id);
  }

  // EDITING
  startEditing() {
    this.isEditing = true;
    this.showListMenu = false; // Cerrar el menú de la lista al editar
  }

  startEditingTask(taskId: string) {
    this.editingTaskId = taskId;
    this.showTaskMenu[taskId] = false; // Cerrar el menú de la tarea al editar
  }

  // UPDATING
  updateListName(newName: string) {
    this.todoService.updateListName(this.list.id, newName);
    this.isEditing = false;
  }

  updateTaskTitle(taskId: string, newTitle: string) {
    this.todoService.updateTaskTitle(this.list.id, taskId, newTitle);
    this.editingTaskId = null;
  }

  // TOGGLE
  toggleTask(taskId: string) {
    this.todoService.toggleTask(this.list.id, taskId);
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

  // TOGGLE MENU FOR EACH TASK
  toggleTaskMenu(taskId: string) {
    this.showTaskMenu[taskId] = !this.showTaskMenu[taskId];
    for (let id in this.showTaskMenu) {
      if (id !== taskId) {
        this.showTaskMenu[id] = false;
      }
    }
  }
}
