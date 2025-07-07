import { Typography } from "@mui/material";

function App() {
  return (
    <Typography
      variant="h5"
      sx={{
        textAlign: "center",
        fontWeight: 700,
        color: "primary.main",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      Task Management Board
    </Typography>
  );
}

export default App;
