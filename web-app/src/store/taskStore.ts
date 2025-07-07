import { create } from "zustand";
import { Task, TaskUpdate } from "../types/task";
import { api } from "../lib/api";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (
    task: Pick<Task, "title" | "description" | "submitter" | "assignee">
  ) => Promise<void>;
  updateTask: (id: string, changes: TaskUpdate) => Promise<void>;
}

const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await api<Task[]>("/tasks");
      set({ tasks: data });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  addTask: async (task) => {
    set({ loading: true, error: null });
    try {
      const newTask = await api<Task>("/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (id, changes) => {
    set({ loading: true, error: null });

    try {
      const updated = await api<Task>(`/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
      });

      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTaskStore;
