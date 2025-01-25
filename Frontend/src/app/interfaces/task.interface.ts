export interface Task {
    id: number
    title: string
    details?: string
    completed: boolean
    starred?: boolean
    dueDate?: Date
    listId: number
  }
  
  export interface TaskList {
    id: number
    name: string
    isDefault?: boolean
  }
  
  