export interface TodoList {
  id: string;
  title: string;
  tasks: TodoTask[];
  user_id: number | null;
  isStarred?: boolean;
  isVisible: boolean;
}

export interface TodontList {
  id: string;
  title: string;
  tasks: TodontTask[];
  user_id: number | null;
  isStarred?: boolean;
  isVisible: boolean;
}

export interface TodoTask {
  id: string;
  title: string;
  description: string;
  completed: number;
  deadline: string;
  tags: string;
  repeat_on: string;
  list_id: string;
}

export interface TodontTask {
  id: string;
  title: string;
  description: string;
  completed: number;
  streak: string;
  list_id: string;
}
