import React from "react";
import { Typography, Paper, Box } from "@mui/material";
import TaskCard from "./TaskCard";
import { Task, TaskStatus } from "../../types/task";
import NoTasks from "@mui/icons-material/ContentPasteOff";
import {
  columnHeaderStyle,
  noTasksIconStyle,
  noTasksTextStyle,
  noTasksWrapper,
  paperStyle,
} from "../../styles";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onTaskUpdate: (id: string, changes: Partial<Task>) => void;
}

const statusColors: Record<TaskStatus, string> = {
  "TO DO": "#424242",
  "IN PROGRESS": "#2c387e",
  DONE: "#1b5e20",
};

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks: tasksProps,
  onTaskUpdate,
}) => {
  const tasks = tasksProps.filter((task) => task.status === status);

  return (
    <Paper sx={paperStyle(statusColors[status])}>
      <Typography variant="h6" sx={columnHeaderStyle}>
        {status}
      </Typography>
      {tasks.length === 0 && (
        <Box sx={noTasksWrapper}>
          <NoTasks sx={noTasksIconStyle} />
          <Typography variant="h6" sx={noTasksTextStyle}>
            No tasks at the moment!
          </Typography>
        </Box>
      )}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onUpdate={(changes) => onTaskUpdate(task.id, changes)}
        />
      ))}
    </Paper>
  );
};

export default TaskColumn;
