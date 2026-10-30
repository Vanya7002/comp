import { ComputerOutlined } from "@mui/icons-material";

import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
} from "@mui/material";

export type ComputerStatus =
  | "Свободен"
  | "Занят"
  | "Обслуживание";

export type ComputerType =
  | "Обычный"
  | "VIP";

export interface Computer {
  id: number;
  name: string;
  type: ComputerType;
  price: number;
  status: ComputerStatus;
}

interface ComputerCardProps {
  computer: Computer;
}

const statusStyles: Record<
  ComputerStatus,
  {
    color: string;
    background: string;
  }
> = {
  Свободен: {
    color: "#15803D",
    background: "#DCFCE7",
  },

  Занят: {
    color: "#DC2626",
    background: "#FEE2E2",
  },

  Обслуживание: {
    color: "#D97706",
    background: "#FEF3C7",
  },
};

export default function ComputerCard({
  computer,
}: ComputerCardProps) {
  const isAvailable =
    computer.status === "Свободен";

  const status =
    statusStyles[computer.status];

  return (
    <Card
      sx={{
        p: 2,

        minHeight: 205,

        display: "flex",
        flexDirection: "column",

        transition:
          "box-shadow 0.2s ease",

        "&:hover": isAvailable
          ? {
              boxShadow:
                "0 5px 18px rgba(15, 23, 42, 0.08)",
            }
          : {},
      }}
    >
      {/* Top */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,

            borderRadius: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "#F3F4F6",
            color: "text.secondary",
          }}
        >
          <ComputerOutlined />
        </Box>

        <Chip
          label={computer.status}
          size="small"
          sx={{
            height: 26,

            fontSize: 11,
            fontWeight: 600,

            color: status.color,
            backgroundColor: status.background,

            borderRadius: 1.5,
          }}
        />
      </Box>

      {/* Information */}
      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          {computer.name}
        </Typography>

        <Typography
          sx={{
            mt: 0.25,
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {computer.type}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontSize: 14,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {computer.price} ₽ / час
        </Typography>
      </Box>

      {/* Button */}
      <Button
        fullWidth
        variant={
          isAvailable
            ? "contained"
            : "outlined"
        }
        disabled={!isAvailable}
        sx={{
          mt: "auto",
          height: 38,
          fontSize: 13,

          ...(isAvailable
            ? {
                backgroundColor:
                  "primary.main",

                "&:hover": {
                  backgroundColor:
                    "primary.dark",
                },
              }
            : {
                borderColor:
                  "#E5E7EB",

                color: "#9CA3AF",
              }),
        }}
      >
        Выбрать
      </Button>
    </Card>
  );
}