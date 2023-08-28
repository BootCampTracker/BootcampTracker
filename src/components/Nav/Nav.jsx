import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import * as MUI from '@mui/material'; // Import MUI components
import './Nav.css';
import { useSelector } from 'react-redux';
import DrawerComponent from '../DrawerComponent/DrawerComponent';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div>
      <MUI.AppBar position="static">
        <MUI.Toolbar>
          <MUI.IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </MUI.IconButton>
          <MUI.Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link to="/home" className="nav-logo">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3629/3629539.png"
                alt="Logo"
                className="nav-logo-image"
              />
              <span className="nav-title">Bootcamp Tracker</span>
            </Link>
          </MUI.Typography>
          <MUI.Button color="inherit"></MUI.Button>
        </MUI.Toolbar>
      </MUI.AppBar>

      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/alumniform">
              Alumni Form
            </Link>

            <Link className="navLink" to="/profilepage">
              Profile Page
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
