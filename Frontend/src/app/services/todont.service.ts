import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodontList, TodontTask } from '../models/todo-list.model';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import dayjs from 'dayjs';
@Injectable({
  providedIn: 'root',
})
export class TodontService {
  private todontLists = new BehaviorSubject<TodontList[]>([]);
  private apiUrl = environment.apiUrl;
  private currentUserId: number | null = null;
  private dateTime = new Date();
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
        const filteredLists = lists.filter(
          (list) => list.user_id === this.currentUserId
        );
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
      const resetDate = dayjs(task.streak_reseted);
      const currentDate = dayjs();
      task.streak = currentDate.diff(resetDate, 'day');
      const list = todontLists.find((list) => list.id === task.list_id);
      if (list) {
        list.tasks.push(task);
      }
      console.log(tasks);
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

    this.http
      .post<{ id: number }>(`${this.apiUrl}/todontlists`, {
        title,
        user_id: this.currentUserId,
      })
      .subscribe({
        next: (response) => {
          const newList: TodontList = {
            id: response.id, // Use ID from backend
            title,
            tasks: [],
            user_id: this.currentUserId,
            isVisible: true,
          };

          this.todontLists.next([...this.todontLists.value, newList]);
          console.log('Todo list created successfully', response);
        },
        error: (error) => console.error('Error creating todo list', error),
      });
  }

  toggleListVisibility(listId: number) {
    const list = this.todontLists.value.find((list) => list.id === listId);
    if (list) {
      // Si la lista está en 'todontLists', alternamos la visibilidad
      list.isVisible = !list.isVisible;
      this.todontLists.next([...this.todontLists.value]); // Notificamos la actualización
      return;
    }
  }
  updateListName(listId: number, newName: string, isTodont: boolean = true) {
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
  deleteList(listId: number): void {
    this.http.delete(`${this.apiUrl}/todontlists/${listId}`).subscribe({
      next: () => {
        const updatedLists = this.todontLists.value.filter(
          (list) => list.id !== listId
        );
        this.todontLists.next(updatedLists);
      },
      error: (error) =>
        console.error(`Failed to delete list ${listId}:`, error),
    });
  }

  /*addTask(listId: number, title: string): void {
    const lists = this.todontLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodontTask = {
        id: -1,
        title,
        description: '1',
        completed: 0,
        streak: '0',
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
  }*/
  addTask(listId: number, title: string): void {
    const lists = this.todontLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);

    if (listIndex !== -1) {
      const newTask: TodontTask = {
        id: -1, // Placeholder
        title,
        description: 'Place description here',
        completed: false,
        streak: 0,
        streak_reseted: dayjs(new Date()).format('YYYY-MM-DD'),
        list_id: listId,
      };
      console.log(newTask);

      this.http
        .post<{ id: number }>(`${this.apiUrl}/todonttasks`, newTask)
        .subscribe({
          next: (response) => {
            newTask.id = response.id; // Update task ID from database
            lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
            this.todontLists.next([...lists]);
            console.log('Task added successfully', response);
          },
          error: (error) => console.error('Error adding task', error),
        });
    }
  }

  /*deleteTask(listId: number, taskId: number): void {
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter((t) => t.id !== taskId);
      this.todontLists.next([...lists]);
    }
  }*/
  deleteTask(listId: number, taskId: number): void {
    console.log(listId);
    console.log(taskId);
    const url = `${this.apiUrl}/todonttasks/${taskId}`;
    this.http.delete(url).subscribe(() => {
      // Update the local state after successful deletion
      const lists = this.todontLists.value;
      const list = lists.find((l) => l.id === listId);
      console.log(lists);
      console.log(list);

      if (list) {
        list.tasks = list.tasks.filter((t) => t.id !== taskId);
        console.log(list.tasks);
        this.todontLists.next([...lists]);
      }
    });
  }

  /*updateTaskTitle(listId: number, taskId: number, newTitle: string): void {
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task && newTitle.trim()) {
        task.title = newTitle;
        this.todontLists.next([...lists]);
      }
    }
  }*/
  updateTaskTitle(
    listId: number,
    taskId: number,
    newTitle: string,
    newDesc: string
  ): void {
    const url = `${this.apiUrl}/todonttasks/${taskId}`;
    const updatedTask: Partial<TodontTask> = {
      title: newTitle,
      description: newDesc,
    };

    this.http
      .put<TodontTask>(url, updatedTask)
      .subscribe((updatedTaskFromBackend) => {
        // Update the local state after successful update
        const lists = this.todontLists.value;
        const list = lists.find((l) => l.id === listId);
        if (list) {
          const taskIndex = list.tasks.findIndex((t) => t.id === taskId);
          if (taskIndex !== -1) {
            list.tasks[taskIndex] = updatedTaskFromBackend;
            this.todontLists.next([...lists]);
          }
        }
      });
  }

  // toggleTask(listId: number, taskId: number): void {
  //   const lists = this.todontLists.value;
  //   const list = lists.find((l) => l.id === listId);
  //   if (list) {
  //     const task = list.tasks.find((t) => t.id === taskId);
  //     if (task) {
  //       task.completed != task.completed;
  //       this.todontLists.next([...lists]);
  //     }
  //   }
  // }
  toggleTask(listId: number, taskId: number): void {
    const url = `${this.apiUrl}/todonttasks/${taskId}`;
    const lists = this.todontLists.value;
    const list = lists.find((l) => l.id === listId);
    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        // Toggle the completion status locally
        task.completed = !task.completed;
        if (task.completed) {
          // Send a request to the backend to update the task's completion status
          this.http.put(url, { completed: 0 }).subscribe({
            next: () => {
              // Update the local state after the backend confirms the update
              this.todontLists.next([...lists]);
            },
            error: (error) => {
              console.error('Error updating task completion status', error);
              // Revert the local change if the request fails
              task.completed = !task.completed;
            },
          });
        }else{
          // Send a request to the backend to update the task's completion status
          this.http.put(url, { completed: 1 }).subscribe({
            next: () => {
              // Update the local state after the backend confirms the update
              this.todontLists.next([...lists]);
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
