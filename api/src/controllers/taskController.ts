import { Request, Response } from "express";
import * as taskModel from "../models/taskModel";

export const getAllTasks = (_req: Request, res: Response): void => {
  const tasks = taskModel.getTasks();
  res.json(tasks);
};
