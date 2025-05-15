import { styled } from "@mui/material/styles";
import {
  Paper,
  Container as MuiContainer,
  Box as MuiBox,
  Alert as MuiAlert,
} from "@mui/material";
import { NavLink as Link } from "react-router-dom";
import MuiIconButton from "@mui/material/IconButton";

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.primary,
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
  },
}));

export const StyledContainer = styled(MuiContainer)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const CardHeader = styled(MuiBox)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
}));

export const IconStyle = {
  fontSize: "28px",
};

export const StyledAlert = styled(MuiAlert)(({ theme }) => ({
  width: "100%",
  borderRadius: 12,
}));

export const Container = styled(MuiBox)(({ theme, isCollapsed }) => ({
  backgroundColor: "#24292F",
  width: isCollapsed ? "80px" : "240px",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
}));

export const CollapsedLogo = styled("img")(({ theme, isCollapsed }) => ({
  width: "40px",
  marginBottom: theme.spacing(2),
  display: isCollapsed ? "block" : "none",
}));

export const NavLink = styled(Link)(({ theme, isCollapsed }) => ({
  color: theme.palette.text.secondary,
  textDecoration: "none",
  padding: theme.spacing(1),
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: isCollapsed ? "center" : "flex-start",
  marginBottom: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  transition: "background 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  svg: {
    marginRight: isCollapsed ? 0 : theme.spacing(1),
    fontSize: "20px",
  },
  span: {
    display: isCollapsed ? "none" : "inline",
  },
}));

export const Footer = styled(MuiBox)(({ theme }) => ({
  marginTop: "auto",
  paddingTop: theme.spacing(2),
  borderTop: `1px solid rgba(255, 255, 255, 0.2)`,
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export const ToggleButton = styled(MuiIconButton)(({ theme, isCollapsed }) => ({
  color: theme.palette.text.secondary,
  marginLeft: isCollapsed ? 0 : "auto",
  marginBottom: theme.spacing(2),
  display: "block",
  "@media (min-width: 768px)": {
    display: "none",
  },
}));
