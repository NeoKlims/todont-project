import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList, TodoTask } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoLists = new BehaviorSubject<TodoList[]>([
    { id: '1', name: 'My Tasks', tasks: [], isStarred: false },
  ]);

  private todontLists = new BehaviorSubject<TodoList[]>([
    { id: '2', name: 'Things Not To Do', tasks: [], isStarred: false },
  ]);

  getTodoLists(): Observable<TodoList[]> {
    return this.todoLists.asObservable();
  }

  getTodontLists(): Observable<TodoList[]> {
    return this.todontLists.asObservable();
  }

  addTodoList(name: string, isTodont: boolean = false) {
    const newList: TodoList = {
      id: Date.now().toString(),
      name,
      tasks: [],
      isStarred: false
    };
    
    if (isTodont) {
      this.todontLists.next([...this.todontLists.value, newList]);
    } else {
      this.todoLists.next([...this.todoLists.value, newList]);
    }
  }

  deleteList(listId: string, isTodont: boolean = false) {
    if (isTodont) {
      const lists = this.todontLists.value.filter(list => list.id !== listId);
      this.todontLists.next(lists);
    } else {
      const lists = this.todoLists.value.filter(list => list.id !== listId);
      this.todoLists.next(lists);
    }
  }

  updateListName(listId: string, newName: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list && newName.trim()) {
      list.name = newName;
      if (isTodont) {
        this.todontLists.next([...lists]);
      } else {
        this.todoLists.next([...lists]);
      }
    }
  }

  toggleListStar(listId: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find(l => l.id === listId);
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
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id: Date.now().toString(),
        title,
        completed: false,
        isStarred: false
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
    const list = lists.find(l => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter(t => t.id !== taskId);
      if (isTodont) {
        this.todontLists.next([...lists]);
      } else {
        this.todoLists.next([...lists]);
      }
    }
  }

  updateTaskTitle(listId: string, taskId: string, newTitle: string, isTodont: boolean = false) {
    const lists = isTodont ? this.todontLists.value : this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
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
    const list = lists.find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
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
    const list = lists.find(l => l.id === listId);
    
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
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