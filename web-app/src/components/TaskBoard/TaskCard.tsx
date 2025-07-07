import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Menu,
  MenuItem,
  Box,
  Avatar,
  useTheme,
} from "@mui/material";
import { Task, TaskStatus } from "../../types/task";
import { USERS } from "../../constants/users";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import {
  cardStyle,
  menuButtonBoxStyle,
  iconStyle,
  avatarStyle,
  menuButtonStyle,
  statusChipStyle,
  infoRowStyle,
  infoItemStyle,
  sectionTitleStyle,
} from "../../styles";

const statusColors: Record<TaskStatus, string> = {
  "TO DO": "#424242",
  "IN PROGRESS": "#2c387e",
  DONE: "#1b5e20",
};

interface TaskCardProps {
  task: Task;
  onUpdate: (changes: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus: TaskStatus) => {
    let assignee = task.assignee;
    if (task.status === "IN PROGRESS" && newStatus !== "DONE") {
      assignee = "";
    }

    onUpdate({ status: newStatus, assignee });
    handleMenuClose();
  };

  const handleAssigneeChange = (assignee: string) => {
    let status = task.status;
    if (task.status === "TO DO") {
      status = "IN PROGRESS";
    }
    onUpdate({ assignee, status });
    handleMenuClose();
  };

  return (
    <Card sx={cardStyle(statusColors[task.status], theme.palette.primary.main)}>
      {task.status !== "DONE" && (
        <Box sx={menuButtonBoxStyle}>
          <Button size="small" onClick={handleMenuOpen} sx={menuButtonStyle}>
            <MoreVertIcon fontSize="small" />
          </Button>
        </Box>
      )}

      <CardContent sx={{ pt: 3.5 }}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          #{task.number}
        </Typography>

        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          {task.title}
        </Typography>

        <Chip
          label={task.status}
          size="small"
          sx={statusChipStyle(theme, statusColors[task.status])}
        />

        <Box sx={infoRowStyle}>
          <Box sx={infoItemStyle}>
            <PersonIcon fontSize="small" sx={iconStyle} />
            <Typography variant="body2">
              {task.assignee || "Unassigned"}
            </Typography>
          </Box>

          <Box sx={infoItemStyle}>
            <AccessTimeIcon fontSize="small" sx={iconStyle} />
            <Typography variant="body2">
              {new Date(task.created).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {task.status === "IN PROGRESS" && [
            <MenuItem disabled sx={sectionTitleStyle(theme)}>
              Change Status
            </MenuItem>,
            <MenuItem onClick={() => handleStatusChange("TO DO")}>
              Mark as TO DO
            </MenuItem>,
            <MenuItem onClick={() => handleStatusChange("DONE")}>
              Mark as DONE
            </MenuItem>,
          ]}

          <MenuItem disabled sx={{ ...sectionTitleStyle(theme), mt: 1 }}>
            Assign To
          </MenuItem>
          {USERS.map((user) => (
            <MenuItem
              key={user}
              onClick={() => handleAssigneeChange(user)}
              selected={task.assignee === user}
            >
              <Avatar sx={avatarStyle(task.assignee === user, theme)}>
                {user
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              {user}
            </MenuItem>
          ))}
        </Menu>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
