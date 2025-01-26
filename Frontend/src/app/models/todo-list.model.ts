export interface TodoList {
  id: string;
  name: string;
  tasks: TodoTask[];
  isStarred?: boolean;
}

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  isStarred?: boolean;
}