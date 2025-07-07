import React from "react";
import { Box } from "@mui/material";
import TaskColumn from "./TaskColumn";
import { TaskStatus } from "../../types/task";
import { boardStyle } from "../../styles";

const TaskBoard: React.FC = () => {
  const statuses: TaskStatus[] = ["TO DO", "IN PROGRESS", "DONE"];

  return (
    <Box sx={boardStyle}>
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          // TODO
          tasks={[]}
          onTaskUpdate={() => {
            // TODO
          }}
        />
      ))}
    </Box>
  );
};

export default TaskBoard;
