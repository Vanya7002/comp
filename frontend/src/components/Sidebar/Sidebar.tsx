import {
  AssessmentOutlined,
  ComputerOutlined,
  DashboardOutlined,
  HistoryOutlined,
  LogoutOutlined,
  PeopleAltOutlined,
  AccountCircleOutlined,
  SettingsOutlined,
  SportsEsportsOutlined,
  TimelineOutlined,
} from "@mui/icons-material";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import type { ReactNode } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 250;

interface MenuItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const mainMenu: MenuItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardOutlined />,
  },
  {
    label: "Компьютеры",
    path: "/computers",
    icon: <ComputerOutlined />,
  },
  {
    label: "Сессии",
    path: "/sessions",
    icon: <TimelineOutlined />,
  },
  {
    label: "История",
    path: "/history",
    icon: <HistoryOutlined />,
  },
  {
    label: "Профиль",
    path: "/profile",
    icon: <AccountCircleOutlined />,
  },
];

const adminMenu: MenuItem[] = [
  {
    label: "Компьютеры",
    path: "/admin/computers",
    icon: <ComputerOutlined />,
  },
  {
    label: "Пользователи",
    path: "/admin/users",
    icon: <PeopleAltOutlined />,
  },
  {
    label: "Сессии",
    path: "/admin/sessions",
    icon: <SportsEsportsOutlined />,
  },
  {
    label: "Статистика",
    path: "/admin/statistics",
    icon: <AssessmentOutlined />,
  },
];

const bottomMenu: MenuItem[] = [
  {
    label: "Настройки",
    path: "/settings",
    icon: <SettingsOutlined />,
  },
  {
    label: "Выйти",
    path: "/logout",
    icon: <LogoutOutlined />,
  },
];

export default function Sidebar({
  mobileOpen,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleNavigate = (path: string) => {
    if (path === "/logout") {
      signOut();
      navigate("/login", { replace: true });
    } else {
      navigate(path);
    }
    onClose();
  };

  const renderMenuItem = (item: MenuItem) => {
    const isDashboard = item.path === "/";

    const active = isDashboard
      ? location.pathname === "/"
      : location.pathname === item.path;

    return (
      <ListItemButton
        key={item.path}
        onClick={() => handleNavigate(item.path)}
        selected={active}
        sx={{
          minHeight: 44,
          px: 1.5,
          mb: 0.5,
          borderRadius: 2,

          color: active
            ? "primary.main"
            : "text.secondary",

          "& .MuiListItemIcon-root": {
            minWidth: 38,
            color: "inherit",
          },

          "&.Mui-selected": {
            backgroundColor: "primary.light",
          },

          "&.Mui-selected:hover": {
            backgroundColor: "#E5EBFF",
          },

          "&:hover": {
            backgroundColor: "#F5F6F8",
          },
        }}
      >
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>

        <ListItemText
          primary={item.label}
          slotProps={{
            primary: {
              sx: {
                fontSize: 14,
                fontWeight: active ? 600 : 500,
              },
            },
          }}
        />
      </ListItemButton>
    );
  };

  const sidebarContent = (
    <Box
      sx={{
        width: drawerWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 72,
          px: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Box
          sx={{
            width: 38,
            height: 38,
            flexShrink: 0,
            borderRadius: 2,
            backgroundColor: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
          }}
        >
          <SportsEsportsOutlined />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Computer Club
          </Typography>

          <Typography
            sx={{
              fontSize: 11,
              color: "text.secondary",
            }}
          >
            Личный кабинет
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Main menu */}
      <Box
        sx={{
          px: 1.5,
          pt: 2,
        }}
      >
        <List disablePadding>
          {mainMenu.map(renderMenuItem)}
        </List>
      </Box>

      {/* Administration */}
      <Box
        sx={{
          px: 1.5,
          pt: 3,
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 10,
            fontWeight: 700,
            color: "#9CA3AF",
            letterSpacing: "0.08em",
          }}
        >
          АДМИНИСТРИРОВАНИЕ
        </Typography>

        <List disablePadding>
          {adminMenu.map(renderMenuItem)}
        </List>
      </Box>

      {/* Bottom */}
      <Box
        sx={{
          mt: "auto",
          px: 1.5,
          pb: 2,
        }}
      >
        <Divider
          sx={{
            mb: 1.5,
          }}
        />

        <List disablePadding>
          {bottomMenu.map(renderMenuItem)}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <Box
        component="aside"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          width: drawerWidth,
          flexShrink: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "#FFFFFF",
        }}
      >
        {sidebarContent}
      </Box>

      {/* Mobile sidebar */}
      <Drawer
        open={mobileOpen}
        onClose={onClose}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            border: 0,
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}