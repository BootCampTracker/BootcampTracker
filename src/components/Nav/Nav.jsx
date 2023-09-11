// HOOKS
import React from "react";
import { useSelector } from "react-redux";
// MUI
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Link,
} from "@mui/material"; 
import "./Nav.css";
// Components
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import LogOutButton from "../LogOutButton/LogOutButton";


function Nav() {
  const user = useSelector(store => store.user);

  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ top: "0", bottom: "auto" }}
      >
        <Toolbar>
          {user.id ? (
            <>
              <span style={{ float: "left" }}>
                <DrawerComponent />
              </span>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
              >
                <Link to="/user" className="nav-logo" underline="always">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3629/3629539.png"
                    alt="Logo"
                    className="nav-logo-image"
                  />
                  <span className="nav-title">Bootcamp Tracker</span>
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                {/* Add the menu icon */}
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
              >
                <Link to="/login" className="nav-logo" underline="always">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3629/3629539.png"
                    alt="Logo"
                    className="nav-logo-image"
                  />
                  <span className="nav-title">Bootcamp Tracker</span>
                </Link>
              </Typography>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
