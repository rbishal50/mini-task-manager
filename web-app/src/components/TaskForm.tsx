import React, { useState } from "react";
import { Button, TextField, MenuItem, Box, Typography } from "@mui/material";
import { USERS } from "../constants/users";
import useTaskStore from "../store/taskStore";

interface TaskFormProps {
  onModalClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onModalClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitter, setSubmitter] = useState(USERS[0]);
  const addTask = useTaskStore((state) => state.addTask);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim(),
      submitter,
      assignee: "",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setSubmitter(USERS[0]);
    onModalClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Create New Task
      </Typography>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        select
        label="Submitter"
        value={submitter}
        onChange={(e) => setSubmitter(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        {USERS.map((user) => (
          <MenuItem key={user} value={user}>
            {user}
          </MenuItem>
        ))}
      </TextField>
      <Box component="footer" sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" color="primary">
          Create Task
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          onClick={onModalClose}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
