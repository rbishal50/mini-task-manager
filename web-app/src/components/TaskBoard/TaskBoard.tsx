import React, { useEffect } from "react";
import { Box } from "@mui/material";
import TaskColumn from "./TaskColumn";
import { TaskStatus } from "../../types/task";
import { boardStyle } from "../../styles";
import useTaskStore from "../../store/taskStore";

const TaskBoard: React.FC = () => {
  const statuses: TaskStatus[] = ["TO DO", "IN PROGRESS", "DONE"];
  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <Box sx={boardStyle}>
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks}
          onTaskUpdate={updateTask}
        />
      ))}
    </Box>
  );
};

export default TaskBoard;
