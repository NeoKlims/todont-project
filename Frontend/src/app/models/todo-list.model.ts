export interface TodoList {
  id: string;
  title: string;
  tasks: TodoTask[];
  user_id: number | null;
  isStarred?: boolean;
  isVisible: boolean;
}

export interface TodoTask {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: Date;
  isStarred?: boolean;
}
