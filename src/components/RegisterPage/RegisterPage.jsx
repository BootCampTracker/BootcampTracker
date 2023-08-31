import React from "react";
// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import { Box, Typography } from "@mui/material";

function RegisterPage() {

  return (
    <>
      <Box sx={{textAlign: 'center', margin: 5}}>
        <Typography variant="h1">
          Bootcamp Tracker
        </Typography>
      </Box>
      
      <RegisterForm />

    </>
  );
}

export default RegisterPage;
