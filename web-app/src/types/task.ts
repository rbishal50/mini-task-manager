export type TaskStatus = "TO DO" | "IN PROGRESS" | "DONE";

export interface Task {
  id: string;
  number: string;
  title: string;
  description: string;
  status: TaskStatus;
  created: string;
  submitter: string;
  assignee: string;
}

export type TaskUpdate = Partial<Pick<Task, "assignee" | "status">>;
