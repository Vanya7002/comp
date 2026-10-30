import {
  Box,
  Typography,
} from "@mui/material";

import { useLocation } from "react-router-dom";

export default function Placeholder() {
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: 400,

        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        Страница в разработке
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        {location.pathname}
      </Typography>
    </Box>
  );
}