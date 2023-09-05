import React from "react";
import './ProfilePage.css'
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
//import {useSelector, useDispatch} from 'react-redux';

function ProfilePage() {
 

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* Grid Item 1*/}
          <List className="CardStyle" component="table" aria-label="profile-details">
            <ListItem>
              <ListItemText primary="Current Job:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Salary:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Number of Jobs:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Bootcamp:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Graduation Date:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="State:" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Company Name:" />
            </ListItem>
          </List>
          <List
            className="CardStyle2"
            component="table"
            aria-label="profile-details"
            dense="table"
            align="center"
          >
            <Typography variant="h5" component="header">
              <header>Benefits:</header>
            </Typography>
            <Divider />
            <ListItem >
              <ListItemText primary="Health Insurance:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Dental Insurance:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="401K:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Long Term Disability:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Short Term Disability:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Equity:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Graduation to First Posistion:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="Yearly Bonus:" />
            </ListItem>
            <ListItem >
              <ListItemText primary="PTO:" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item 3*/}
          <List className="CardStyle3">
            <ListItem>
              <Grid>
                <Typography Variant="h6">Role Timeline</Typography>
                <Divider />
              </Grid>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item 4*/}
          <List className="CardStyle3">
            <ListItem>
              <Grid>
                <Typography Variant="h6">Salary Overtime</Typography>
                <Divider />
              </Grid>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Grid  marginLeft="150px" marginTop="20px">
        <Button variant="contained" size="large">
          + New Job
        </Button>
      </Grid>
    </>
  );
}

export default ProfilePage;