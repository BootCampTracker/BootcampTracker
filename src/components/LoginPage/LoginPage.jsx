import React from "react";
// CUSTOM COMPONENTS
import LoginForm from "../LoginForm/LoginForm";

import { Box, Stack} from "@mui/material";
function LoginPage() {
  return (
    <>
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: "100vh" }}
    >
      <LoginForm />
    </Stack>
    </>
  );
}

export default LoginPage;
