import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Task, TaskList } from "../models/task.model"

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([])
  private lists = new BehaviorSubject<TaskList[]>([{ id: 1, name: "My Tasks", isDefault: true }])
  private selectedListId = new BehaviorSubject<number>(1)

  getTasks(): Observable<Task[]> {
    return this.tasks.asObservable()
  }

  getLists(): Observable<TaskList[]> {
    return this.lists.asObservable()
  }

  getSelectedListId(): Observable<number> {
    return this.selectedListId.asObservable()
  }

  addTask(title: string, listId: number): void {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      starred: false,
      listId,
    }
    this.tasks.next([...this.tasks.value, newTask])
  }

  updateTask(updatedTask: Task): void {
    const updatedTasks = this.tasks.value.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    this.tasks.next(updatedTasks)
  }

  deleteTask(taskId: number): void {
    const filteredTasks = this.tasks.value.filter((task) => task.id !== taskId)
    this.tasks.next(filteredTasks)
  }

  toggleTaskComplete(taskId: number): void {
    const updatedTasks = this.tasks.value.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )
    this.tasks.next(updatedTasks)
  }

  toggleTaskStar(taskId: number): void {
    const updatedTasks = this.tasks.value.map((task) =>
      task.id === taskId ? { ...task, starred: !task.starred } : task,
    )
    this.tasks.next(updatedTasks)
  }

  addList(name: string): void {
    const newList: TaskList = {
      id: Date.now(),
      name,
    }
    this.lists.next([...this.lists.value, newList])
  }

  setSelectedList(listId: number): void {
    this.selectedListId.next(listId)
  }
}

