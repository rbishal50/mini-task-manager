export type TaskStatus = "TO DO" | "IN PROGRESS" | "DONE";

export interface Task {
  id: number;
  number: string;
  title: string;
  description?: string;
  status: TaskStatus;
  created: string;
  submitter: string;
  assignee: string;
}

export type TaskInput = Omit<Task, "id" | "number" | "created" | "status">;

export type TaskUpdate = Partial<Pick<Task, "status" | "assignee">>;
