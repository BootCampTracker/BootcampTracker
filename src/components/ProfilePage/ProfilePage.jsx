import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Grid,
  Typography
} from "@mui/material";
//import {useSelector, useDispatch} from 'react-redux';

function ProfilePage() {
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "white",
    marginTop: "50px",
    marginLeft: "50px"
  };

  const style2 = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "white",
    marginTop: "50px",
    marginLeft: "50px",
    textAlign: "center"
  };

  const listItemTextStyles= {
    letterSpacing: "1px",
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* Grid Item */}
          <List sx={style} component="table" aria-label="profile-details">
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
            <Divider />
            <Button>+ New Job</Button>
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item */}
          <List sx={style2} component="table" aria-label="profile-details">
            <Typography variant="h6" component="header">
                 <header>Benefits:</header>
            </Typography>
            <Divider/>
            <ListItem>
              <ListItemText
               primary="Health Insurance:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Dental Insurance:" />
            </ListItem>
            <ListItem>
              <ListItemText 
              primary="401K:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Long Term Disability:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Short Term Disability:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Equity:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Graduation to First Posistion:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="Yearly Bonus:" />
            </ListItem>
            <ListItem>
              <ListItemText
               primary="PTO:" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item */}
          <List >

          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
