import {
 Drawer,
 List,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Typography,
 Box,
 IconButton,
 Avatar,
 Divider,
 AppBar,
 Toolbar,
 useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 260;

export default function Layout({ children }) {
 const mobile = useMediaQuery("(max-width:900px)");
 const { user, logout } = useAuth();
 const loc = useLocation();
 const nav = useNavigate();
 const [open, setOpen] = useState(false);

 const menu = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Boards", icon: <ViewKanbanIcon />, path: "/kanban" },
  { label: "Pipelines", icon: <RocketLaunchIcon />, path: "/pipelines" },
 ];

 const Sidebar = (
  <Box
   sx={{
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(180deg,#6366f1,#22d3ee)",
    p: 2,
   }}
  >
   {/* BRAND */}
   <Box sx={{ mb: 3 }}>
    <Typography variant="h5" fontWeight={900} color="white">
     AgileFlow
    </Typography>
    <Typography fontSize={12} color="white" sx={{ opacity: 0.8 }}>
     Agile Project Suite
    </Typography>
   </Box>

   {/* MENU */}
   <Box
    sx={{
     background: "rgba(255,255,255,.95)",
     borderRadius: 5,
     p: 2,
     boxShadow: "0 40px 80px rgba(0,0,0,.25)",
     flexGrow: 1,
    }}
   >
    <List>
     {menu.map(m => {
      const active = loc.pathname === m.path;

      return (
       <ListItemButton
        key={m.path}
        onClick={() => {
         nav(m.path);
         setOpen(false);
        }}
        sx={{
         borderRadius: 4,
         mb: 1.5,
         py: 1.4,
         background: active
          ? "linear-gradient(135deg,#6366f1,#22d3ee)"
          : "transparent",
         color: active ? "white" : "#0f172a",
         boxShadow: active
          ? "0 12px 30px rgba(99,102,241,.45)"
          : "none",
         "&:hover": {
          transform: "translateX(6px)",
          background: active
           ? "linear-gradient(135deg,#6366f1,#22d3ee)"
           : "#eef2ff",
         },
        }}
       >
        <ListItemIcon sx={{ color: active ? "white" : "#6366f1" }}>
         {m.icon}
        </ListItemIcon>

        <ListItemText primary={m.label} />
       </ListItemButton>
      );
     })}

     {/* LOGIN / LOGOUT */}
     <Divider sx={{ my: 2 }} />

     {user ? (
      <ListItemButton
       onClick={logout}
       sx={{
        borderRadius: 4,
        color: "#ef4444",
        "&:hover": { background: "#fee2e2" },
       }}
      >
       <ListItemIcon sx={{ color: "#ef4444" }}>
        <LogoutIcon />
       </ListItemIcon>
       <ListItemText primary="Logout" />
      </ListItemButton>
     ) : (
      <ListItemButton
       onClick={() => nav("/login")}
       sx={{
        borderRadius: 4,
        color: "#2563eb",
        "&:hover": { background: "#dbeafe" },
       }}
      >
       <ListItemIcon sx={{ color: "#2563eb" }}>
        <LoginIcon />
       </ListItemIcon>
       <ListItemText primary="Login" />
      </ListItemButton>
     )}
    </List>
   </Box>

   {user && (
    <Box
     sx={{
      mt: 2,
      p: 1.5,
      borderRadius: 3,
      background: "rgba(255,255,255,.2)",
      display: "flex",
      alignItems: "center",
      gap: 1,
     }}
    >
     <Avatar sx={{ width: 32, height: 32 }}>{user[0]}</Avatar>
     <Typography color="white" fontSize={13}>
      Logged in
     </Typography>
    </Box>
   )}
  </Box>
 );

 return (
  <Box sx={{ display: "flex" }}>
   {/* MOBILE TOP BAR */}
   {mobile && (
    <AppBar position="fixed" elevation={0} sx={{ background: "white" }}>
     <Toolbar>
      <IconButton onClick={() => setOpen(true)}>
       <MenuIcon />
      </IconButton>

      <Typography
       variant="h6"
       fontWeight={900}
       sx={{
        background: "linear-gradient(90deg,#6366f1,#22d3ee)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
       }}
      >
       AgileFlow
      </Typography>
     </Toolbar>
    </AppBar>
   )}

   {/* DESKTOP SIDEBAR */}
   {!mobile && (
    <Drawer
     variant="permanent"
     sx={{
      width: drawerWidth,
      [`& .MuiDrawer-paper`]: {
       width: drawerWidth,
       border: "none",
      },
     }}
    >
     {Sidebar}
    </Drawer>
   )}

   {/* MOBILE DRAWER */}
   {mobile && (
    <Drawer open={open} onClose={() => setOpen(false)}>
     <Box sx={{ width: drawerWidth }}>{Sidebar}</Box>
    </Drawer>
   )}

   {/* CONTENT */}
   <Box
    sx={{
     flexGrow: 1,
     p: mobile ? 2 : 4,
     mt: mobile ? 8 : 0,
     background: "radial-gradient(circle at top,#f0f9ff,#ffffff)",
     minHeight: "100vh",
    }}
   >
    {children}
   </Box>
  </Box>
 );
}
