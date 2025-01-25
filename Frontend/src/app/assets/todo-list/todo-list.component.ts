import { Component, type OnInit } from "@angular/core"
import { Task } from "../../interfaces/task.interface"
import { TaskService } from "../../services/task.service"


@Component({
  selector: 'app-todo-list',
  standalone: false,
  
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = []
  currentList: any
  isAddingTask = false
  newTaskTitle = ""

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks
    })

    this.taskService.getSelectedListId().subscribe((listId) => {
      this.taskService.getLists().subscribe((lists) => {
        this.currentList = lists.find((list) => list.id === listId)
      })
    })
  }

  startAddingTask() {
    this.isAddingTask = true
    setTimeout(() => {
      const input = document.querySelector(".task-input") as HTMLInputElement
      if (input) input.focus()
    })
  }

  cancelAddingTask() {
    this.isAddingTask = false
    this.newTaskTitle = ""
  }

  addTask() {
    if (this.newTaskTitle.trim()) {
      this.taskService.addTask(this.newTaskTitle, this.currentList.id)
      this.newTaskTitle = ""
      this.isAddingTask = false
    }
  }

  toggleComplete(taskId: number) {
    this.taskService.toggleTaskComplete(taskId)
  }

  toggleStar(taskId: number) {
    this.taskService.toggleTaskStar(taskId)
  }

  deleteTask(taskId: number) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.taskService.deleteTask(taskId)
    }
  }

  editTask(task: Task) {
    const newTitle = prompt("Edit task:", task.title)
    if (newTitle !== null && newTitle.trim() !== "") {
      this.taskService.updateTask({
        ...task,
        title: newTitle.trim(),
      })
    }
  }
}
