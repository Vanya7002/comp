import { AccountCircleOutlined, MenuOutlined, NotificationsNoneOutlined } from "@mui/icons-material";
import { Avatar, Badge, Box, IconButton, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";

interface HeaderProps { onMenuClick: () => void; }
const titles: Record<string, string> = {
  "/": "Dashboard", "/computers": "Компьютеры", "/sessions": "Сессии", "/history": "История",
  "/profile": "Профиль", "/admin/computers": "Управление компьютерами", "/admin/users": "Пользователи",
  "/admin/sessions": "Управление сессиями", "/admin/statistics": "Статистика", "/settings": "Настройки",
};
export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const name = user?.name ?? "Иван Петров";
  return (
    <Box component="header" sx={{ height: 72, px: { xs: 2, md: 3 }, display: "flex", alignItems: "center", justifyContent: "space-between", bgcolor: "#FFFFFF", borderBottom: "1px solid", borderColor: "divider" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={onMenuClick} sx={{ display: { xs: "flex", md: "none" } }}><MenuOutlined /></IconButton>
        <Typography sx={{ fontSize: 16, fontWeight: 650, color: "text.primary" }}>{titles[pathname] ?? "Computer Club"}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
        <Box sx={{ display: { xs: "none", sm: "block" }, px: 1.5, py: 0.75, borderRadius: 2, bgcolor: "#F7F8FA" }}>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Баланс</Typography>
          <Typography sx={{ fontSize: 14, fontWeight: 700 }}>1 500 ₽</Typography>
        </Box>
        <IconButton aria-label="Уведомления"><Badge color="error" variant="dot" overlap="circular"><NotificationsNoneOutlined /></Badge></IconButton>
        <Avatar sx={{ width: 38, height: 38, bgcolor: "#E8EDFF", color: "primary.main" }}><AccountCircleOutlined /></Avatar>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{name}</Typography>
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>Клиент клуба</Typography>
        </Box>
      </Box>
    </Box>
  );
}
