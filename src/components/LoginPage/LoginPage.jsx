import React from "react";
// MUI
import { Box, Stack, Typography } from "@mui/material";
// CUSTOM COMPONENTS
import LoginForm from "../LoginForm/LoginForm";
function LoginPage() {
  return (
    <div className="background-img">
      <Box sx={{ textAlign: "center", margin: 5 }}>
        <Typography
          variant="h1"
          className="login-heading"
          sx={{ color: "#fff", fontSize: "4.8rem", fontWeight: "400" }}
        >
          Bootcamp Tracker
        </Typography>
      </Box>

      <LoginForm />
    </div>
  );
}

export default LoginPage;
