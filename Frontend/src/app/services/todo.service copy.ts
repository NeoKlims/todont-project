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

  // Inside the constructor of TodoService

constructor(private http: HttpClient, private authService: AuthService) {
  this.currentUserId = this.authService.getUserId();

  this.fetchTodoLists();
  this.fetchTodontLists();
  this.fetchTasks(); // Fetch tasks as well
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
  private fetchTasks(): void {
    if (this.currentUserId === null) {
      console.error('No user is logged in');
      return;
    }
  
    this.http.get<TodoTask[]>(`${this.apiUrl}/todotasks`).subscribe({
      next: (tasks) => {
        // Distribute tasks to their corresponding lists
        this.distributeTasksToLists(tasks);
        console.log(tasks)
      },
      error: (error) => console.error('Error fetching tasks', error),
    });
  }
  
  private distributeTasksToLists(tasks: TodoTask[]): void {
    // Get the current lists
    const todoLists = this.todoLists.value;
    const todontLists = this.todontLists.value;
    
  
    // Clear existing tasks in the lists
    todoLists.forEach(list => list.tasks = []);
    todontLists.forEach(list => list.tasks = []);
  
    // Distribute tasks to the appropriate lists
    tasks.forEach(task => {
      const list = todoLists.find(list => list.id === task.list_id) || 
                   todontLists.find(list => list.id === task.list_id);
      if (list) {
        list.tasks.push(task);
      }
    });
    console.log(todoLists)
    console.log(todontLists)
    // Update the BehaviorSubjects with the new lists
    this.todoLists.next([...todoLists]);
    this.todontLists.next([...todontLists]);
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
    console.log(newList)
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

  /*addTask(listId: string, title: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const listIndex = lists.findIndex((list) => list.id === listId);
  
    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id: Date.now().toString(), 
        title,
        description: '', // Not implemented
        completed: 0,
        deadline: '', // Not implemented
        tags: '', // Not implemented
        repeat_on: '', // Not implemented
        list_id: listId, 
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
  
      // Send a POST request to the backend to add the task
      this.http.post(`${this.apiUrl}/todotasks`, newTask).subscribe({
        next: (response) => {
          console.log('Task added successfully', response);
          // Update the local state only after the backend confirms the creation
          lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
          if (isTodont) {
            this.todontLists.next([...lists]);
          } else {
            this.todoLists.next([...lists]);
          }
        },
        error: (error) => {
          console.error('Error adding task', error);
        },
      });
    }
  }*/
    /*addTask(listId: string, title: string, isTodont: boolean = false) {
      const lists = isTodont ? this.todontLists.value : this.todoLists.value;
      const listIndex = lists.findIndex((list) => list.id === listId);
      console.log(isTodont)
      if (listIndex !== -1) {
        const apiUrl = isTodont ? this.apiUrl + '/todonttasks' : this.apiUrl + '/todotasks';
        const newTask: TodoTask = {
          id: Date.now().toString(), // Generate a unique ID (you might want to use a UUID or let the backend generate this)
          title,
          description: '1', //  Not implemented
          completed: 0,
          deadline: '', // Not implemented
          tags: '3', // Not implemented
          repeat_on: 'n', // Not implemented
          list_id: listId, // Ensure this matches the backend's expected field name
        };
        console.log(newTask)
        // Send a POST request to the backend to add the task
        this.http.post(apiUrl, newTask).subscribe({
          next: (response) => {
            console.log('Task added successfully', response);
            // Update the local state only after the backend confirms the creation
            lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
            if (isTodont) {
              this.todontLists.next([...lists]);
            } else {
              this.todoLists.next([...lists]);
            }
          },
          error: (error) => {
            console.error('Error adding task', error);
          },
        });
      }
    }
*/
addTask(listId: string, title: string, isTodont: boolean = false) {
      const lists = isTodont ? this.todontLists.value : this.todoLists.value;
      const listIndex = lists.findIndex((list) => list.id === listId);
      console.log(isTodont)
      if (listIndex !== -1) {
        const apiUrl = isTodont ? this.apiUrl + '/todonttasks' : this.apiUrl + '/todotasks';
        const newTask: TodoTask = {
          id:-1, // Generate a unique ID (you might want to use a UUID or let the backend generate this)
          title,
          description: '1', //  Not implemented
          completed: 0,
          deadline: '', // Not implemented
          tags: '3', // Not implemented
          repeat_on: 'n', // Not implemented
          list_id: listId, // Ensure this matches the backend's expected field name
        };
        console.log(newTask)
        // Send a POST request to the backend to add the task
        this.http.post(apiUrl, newTask).subscribe({
          next: (response) => {
            console.log('Task added successfully', response);
            // Update the local state only after the backend confirms the creation
            lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
            if (isTodont) {
              this.todontLists.next([...lists]);
            } else {
              this.todoLists.next([...lists]);
            }
          },
          error: (error) => {
            console.error('Error adding task', error);
          },
        });
      }
    }
  deleteTask(listId: string, taskId: number, isTodont: boolean = false) {
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
    taskId: number,
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

  /*toggleTaskStar(listId: string, taskId: string, isTodont: boolean = false) {
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
  }*/

  toggleTask(listId: string, taskId: number, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find((l) => l.id === listId);

    if (list) {
      const task = list.tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed != task.completed;
        if (isTodont) {
          this.todontLists.next([...lists]);
        } else {
          this.todoLists.next([...lists]);
        }
      }
    }
  }
}
