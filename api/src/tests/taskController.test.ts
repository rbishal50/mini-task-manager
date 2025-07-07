import { Request, Response } from "express";
import * as taskController from "../controllers/taskController";
import * as taskModel from "../models/taskModel";
import { Task, TaskInput, TaskUpdate } from "../types/task";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Task Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllTasks", () => {
    it("should return tasks as JSON", () => {
      const tasks: Task[] = [
        {
          id: 1,
          number: "TSK001",
          title: "Test",
          description: "desc",
          status: "TO DO",
          created: new Date().toISOString(),
          submitter: "Alice",
          assignee: "",
        },
      ];

      jest.spyOn(taskModel, "getTasks").mockReturnValue(tasks);

      const req = {} as Request;
      const res = mockResponse();

      taskController.getAllTasks(req, res);

      expect(taskModel.getTasks).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(tasks);
    });
  });

  describe("createTask", () => {
    it("should create and return a new task", () => {
      const input: TaskInput = {
        title: "New Task",
        description: "Desc",
        submitter: "Bob",
        assignee: "",
      };

      const newTask: Task = {
        id: 2,
        number: "TSK002",
        ...input,
        status: "TO DO",
        created: new Date().toISOString(),
      };

      jest.spyOn(taskModel, "addTask").mockReturnValue(newTask);

      const req = {
        body: input,
      } as Request;

      const res = mockResponse();

      taskController.createTask(req, res);

      expect(taskModel.addTask).toHaveBeenCalledWith(input);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(newTask);
    });

    it("should return 400 if required fields missing", () => {
      const req = {
        body: { title: "" },
      } as Request;

      const res = mockResponse();

      taskController.createTask(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Missing required fields",
      });
    });
  });

  describe("updateTask", () => {
    it("should update task and return it", () => {
      const id = "1";
      const updates: TaskUpdate = { status: "DONE" };
      const updatedTask: Task = {
        id: 1,
        number: "TSK001",
        title: "Test",
        description: "desc",
        status: "DONE",
        created: new Date().toISOString(),
        submitter: "Alice",
        assignee: "",
      };

      jest.spyOn(taskModel, "updateTask").mockReturnValue(updatedTask);

      const req = {
        params: { id },
        body: updates,
      } as unknown as Request;

      const res = mockResponse();

      taskController.updateTask(req, res);

      expect(taskModel.updateTask).toHaveBeenCalledWith(id, updates);
      expect(res.json).toHaveBeenCalledWith(updatedTask);
    });

    it("should return 404 if task not found", () => {
      jest.spyOn(taskModel, "updateTask").mockReturnValue(null);

      const req = {
        params: { id: "999" },
        body: { status: "DONE" },
      } as unknown as Request;

      const res = mockResponse();

      taskController.updateTask(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Task not found" });
    });
  });
});
