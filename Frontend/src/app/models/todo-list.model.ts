export interface Task {
  id: string;
  title: string;
  description: string;
  completed: number;
  list_id: string;
}

export interface List {
  id: string;
  title: string;
  user_id: number | null;
  isStarred?: boolean;
  isVisible: boolean;
}

export interface TodoList extends List {
  tasks: TodoTask[];
}

export interface TodontList extends List {
  tasks: TodontTask[];
}

export interface TodoTask extends Task {
  deadline: string;
  tags: string;
  repeat_on: string;
}

export interface TodontTask extends Task {
  streak: string;
}
