import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {AppBar, Toolbar, Button, Typography, IconButton, Link} from '@mui/material'; // Import MUI components
import './Nav.css';
import {useSelector} from 'react-redux';
import DrawerComponent from '../DrawerComponent/DrawerComponent';

function Nav() {
    const user = useSelector((store) => store.user);

    return (
        <div>
            <AppBar position="static" sx={{alignItems: 'center'}}>
                <Toolbar>
                    {user.id ?
                    <>
                    <span style={{float: 'left'}}><DrawerComponent /></span>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"sx={{mr: 2}}>
                        {/* Add the menu icon */} </IconButton>
                    <Typography variant="h6" component="div"
                        sx={{flexGrow: 1,display: 'flex',alignItems: 'center'}}>
                        <Link to="/user" className="nav-logo" underline="always">
                            <img src="https://cdn-icons-png.flaticon.com/512/3629/3629539.png" alt="Logo" className="nav-logo-image"/>
                            <span className="nav-title">Bootcamp Tracker</span>
                        </Link>
                    </Typography>
                    </>
                    :
                    <>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"sx={{mr: 2}}>
                        {/* Add the menu icon */} </IconButton>
                    <Typography variant="h6" component="div"
                        sx={{flexGrow: 1,display: 'flex',alignItems: 'center'}}>
                        <Link to="/user" className="nav-logo" underline="always">
                            <img src="https://cdn-icons-png.flaticon.com/512/3629/3629539.png" alt="Logo" className="nav-logo-image"/>
                            <span className="nav-title">Bootcamp Tracker</span>
                        </Link>
                    </Typography>
                    </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Nav;
