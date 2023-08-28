import React from 'react';
import {useSelector} from 'react-redux';
import { Box, Typography, Button } from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Box>
      <Typography variant='h1'>
      Salary and hiring timeline transparency for bootcamps,
      visualized.
      </Typography>
      <Typography>
      <span style={{fontWeight: 'bold'}}>Bootcamp Salary Tracker is a valuable tool</span> for anyone considering, 
      enrolled in, or graduating from a bootcamp. 
      This tool helps users choose the right educational program for 
      their situation and informs them statistically about what to expect 
      as they pursue a career in the tech industry.
      </Typography>
      <link rel="stylesheet" href="" />Butts
    </Box>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
