import React from "react";
// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";
import { Box, Typography } from "@mui/material";

function RegisterPage() {

  return (
    <div className="background-img">
      <Box sx={{textAlign: 'center', margin: 5}}>
        <Typography variant="h1" sx={{ color: '#fff', fontSize: '4.8rem', fontWeight: '400'}}>
          Bootcamp Tracker
        </Typography>
      </Box>
      
      <RegisterForm />

    </div>
  );
}

export default RegisterPage;
