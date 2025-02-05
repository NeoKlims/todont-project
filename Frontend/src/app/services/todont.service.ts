import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodontList, TodontTask } from '../models/todo-list.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodontService {
  private todontLists = new BehaviorSubject<TodontList[]>([]);
  private apiUrl = environment.apiUrl;
  private currentUserId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUserId = this.authService.getUserId();
    this.fetchTodontLists();
    this.fetchTasks();
  }

  private fetchTodontLists(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    this.http.get<TodontList[]>(`${this.apiUrl}/todontlists`).subscribe({
      next: (lists) => {
        const filteredLists = lists.filter((list) => list.user_id === this.currentUserId);
        this.todontLists.next(filteredLists);
      },
      error: (error) => console.error('Error fetching Todont lists', error),
    });
  }

  private fetchTasks(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    this.http.get<TodontTask[]>(`${this.apiUrl}/todonttasks`).subscribe({
      next: (tasks) => {
        this.distributeTasksToLists(tasks);
      },
      error: (error) => console.error('Error fetching tasks', error),
    });
  }

  private distributeTasksToLists(tasks: TodontTask[]): void {
    const todontLists = this.todontLists.value;
    todontLists.forEach((list) => (list.tasks = []));
    tasks.forEach((task) => {
      const list = todontLists.find((list) => list.id === task.list_id);
      if (list) {
        list.tasks.push(task);
      }
    });
    this.todontLists.next([...todontLists]);
  }

  getTodontLists(): Observable<TodontList[]> {
    return this.todontLists.asObservable();
  }

  addTodontList(title: string): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    const newList: TodontList = {
      id: Date.now().toString(),
      title,
      tasks: [],
      user_id: this.currentUserId,
      isStarred: false,
      isVisible: true,
    };

    this.http.post(`${this.apiUrl}/todontlists`, { title, user_id: this.currentUserId }).subscribe({
      next: (response) => {
        console.log('Todont list created successfully', response);
        this.todontLists.next([...this.todontLists.value, newList]);
      },
      error: (error) => console.error('Error creating todont list', error),
    });
  }

  toggleListVisibility(listId: string) {
    const list = this.todontLists.value.find((list) => list.id === listId);
    if (list) {
      // Si la lista está en 'todontLists', alternamos la visibilidad
      list.isVisible = !list.isVisible;
      this.todontLists.next([...this.todontLists.value]); // Notificamos la actualización
      return;
    }
  }
  updateListName(listId: string, newName: string, isTodont: boolean = true) {
    const lists = this.todontLists.value;
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
          this.todontLists.next([...lists]);
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
    this.http.delete(`${this.apiUrl}/todontlists/${listId}`).subscribe({
      next: () => {
        const updatedLists = this.todontLists.value.filter((list) => list.id !== listId);
        this.todontLists.next(updatedLists);
      },
      error: (error) => console.error(`Failed to delete list ${listId}:`, error),
    });
  }

  addTask(listId: string, title: string): void {
    const lists = this.todontLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodontTask = {
        id:-1,
        title,
        description: '1',
        completed: 0,
        streak: "0",
        list_id: listId,
      };

      this.http.post(`${this.apiUrl}/todonttasks`, newTask).subscribe({
        next: (response) => {
          lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
          this.todontLists.next([...lists]);
        },
        error: (error) => console.error('Error adding task', error),
      });
    }
  }

  deleteTask(listId: string, taskId: number): void {
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter((t) => t.id !== taskId);
      this.todontLists.next([...lists]);
    }
  }

  updateTaskTitle(listId: string, taskId: number, newTitle: string): void {
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task && newTitle.trim()) {
        task.title = newTitle;
        this.todontLists.next([...lists]);
      }
    }
  }

  toggleTask(listId: string, taskId: number): void {
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed != task.completed;
        this.todontLists.next([...lists]);
      }
    }
  }
}