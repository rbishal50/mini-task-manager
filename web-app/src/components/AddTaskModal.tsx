import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TaskForm from "./TaskForm";
import { formWrapper } from "../styles/";

export default function AddTaskModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create a new task
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Create a new task"
        aria-describedby="Modal to create a new task"
      >
        <Box sx={formWrapper}>
          <TaskForm onModalClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
