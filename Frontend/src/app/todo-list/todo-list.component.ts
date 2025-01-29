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
  @Input() isTodont: boolean = false; // Determines if it's a To-Don't list

  showListMenu = false;
  showTaskMenu: { [key: string]: boolean } = {};
  isEditing = false;
  editingTaskId: string | null = null;
  showCompleted: boolean = false;

  constructor(private todoService: TodoService) {}

  // Get Pending & Completed Tasks
  get pendingTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => !task.completed);
  }

  get completedTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => task.completed);
  }

  // Adding a Task
  addTask(title: string) {
    if (title.trim()) {
      this.todoService.addTask(this.list.id, title, this.isTodont);
    }
  }

  // Deleting
  deleteTask(taskId: string) {
    this.todoService.deleteTask(this.list.id, taskId, this.isTodont);
    this.showTaskMenu[taskId] = false;
  }

  deleteList() {
    this.todoService.deleteList(this.list.id, this.isTodont);
  }

  // Editing
  startEditing() {
    this.isEditing = true;
    this.showListMenu = false;
  }

  startEditingTask(taskId: string) {
    this.editingTaskId = taskId;
    this.showTaskMenu[taskId] = false;
  }

  // Updating
  updateListName(newName: string) {
    this.todoService.updateListName(this.list.id, newName, this.isTodont);
    this.isEditing = false;
  }

  updateTaskTitle(taskId: string, newTitle: string) {
    this.todoService.updateTaskTitle(this.list.id, taskId, newTitle, this.isTodont);
    this.editingTaskId = null;
  }

  // Toggle Actions
  toggleTask(taskId: string) {
    this.todoService.toggleTask(this.list.id, taskId, this.isTodont);
  }

  toggleListStar() {
    this.todoService.toggleListStar(this.list.id, this.isTodont);
  }

  toggleTaskStar(taskId: string) {
    this.todoService.toggleTaskStar(this.list.id, taskId, this.isTodont);
  }

  toggleCompletedSection() {
    this.showCompleted = !this.showCompleted;
  }

  // Toggle Menu for Tasks
  toggleTaskMenu(taskId: string) {
    this.showTaskMenu[taskId] = !this.showTaskMenu[taskId];
    for (let id in this.showTaskMenu) {
      if (id !== taskId) {
        this.showTaskMenu[id] = false;
      }
    }
  }
}
