import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList, TodoTask } from '../models/todo-list.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoLists = new BehaviorSubject<TodoList[]>([]);
  private apiUrl = environment.apiUrl;
  private currentUserId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUserId = this.authService.getUserId();
    this.fetchTodoLists();
    this.fetchTasks();
  }

  private fetchTodoLists(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    this.http.get<TodoList[]>(`${this.apiUrl}/todolists`).subscribe({
      next: (lists) => {
        const filteredLists = lists.filter(
          (list) => list.user_id === this.currentUserId
        );
        this.todoLists.next(filteredLists);
      },
      error: (error) => console.error('Error fetching Todo lists', error),
    });
  }

  private fetchTasks(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    this.http.get<TodoTask[]>(`${this.apiUrl}/todotasks`).subscribe({
      next: (tasks) => {
        this.distributeTasksToLists(tasks);
      },
      error: (error) => console.error('Error fetching tasks', error),
    });
  }

  private distributeTasksToLists(tasks: TodoTask[]): void {
    const todoLists = this.todoLists.value;
    todoLists.forEach((list) => (list.tasks = []));
    tasks.forEach((task) => {
      const list = todoLists.find((list) => list.id === task.list_id);
      if (list) {
        list.tasks.push(task);
      }
    });
    this.todoLists.next([...todoLists]);
  }

  getTodoLists(): Observable<TodoList[]> {
    return this.todoLists.asObservable();
  }

  addTodoList(title: string): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    const newList: TodoList = {
      id: Date.now().toString(),
      title,
      tasks: [],
      user_id: this.currentUserId,
      isStarred: false,
      isVisible: true,
    };

    this.http
      .post(`${this.apiUrl}/todolists`, { title, user_id: this.currentUserId })
      .subscribe({
        next: (response) => {
          console.log('Todo list created successfully', response);
          this.todoLists.next([...this.todoLists.value, newList]);
        },
        error: (error) => console.error('Error creating todo list', error),
      });
  }

  toggleListVisibility(listId: string) {

    // Si no la encontramos en 'todontLists', buscamos en 'todoLists'
    const todoList = this.todoLists.value.find((list) => list.id === listId);
    if (todoList) {
      // Si la lista está en 'todoLists', alternamos la visibilidad
      todoList.isVisible = !todoList.isVisible;
      this.todoLists.next([...this.todoLists.value]); // Notificamos la actualización
    }
  }


  updateListName(listId: string, newName: string, isTodont: boolean = false) {
    const lists = this.todoLists.value;
    const list = lists.find((l) => l.id === listId);

    console.log(list);
    console.log(lists);

    if (list && newName.trim()) {
      // Update the list name locally
      const oldName = list.title; // Store old name in case of revert
      list.title = newName;

      // Determine the correct API endpoint
      const url = isTodont
        ? `${this.apiUrl}/todontlists/${listId}`
        : `${this.apiUrl}/todolists/${listId}`;

      const payload = { title: newName };

      // Make the HTTP PUT request to update the backend
      this.http.put(url, payload).subscribe({
        next: (response) => {
          console.log('List name updated successfully:', response);
          // Update the local state after successful backend update
          this.todoLists.next([...lists]);
        },
        error: (error) => {
          console.error('Failed to update list name:', error);
          // Revert the local change if the backend update fails
          list.title = oldName;
        },
      });
    }
  }
  deleteList(listId: string): void {
    this.http.delete(`${this.apiUrl}/todolists/${listId}`).subscribe({
      next: () => {
        const updatedLists = this.todoLists.value.filter(
          (list) => list.id !== listId
        );
        this.todoLists.next(updatedLists);
      },
      error: (error) =>
        console.error(`Failed to delete list ${listId}:`, error),
    });
  }

  addTask(listId: string, title: string): void {
    const lists = this.todoLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id:-1,
        title,
        description: '1',
        completed: 0,
        deadline: '',
        tags: '3',
        repeat_on: 'n',
        list_id: listId,
      };
      console.log(newTask)
      this.http.post(`${this.apiUrl}/todotasks`, newTask).subscribe({
        next: (response) => {
          lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
          this.todoLists.next([...lists]);
        },
        error: (error) => console.error('Error adding task', error),
      });
    }
  }

  deleteTask(listId: string, taskId: number): void {
    const lists = this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter((t) => t.id !== taskId);
      this.todoLists.next([...lists]);
    }
  }

  updateTaskTitle(listId: string, taskId: number, newTitle: string): void {
    const lists = this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task && newTitle.trim()) {
        task.title = newTitle;
        this.todoLists.next([...lists]);
      }
    }
  }

  toggleTask(listId: string, taskId: number): void {
    const lists = this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed != task.completed;
        this.todoLists.next([...lists]);
      }
    }
  }
}
