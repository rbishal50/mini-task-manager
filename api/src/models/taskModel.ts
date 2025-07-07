import db from "../database/db";
import { Task, TaskInput } from "../types/task";

export const getTasks = (): Task[] => {
  return db.prepare("SELECT * FROM tasks").all() as Task[];
};

export const addTask = (task: TaskInput): Task => {
  const lastTask = db
    .prepare("SELECT id FROM tasks ORDER BY id DESC LIMIT 1")
    .get() as { id: number } | undefined;
  const nextId = lastTask ? lastTask.id + 1 : 1;

  const paddedNumber = String(nextId).padStart(3, "0");
  const number = `TSK${paddedNumber}`;
  const created = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO tasks (number, title, description, status, created, submitter, assignee)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    number,
    task.title,
    task.description,
    "TO DO",
    created,
    task.submitter,
    task.assignee
  );

  return {
    id: result.lastInsertRowid as number,
    number,
    created,
    status: "TO DO",
    ...task,
  };
};
