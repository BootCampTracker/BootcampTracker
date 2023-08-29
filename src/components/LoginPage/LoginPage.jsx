import React from "react";
// CUSTOM COMPONENTS
import LoginForm from "../LoginForm/LoginForm";

import {Box, Stack, Typography} from "@mui/material";
function LoginPage() {
  return (
    <>
    <Box sx={{textAlign: 'center', margin: 5}}>
    <Typography variant="h1">
      Bootcamp Tracker
    </Typography>
    </Box>
    
      <LoginForm />
    
    </>
  );
}

export default LoginPage;
