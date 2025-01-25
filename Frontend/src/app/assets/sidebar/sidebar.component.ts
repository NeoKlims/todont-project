import { Component, type OnInit } from "@angular/core"
import { TaskService } from "../../services/task.service"
import { TaskList } from "../../interfaces/task.interface"
@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  lists: TaskList[] = []
  selectedListId = 1
  defaultList?: TaskList
  listsCollapsed = false

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getLists().subscribe((lists) => {
      this.lists = lists
      this.defaultList = lists.find((list) => list.isDefault)
    })

    this.taskService.getSelectedListId().subscribe((id) => {
      this.selectedListId = id
    })
  }

  selectList(listId: number) {
    this.taskService.setSelectedList(listId)
  }

  toggleListsCollapsed() {
    this.listsCollapsed = !this.listsCollapsed
  }

  createNewList() {
    const name = prompt("Enter list name:")
    if (name && name.trim()) {
      this.taskService.addList(name.trim())
    }
  }

  startAddingTask() {
    // You could emit an event or use a service to communicate with the TodoListComponent
    // For now, we'll just focus the add task input
    const input = document.querySelector(".task-input") as HTMLInputElement
    if (input) input.focus()
  }
}