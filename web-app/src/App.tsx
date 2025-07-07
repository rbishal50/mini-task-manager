import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import darkTheme from "./theme/theme";
import { headerStyle, titleStyle } from "./styles";
import TaskBoard from "./components/TaskBoard/Taskboard";
import AddTaskModal from "./components/AddTaskModal";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container component="main" maxWidth="lg" sx={{ p: 4 }}>
        <CssBaseline />
        <Box sx={headerStyle}>
          <Typography variant="h5" sx={titleStyle}>
            Task Management Board
          </Typography>
          <AddTaskModal />
        </Box>
        <TaskBoard />
      </Container>
    </ThemeProvider>
  );
}

export default App;
