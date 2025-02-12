import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,forkJoin } from 'rxjs';
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
    /*this.fetchTodoLists();
    this.fetchTasks();*/
    this.fetchData();
  }

  /*private fetchTodoLists(): void {
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
  }*/

    private fetchData(): void {
      if (this.currentUserId === null) {
        console.error('No user is logged in');
        return;
      }
  
      // Fetch lists and tasks in parallel
      forkJoin({
        lists: this.http.get<TodoList[]>(`${this.apiUrl}/todolists`),
        tasks: this.http.get<TodoTask[]>(`${this.apiUrl}/todotasks`),
      }).subscribe({
        next: ({ lists, tasks }) => {
          // Filter lists for the current user
          const filteredLists = lists.filter(
            (list) => list.user_id === this.currentUserId
          );
          this.todoLists.next(filteredLists);
  
          // Distribute tasks to the filtered lists
          this.distributeTasksToLists(tasks);
        },
        error: (error) => console.error('Error fetching data', error),
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

    this.http
      .post<{ id: number }>(`${this.apiUrl}/todolists`, {
        title,
        user_id: this.currentUserId,
      })
      .subscribe({
        next: (response) => {
          const newList: TodoList = {
            id: response.id, // Use ID from backend
            title,
            tasks: [],
            user_id: this.currentUserId,
            isVisible: true,
          };

          this.todoLists.next([...this.todoLists.value, newList]);
          console.log('Todo list created successfully', response);
        },
        error: (error) => console.error('Error creating todo list', error),
      });
  }

  toggleListVisibility(listId: number) {
    // Si no la encontramos en 'todontLists', buscamos en 'todoLists'
    const todoList = this.todoLists.value.find((list) => list.id === listId);
    if (todoList) {
      // Si la lista está en 'todoLists', alternamos la visibilidad
      todoList.isVisible = !todoList.isVisible;
      this.todoLists.next([...this.todoLists.value]); // Notificamos la actualización
    }
  }

  updateListName(listId: number, newName: string, isTodont: boolean = false) {
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
  deleteList(listId: number): void {
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

  
  addTask(listId: number, title: string): void {
    const lists = this.todoLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id: -1, // Placeholder
        title,
        description: 'Place description here',
        completed: false,
        deadline: '',
        tags: '3',
        repeat_on: 'n',
        list_id: listId,
      };

      this.http
        .post<{ id: number }>(`${this.apiUrl}/todotasks`, newTask)
        .subscribe({
          next: (response) => {
            newTask.id = response.id; // Update task ID from database
            lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
            this.todoLists.next([...lists]);
            console.log('Task added successfully', response);
          },
          error: (error) => console.error('Error adding task', error),
        });
    }
  }

  
  deleteTask(listId: number, taskId: number): void {
    console.log(listId);
    console.log(taskId);
    const url = `${this.apiUrl}/todotasks/${taskId}`;
    this.http.delete(url).subscribe(() => {
      // Update the local state after successful deletion
      const lists = this.todoLists.value;
      const list = lists.find((l) => l.id === listId);
      console.log(lists);
      console.log(list);

      if (list) {
        list.tasks = list.tasks.filter((t) => t.id !== taskId);
        console.log(list.tasks);
        this.todoLists.next([...lists]);
      }
    });
  }

  
  updateTaskTitle(listId: number, taskId: number, newTitle: string, newDesc: string): void {
    const url = `${this.apiUrl}/todotasks/${taskId}`;
    const updatedTask: Partial<TodoTask> = { title: newTitle, description: newDesc, deadline: newDeadline };

    this.http
      .put<TodoTask>(url, updatedTask)
      .subscribe((updatedTaskFromBackend) => {
        // Update the local state after successful update
        const lists = this.todoLists.value;
        const list = lists.find((l) => l.id === listId);
        if (list) {
          const taskIndex = list.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            list.tasks[taskIndex] = updatedTaskFromBackend;
            this.todoLists.next([...lists]);
          }
        }
      });
  }

  
  toggleTask(listId: number, taskId: number): void {
    const url = `${this.apiUrl}/todotasks/${taskId}`;
    const lists = this.todoLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        // Toggle the completion status locally
        task.completed = task.completed ? true : false;
        console.log("task in if",task)
        if (task.completed) {
          // Send a request to the backend to update the task's completion status
          this.http.put(url, { completed: 1 }).subscribe({
            next: () => {
              // Update the local state after the backend confirms the update
              this.todoLists.next([...lists]);
            },
            error: (error) => {
              console.error('Error updating task completion status', error);
              // Revert the local change if the request fails
              task.completed = !task.completed;
            },
          });
        }else{
          console.log(task.completed)

          // Send a request to the backend to update the task's completion status
          this.http.put(url, { completed: 0 }).subscribe({
            next: () => {
              // Update the local state after the backend confirms the update
              this.todoLists.next([...lists]);
            },
            error: (error) => {
              console.error('Error updating task completion status', error);
              // Revert the local change if the request fails
              task.completed = !task.completed;
            },
          });
        }
      }
    }
  }
}
