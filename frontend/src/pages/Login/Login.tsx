import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { SportsEsportsOutlined } from "@mui/icons-material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

export default function Login() {
  const { signIn, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("ivan@example.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!authLoading && isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (email.trim().toLowerCase() !== "ivan@example.com" || password !== "123456") {
      setError("Неверный email или пароль. Используйте демонстрационные данные ниже.");
      return;
    }
    setBusy(true);
    signIn({ id: "1", name: "Иван Петров", avatarUrl: "" });
    const from = (location.state as { from?: string } | null)?.from ?? "/";
    navigate(from, { replace: true });
    setBusy(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", p: 2, bgcolor: "background.default" }}>
      <Card sx={{ width: "100%", maxWidth: 430, borderRadius: 3 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ width: 48, height: 48, mb: 2.5, borderRadius: 2, bgcolor: "primary.main", color: "white", display: "grid", placeItems: "center" }}>
            <SportsEsportsOutlined />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 750 }}>Computer Club</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>Войдите в личный кабинет клуба</Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
            <TextField label="Email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth />
            <TextField label="Пароль" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required fullWidth />
            <Button type="submit" variant="contained" size="large" disabled={busy} sx={{ mt: 1, minHeight: 46 }}>Войти</Button>
          </Box>
          <Box sx={{ mt: 3, p: 2, bgcolor: "#F7F8FC", borderRadius: 2 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Демонстрационный вход</Typography>
            <Typography sx={{ mt: 0.5, fontSize: 12, color: "text.secondary" }}>ivan@example.com · пароль 123456</Typography>
          </Box>
          <Typography sx={{ mt: 2, fontSize: 11, color: "text.secondary", textAlign: "center" }}>Учебная авторизация без подключения к серверу</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
