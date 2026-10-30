import { Box } from "@mui/material";

import { useState } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",

        display: "flex",

        backgroundColor:
          "background.default",
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() =>
          setMobileOpen(false)
        }
      />

      <Box
        sx={{
          minWidth: 0,
          flex: 1,

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <Box
          component="main"
          sx={{
            flex: 1,

            p: {
              xs: 2,
              sm: 2.5,
              md: 3,
            },

            overflow: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}