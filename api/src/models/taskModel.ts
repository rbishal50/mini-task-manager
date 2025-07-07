import db from "../database/db";
import { Task } from "../types/task";

export const getTasks = (): Task[] => {
  return db.prepare("SELECT * FROM tasks").all() as Task[];
};
