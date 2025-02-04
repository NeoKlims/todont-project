import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList, TodoTask } from '../models/todo-list.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoLists = new BehaviorSubject<TodoList[]>([]);
  private todontLists = new BehaviorSubject<TodoList[]>([]);
  private apiUrl = environment.apiUrl;
  private currentUserId: number | null = null; // Initialize as null

  constructor(private http: HttpClient, private authService: AuthService) {
    // Set the current user ID from AuthService
    this.currentUserId = this.authService.getUserId();

    // Fetch initial data when the service is instantiated
    this.fetchTodoLists();
    this.fetchTodontLists();
  }

  // Fetch Todo lists from the backend for the current user
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

  // Fetch Todont lists from the backend for the current user
  private fetchTodontLists(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }

    this.http.get<TodoList[]>(`${this.apiUrl}/todontlists`).subscribe({
      next: (lists) => {
        const filteredLists = lists.filter(
          (list) => list.user_id === this.currentUserId
        );
        this.todontLists.next(filteredLists);
      },
      error: (error) => console.error('Error fetching Todont lists', error),
    });
  }

  // Expose Todo lists as an observables
  getTodoLists(): Observable<TodoList[]> {
    return this.todoLists.asObservable();
  }

  // Expose Todont lists as an observable
  getTodontLists(): Observable<TodoList[]> {
    return this.todontLists.asObservable();
  }

  addTodoList(title: string, isTodont: boolean = false) {
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

    // Determine the correct API endpoint
    const apiUrl = isTodont
      ? this.apiUrl + '/todontlists'
      : this.apiUrl + '/todolists';

    // Send a POST request to the backend
    this.http
      .post(apiUrl, {
        title: title,
        user_id: this.currentUserId,
      })
      .subscribe({
        next: (response) => {
          console.log('Todo list created successfully', response);
          // Update the local state only after the backend confirms the creation
          if (isTodont) {
            this.todontLists.next([...this.todontLists.value, newList]);
          } else {
            this.todoLists.next([...this.todoLists.value, newList]);
          }
        },
        error: (error) => {
          console.error('Error creating todo list', error);
        },
      });
  }

  /*deleteList(listId: string, isTodont: boolean = false) {
    if (isTodont) {
      const lists = this.todontLists.value.filter((list) => list.id !== listId);
      this.todontLists.next(lists);
    } else {
      const lists = this.todoLists.value.filter((list) => list.id !== listId);
      this.todoLists.next(lists);
    }
  }*/
  deleteList(listId: string, isTodont: boolean = false) {
    // Determine the correct API endpoint
    const url = isTodont
      ? `${this.apiUrl}/todontlists/${listId}`
      : `${this.apiUrl}/todolists/${listId}`;

    // Make the HTTP DELETE request
    this.http.delete(url).subscribe({
      next: () => {
        console.log(`List ${listId} deleted successfully.`);
        // Update the local state only after a successful backend deletion
        if (isTodont) {
          const updatedLists = this.todontLists.value.filter(
            (list) => list.id !== listId
          );
          this.todontLists.next(updatedLists);
        } else {
          const updatedLists = this.todoLists.value.filter(
            (list) => list.id !== listId
          );

          this.todoLists.next(updatedLists);
        }
      },
      error: (error) => {
        console.error(`Failed to delete list ${listId}:`, error);
      },
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

    // Si no la encontramos en 'todontLists', buscamos en 'todoLists'
    const todoList = this.todoLists.value.find((list) => list.id === listId);
    if (todoList) {
      // Si la lista está en 'todoLists', alternamos la visibilidad
      todoList.isVisible = !todoList.isVisible;
      this.todoLists.next([...this.todoLists.value]); // Notificamos la actualización
    }
  }

  updateListName(listId: string, newName: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
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
          if (isTodont) {
            this.todontLists.next([...lists]);
          } else {
            this.todoLists.next([...lists]);
          }
        },
        error: (error) => {
          console.error('Failed to update list name:', error);
          // Revert the local change if the backend update fails
          list.title = oldName;
        },
      });
    }
  }

  toggleListStar(listId: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.isStarred = !list.isStarred;
      if (isTodont) {
        this.todontLists.next([...lists]);
      } else {
        this.todoLists.next([...lists]);
      }
    }
  }

  addTask(listId: string, title: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id: Date.now().toString(),
        title,
        completed: false,
        isStarred: false,
      };

      lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
      if (isTodont) {
        this.todontLists.next([...lists]);
      } else {
        this.todoLists.next([...lists]);
      }
    }
  }

  deleteTask(listId: string, taskId: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter((t) => t.id !== taskId);
      if (isTodont) {
        this.todontLists.next([...lists]);
      } else {
        this.todoLists.next([...lists]);
      }
    }
  }

  updateTaskTitle(
    listId: string,
    taskId: string,
    newTitle: string,
    isTodont: boolean = false
  ) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task && newTitle.trim()) {
        task.title = newTitle;
        if (isTodont) {
          this.todontLists.next([...lists]);
        } else {
          this.todoLists.next([...lists]);
        }
      }
    }
  }

  toggleTaskStar(listId: string, taskId: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        task.isStarred = !task.isStarred;
        if (isTodont) {
          this.todontLists.next([...lists]);
        } else {
          this.todoLists.next([...lists]);
        }
      }
    }
  }

  toggleTask(listId: string, taskId: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);

    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        if (isTodont) {
          this.todontLists.next([...lists]);
        } else {
          this.todoLists.next([...lists]);
        }
      }
    }
  }
}
