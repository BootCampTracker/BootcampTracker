import React from "react";
import { Link } from 'react-router-dom'; 
import "./Footer.css";

import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <>
      <CssBaseline />
      <AppBar 
      position="fixed" 
      color="primary"
      sx={{ top: 'auto', bottom: '0'}}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, color: 'primary'}}/>
          <a href="https://github.com/ZakariyeAden/Bootcamp-Tracker" style={{color: "white", textDecoration: "none"}}>Contribute to this project!</a>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Footer;
