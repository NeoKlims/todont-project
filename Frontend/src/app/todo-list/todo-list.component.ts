import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoList,TodoTask } from '../models/todo-list.model';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  @Input() list!: TodoList; // Input list from the parent component
  @Input() isTodont: boolean = false; // Determines if it's a To-Don't list

  showList = true; // Toggle visibility of the list
  showListMenu = false; // Toggle visibility of the list menu
  showTaskMenu: { [key: string]: boolean } = {}; // Toggle visibility of task menus
  isEditing = false; // Toggle list name editing
  editingTaskId: string | null = null; // Track which task is being edited
  showCompleted: boolean = false; // Toggle visibility of completed tasks

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Initialize tasks if not provided
    if (!this.list.tasks) {
      this.list.tasks = [];
    }
  }

  // Get Pending Tasks
  get pendingTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => !task.completed);
  }

  // Get Completed Tasks
  get completedTasks(): TodoTask[] {
    return this.list.tasks.filter((task) => task.completed);
  }

  // Add a Task
  addTask(title: string) {
    if (title.trim()) {
      const newTask: TodoTask = {
        id: Date.now().toString(),
        title,
        completed: false,
        isStarred: false,
      };
      this.list.tasks.push(newTask);
      // Optionally, send a request to the backend to save the task
    }
  }

  // Delete a Task
  deleteTask(taskId: string) {
    this.list.tasks = this.list.tasks.filter((task) => task.id !== taskId);
    this.showTaskMenu[taskId] = false;
  }

  // Delete the List
  deleteList() {
    this.todoService.deleteList(this.list.id.toString(), this.isTodont);
  }

  // Start Editing List Name
  startEditing() {
    this.isEditing = true;
    this.showListMenu = false;
  }

  // Start Editing Task Title
  startEditingTask(taskId: string) {
    this.editingTaskId = taskId;
    this.showTaskMenu[taskId] = false;
  }

  // Update List Name
  updateListName(newName: string) {
    if (newName.trim()) {
      this.list.title = newName;
      this.isEditing = false;
      // Optionally, send a request to the backend to update the list name
    }
  }

  // Update Task Title
  updateTaskTitle(taskId: string, newTitle: string) {
    if (newTitle.trim()) {
      const task = this.list.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = newTitle;
        this.editingTaskId = null;
        // Optionally, send a request to the backend to update the task title
      }
    }
  }

  // Toggle List Visibility
  toggleList() {
    this.showList = !this.showList;
  }

  // Toggle Task Completion
  toggleTask(taskId: string) {
    const task = this.list.tasks.find((task) => task.id === taskId);
    if (task) {
      task.completed = !task.completed;
      // Optionally, send a request to the backend to update the task status
    }
  }

  // Toggle List Star
  toggleListStar() {
    this.list.isStarred = !this.list.isStarred;
    // Optionally, send a request to the backend to update the list star status
  }

  // Toggle Task Star
  toggleTaskStar(taskId: string) {
    const task = this.list.tasks.find((task) => task.id === taskId);
    if (task) {
      task.isStarred = !task.isStarred;
      // Optionally, send a request to the backend to update the task star status
    }
  }

  // Toggle Completed Tasks Section
  toggleCompletedSection() {
    this.showCompleted = !this.showCompleted;
  }

  // Toggle Task Menu
  toggleTaskMenu(taskId: string) {
    this.showTaskMenu[taskId] = !this.showTaskMenu[taskId];
    // Close other task menus
    for (let id in this.showTaskMenu) {
      if (id !== taskId) {
        this.showTaskMenu[id] = false;
      }
    }
  }
}