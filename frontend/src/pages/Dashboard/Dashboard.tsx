import {
  AccessTimeOutlined,
  ComputerOutlined,
  HistoryOutlined,
  PaymentsOutlined,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { fetchComputers } from "../../api/computerAPI";
import { fetchComputerTypes } from "../../api/computerTypes";

import ComputerCard from "../../components/ComputerCard/ComputerCard";

import type {
  Computer,
} from "../../components/ComputerCard/ComputerCard";

import StatCard from "../../components/StatCard/StatCard";

const statusLabels = {
  available: "Свободен",
  occupied: "Занят",
  maintenance: "Обслуживание",
} as const;


export default function Dashboard() {
  const navigate = useNavigate();
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([fetchComputers(), fetchComputerTypes()])
      .then(([computerResponse, typeResponse]) => {
        if (!active) return;
        const typeMap = new Map(typeResponse.items.map((item) => [item.id, item]));
        setComputers(computerResponse.items.slice(0, 8).map((item) => {
          const computerType = typeMap.get(item.typeId);
          return {
            id: item.id,
            name: item.number.replace("PC", "PC "),
            type: (computerType?.name === "VIP" ? "VIP" : "Обычный") as Computer["type"],
            price: computerType?.pricePerHour ?? 100,
            status: statusLabels[item.status] as Computer["status"],
          };
        }));
      })
      .catch(() => {
        if (active) setLoadError("Не удалось загрузить компьютеры. Проверьте, что MSW запущен.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1440,
        mx: "auto",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          mb: 3,
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: {
              xs: 24,
              md: 28,
            },

            fontWeight: 700,
            color: "text.primary",
          }}
        >
          Добро пожаловать, Иван
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            color: "text.secondary",
          }}
        >
          Управляйте игровыми сессиями
          и компьютерами
        </Typography>
      </Box>

      {/* Statistics */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },

          gap: 2,

          mb: 4,
        }}
      >
        <StatCard
          title="Баланс"
          value="1 500 ₽"
          icon={<PaymentsOutlined />}
        />

        <StatCard
          title="Активная сессия"
          value="PC 05"
          subtitle="01:42 осталось"
          icon={<ComputerOutlined />}
        />

        <StatCard
          title="Всего часов"
          value="24,5 ч"
          icon={<AccessTimeOutlined />}
        />

        <StatCard
          title="Последняя сессия"
          value="Сегодня"
          subtitle="14:30"
          icon={<HistoryOutlined />}
        />
      </Box>

      {/* Computers header */}
      <Box
        sx={{
          display: "flex",

          alignItems: {
            xs: "flex-start",
            sm: "center",
          },

          justifyContent:
            "space-between",

          flexDirection: {
            xs: "column",
            sm: "row",
          },

          gap: 1,

          mb: 2,
        }}
      >
        <Box>
          <Typography
            component="h2"
            sx={{
              fontSize: 20,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            Компьютеры
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            Выберите доступный компьютер
          </Typography>
        </Box>

        <Button
          variant="text"
          onClick={() =>
            navigate("/computers")
          }
          sx={{
            color: "primary.main",
            fontSize: 13,
            fontWeight: 600,
            px: 1,
          }}
        >
          Все компьютеры →
        </Button>
      </Box>

      {/* Computer cards */}
      {loadError && <Alert severity="error" sx={{ mb: 2 }}>{loadError}</Alert>}
      {loading ? <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}><CircularProgress /></Box> : <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))",
          },

          gap: 2,
        }}
      >
        {computers.map((computer) => (
          <ComputerCard
            key={computer.id}
            computer={computer}
          />
        ))}
      </Box>}
    </Box>
  );
}