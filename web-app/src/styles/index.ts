import { SxProps, Theme } from "@mui/material";

export const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
  padding: "0 10px",
  flexDirection: { sm: "row", xs: "column" },
  gap: { md: "0", xs: "10px" },
};

export const titleStyle = {
  textAlign: "center",
  fontWeight: 700,
  color: "primary.main",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

export const paperStyle = (statusColor: string) => ({
  minWidth: 368,
  backgroundColor: "background.paper",
  borderRadius: 2,
  p: 2,
  m: 1,
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  borderTop: `4px solid ${statusColor}`,
});

export const cardStyle = (
  statusColor: string,
  borderColor: string
): SxProps<Theme> => ({
  mb: 2,
  backgroundColor: statusColor,
  borderLeft: `4px solid ${borderColor}`,
  position: "relative",
});

export const menuButtonBoxStyle: SxProps<Theme> = {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 1,
};

export const menuButtonStyle: SxProps<Theme> = {
  minWidth: "auto",
  p: 0.5,
};

export const statusChipStyle = (
  theme: Theme,
  statusColor: string
): SxProps<Theme> => ({
  mt: 1,
  mb: 1.5,
  fontWeight: 500,
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  color: theme.palette.getContrastText(statusColor),
});

export const infoRowStyle: SxProps<Theme> = {
  display: "flex",
  justifyContent: "space-between",
};

export const infoItemStyle: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  mb: 0.5,
};

export const iconStyle: SxProps<Theme> = {
  mr: 1,
  opacity: 0.7,
};

export const sectionTitleStyle = (theme: Theme): SxProps<Theme> => ({
  fontWeight: 600,
  color: theme.palette.primary.main,
});

export const avatarStyle = (
  isSelected: boolean,
  theme: Theme
): SxProps<Theme> => ({
  width: 24,
  height: 24,
  fontSize: "0.75rem",
  mr: 1.5,
  bgcolor: isSelected ? theme.palette.primary.main : theme.palette.grey[700],
});

export const columnHeaderStyle = {
  mb: 2,
  fontWeight: 600,
  color: "text.primary",
  letterSpacing: "1px",
};

export const noTasksWrapper = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
};

export const noTasksTextStyle = {
  mb: 2,
  fontWeight: 400,
  color: "text.disabled",
  letterSpacing: "1px",
};

export const noTasksIconStyle = {
  fontSize: "120px",
};

export const boardStyle = {
  width: "100%",
  display: "flex",
  overflowX: "auto",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#2d2d2d",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#555",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#888",
  },
};

export const formWrapper = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 600, xs: "100%" },
  bgcolor: "background.paper",
  p: 4,
};
