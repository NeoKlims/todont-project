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

  getTodoLists(): Observable<TodoList[]> {
    return this.todoLists.asObservable();
  }

  addTodoList(name: string) {
    const newList: TodoList = {
      id: Date.now().toString(),
      name,
      tasks: [],
      isStarred: false
    };
    this.todoLists.next([...this.todoLists.value, newList]);
  }

  deleteList(listId: string) {
    const lists = this.todoLists.value.filter(list => list.id !== listId);
    this.todoLists.next(lists);
  }

  updateListName(listId: string, newName: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list && newName.trim()) {
      list.name = newName;
      this.todoLists.next([...lists]);
    }
  }

  toggleListStar(listId: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list) {
      list.isStarred = !list.isStarred;
      this.todoLists.next([...lists]);
    }
  }

  addTask(listId: string, title: string) {
    const lists = this.todoLists.value;
    const listIndex = lists.findIndex(list => list.id === listId);
    
    if (listIndex !== -1) {
      const newTask: TodoTask = {
        id: Date.now().toString(),
        title,
        completed: false,
        isStarred: false
      };
      
      lists[listIndex].tasks = [...lists[listIndex].tasks, newTask];
      this.todoLists.next([...lists]);
    }
  }

  deleteTask(listId: string, taskId: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list) {
      list.tasks = list.tasks.filter(t => t.id !== taskId);
      this.todoLists.next([...lists]);
    }
  }

  updateTaskTitle(listId: string, taskId: string, newTitle: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task && newTitle.trim()) {
        task.title = newTitle;
        this.todoLists.next([...lists]);
      }
    }
  }

  toggleTaskStar(listId: string, taskId: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task) {
        task.isStarred = !task.isStarred;
        this.todoLists.next([...lists]);
      }
    }
  }

  toggleTask(listId: string, taskId: string) {
    const lists = this.todoLists.value;
    const list = lists.find(l => l.id === listId);
    
    if (list) {
      const task = list.tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = !task.completed;
        this.todoLists.next([...lists]);
      }
    }
  }
}