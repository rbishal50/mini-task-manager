import { create } from "zustand";
import { Task, TaskUpdate } from "../types/task";
import { USERS } from "../constants/users";

interface TaskState {
  tasks: Task[];
  nextId: number;
  addTask: (task: Omit<Task, "id" | "number" | "created" | "status">) => void;
  updateTask: (id: string, changes: TaskUpdate) => void;
}

// Initial mock data
const initialTasks: Task[] = [
  {
    id: "1",
    number: "TSK001",
    title: "Implement the UI components for the board",
    description: "Create task board components",
    status: "IN PROGRESS",
    created: "2025-07-01T10:30:00Z",
    submitter: USERS[0],
    assignee: USERS[1],
  },
  {
    id: "2",
    number: "TSK002",
    title: "Setup State",
    description: "Configure Zustand store",
    status: "DONE",
    created: "2025-07-02T14:15:00Z",
    submitter: USERS[1],
    assignee: USERS[2],
  },
  {
    id: "3",
    number: "TSK003",
    title: "Write Tests",
    description: "Add unit tests for components",
    status: "TO DO",
    created: "2025-07-03T09:45:00Z",
    submitter: USERS[2],
    assignee: "",
  },
];

const useTaskStore = create<TaskState>((set) => ({
  tasks: initialTasks,
  nextId: 1,

  addTask: (task) =>
    set((state) => {
      const newTask: Task = {
        id: state.nextId.toString(),
        number: `TSK${state.nextId.toString().padStart(3, "0")}`,
        created: new Date().toISOString(),
        status: "TO DO",
        ...task,
      };
      return {
        tasks: [...state.tasks, newTask],
        nextId: state.nextId + 1,
      };
    }),

  updateTask: (id, changes) =>
    set((state) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex === -1) return state;

      const updatedTasks = [...state.tasks];
      const task = updatedTasks[taskIndex];

      if (changes.assignee && !task.assignee) {
        changes.status = "IN PROGRESS";
      }

      if (changes.status && changes.status === "TO DO") {
        changes.assignee = "";
      }

      updatedTasks[taskIndex] = { ...task, ...changes };
      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
