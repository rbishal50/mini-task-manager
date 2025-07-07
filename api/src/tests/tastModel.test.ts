import * as taskModel from "../models/taskModel";
import { TaskInput } from "../types/task";

describe("Task Model", () => {
  beforeEach(() => {
    taskModel.resetTasks();
  });

  it("should return all initial tasks", () => {
    const tasks = taskModel.getTasks();
    expect(tasks.length).toEqual(0);
  });

  it("should create a new task", () => {
    const input: TaskInput = {
      title: "Test task",
      description: "Test desc",
      submitter: "Tester",
      assignee: "QA",
    };

    const task = taskModel.addTask(input);

    expect(task.number).toBe("TSK001");
    expect(task.title).toBe("Test task");
    expect(task.status).toBe("TO DO");

    const tasks = taskModel.getTasks();
    expect(tasks.length).toEqual(1);
  });

  it("should increment the task number on each entry", () => {
    const input1: TaskInput = {
      title: "Test task 1",
      description: "Test desc 1",
      submitter: "Bishal",
      assignee: "",
    };

    const input2: TaskInput = {
      title: "Test task 2",
      description: "Test desc 2",
      submitter: "Bishal",
      assignee: "",
    };

    const task1 = taskModel.addTask(input1);
    const task2 = taskModel.addTask(input2);

    expect(task1.number).toBe("TSK001");
    expect(task2.number).toBe("TSK002");
  });

  it("should update an existing task", () => {
    const input: TaskInput = {
      title: "Test task",
      description: "Test desc",
      submitter: "Tester",
      assignee: "QA",
    };

    const task = taskModel.addTask(input);

    expect(task.number).toBe("TSK001");
    expect(task.title).toBe("Test task");
    expect(task.status).toBe("TO DO");
    const tasks = taskModel.getTasks();
    const id = tasks[0].id;

    const updated = taskModel.updateTask(String(id), {
      status: "DONE",
      assignee: "Updated User",
    });

    expect(updated).not.toBeNull();
    expect(updated?.status).toBe("DONE");
    expect(updated?.assignee).toBe("Updated User");
  });

  it("should return null for updating non-existing task", () => {
    const result = taskModel.updateTask("10000", { status: "TO DO" });
    expect(result).toBeNull();
  });
});
