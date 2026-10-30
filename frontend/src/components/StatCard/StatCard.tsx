import { Box, Card, Typography } from "@mui/material";

import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        p: 2.25,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            sx={{
              mb: 1,
              fontSize: 13,
              color: "text.secondary",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 22,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {value}
          </Typography>

          {subtitle && (
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            width: 40,
            height: 40,
            flexShrink: 0,

            borderRadius: 2,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            backgroundColor: "primary.light",
            color: "primary.main",
          }}
        >
          {icon}
        </Box>
      </Box>
    </Card>
  );
}