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
  description: string;
  completed: boolean;
  deadline: string;
  tags: string;
  repeat_on: string;
  list_id: string;
  created_at: string;
  updated_at: string;
}
