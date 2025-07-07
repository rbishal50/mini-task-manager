import { Request, Response } from "express";
import * as taskModel from "../models/taskModel";
import { TaskInput, TaskUpdate } from "../types/task";

export const getAllTasks = (_req: Request, res: Response): void => {
  const tasks = taskModel.getTasks();
  res.json(tasks);
};

export const createTask = (req: Request, res: Response): void => {
  const body = req.body as TaskInput;

  if (!body.title || !body.submitter) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }

  const newTask = taskModel.addTask(body);
  res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response): void => {
  const id = req.params.id;
  const updates = req.body as TaskUpdate;

  const updated = taskModel.updateTask(id, updates);
  if (!updated) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  res.json(updated);
};
