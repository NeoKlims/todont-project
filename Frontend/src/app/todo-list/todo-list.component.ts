import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TodoList,
  TodoTask,
  TodontList,
  TodontTask,
} from '../models/todo-list.model';
import { TodoService } from '../services/todo.service';
import { FormsModule } from '@angular/forms';
import { TodontService } from '../services/todont.service';

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

  showListMenu = false; // Toggle visibility of the list menu
  showTaskMenu: { [key: string]: boolean } = {}; // Toggle visibility of task menus
  showAddTaskModal = false;
  isEditing = false; // Toggle list name editing
  editingTaskId: number | null = null; // Track which task is being edited
  showCompleted: boolean = false; // Toggle visibility of completed tasks

  constructor(
    private todoService: TodoService,
    private todontService: TodontService
  ) {}

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

  showAddTask() {
    this.showAddTaskModal = true;
  }

  hideAddTask() {
    this.showAddTaskModal = false;
  }

  hideEditing() {
    this.isEditing = false;
  }

  // Add a Task
  /*addTask(title: string): void {
    if (title.trim()) {
      this.todoService.addTask(this.list.id, title, this.isTodont).subscribe({
        next: (newTask: TodoTask) => { 
          // Update the local state only after the backend confirms the creation
          this.list.tasks.push(newTask);
        },
        error: (error) => {
          console.error('Error adding task', error);
        },
      });
    }
  }*/
  addTask(title: string, description: string, deadline: string): void {
    if (title.trim()) {
      if (this.isTodont) {
        this.todontService.addTask(this.list.id, title);
      } else {
        this.todoService.addTask(this.list.id, title, description, deadline);
        this.showAddTaskModal = false;
      }
      //this.list.tasks.push(newTask);
    }
  }

  // Delete a Task
  deleteTask(listId: number, taskId: number) {
    //this.list.tasks = this.list.tasks.filter((task) => task.id !== taskId);
    //this.showTaskMenu[taskId] = false;
    if (this.isTodont) {
      this.todontService.deleteTask(listId, taskId);
      this.showTaskMenu[taskId] = false;
    } else {
      this.todoService.deleteTask(listId, taskId);
      this.showTaskMenu[taskId] = false;
    }
  }

  // Delete the List
  deleteList(listId: number): void {
    if (this.isTodont) {
      this.todontService.deleteList(listId);
    } else {
      this.todoService.deleteList(listId);
    }
  }

  // Start Editing List Name
  startEditing() {
    this.isEditing = true;
    this.showListMenu = false;
  }
  

  // Start Editing Task Title
  startEditingTask(taskId: number) {
    this.editingTaskId = taskId;
    this.showTaskMenu[taskId] = false;
  }

  // Update List Name
  updateListName(listId: number, newName: string, isTodont = this.isTodont) {
    if (newName.trim()) {
      if (this.isTodont) {
        this.todontService.updateListName(listId, newName, isTodont);
        this.isEditing = false;
      } else {
        this.todoService.updateListName(listId, newName, isTodont);
        this.isEditing = false;
      }
    }
  }

  // Update Task Title
  updateTaskTitle(listId: number, taskId: number, newTitle: string, newDesc: string, newDeadline: string) {
    if (newTitle.trim()) {
      const task = this.list.tasks.find((task) => task.id === taskId);
      if (task) {
        task.title = newTitle;
        task.description = newDesc;
        task.deadline = newDeadline;
        this.editingTaskId = null;
        // Optionally, send a request to the backend to update the task title
      }
      if (this.isTodont) {
        this.todontService.updateTaskTitle(listId, taskId, newTitle,newDesc);
        this.isEditing = false;
      } else {
        this.todoService.updateTaskTitle(listId, taskId, newTitle,newDesc, newDeadline);
        this.isEditing = false;
      }
    }
  }

  // Toggle Task Completion
  toggleTask(taskId: number) {
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
  /*toggleTaskStar(taskId: string) {
    const task = this.list.tasks.find((task) => task.id === taskId);
    if (task) {
      task.isStarred = !task.isStarred;
      // Optionally, send a request to the backend to update the task star status
    }
  }*/

  // Toggle Completed Tasks Section
  toggleCompletedSection() {
    this.showCompleted = !this.showCompleted;
  }

  // Toggle Task Menu
  toggleTaskMenu(taskId: number) {
    this.showTaskMenu[taskId] = !this.showTaskMenu[taskId];
    // Close other task menus
    for (let id in this.showTaskMenu) {
      if (+id !== taskId) {
        this.showTaskMenu[id] = false;
      }
    }
  }
  getTaskStreak(task: any): number | null {
    // Check if the task is a TodontTask and has a streak property
    return this.isTodont && task.hasOwnProperty('streak') ? (task as TodontTask).streak : null;
  }
}
