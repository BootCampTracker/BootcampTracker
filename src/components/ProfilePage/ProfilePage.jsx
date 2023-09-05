// HOOKS
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
// MUI and CSS
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  Grid,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
// Icons
import WorkIcon from "@mui/icons-material/Work";
import PaidIcon from "@mui/icons-material/Paid";
import MovingIcon from "@mui/icons-material/Moving";
import SchoolIcon from "@mui/icons-material/School";
import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import LocalAirportRoundedIcon from '@mui/icons-material/LocalAirportRounded';
import "./ProfilePage.css";
// CUSTOM COMPONENTS
import RoleGraph from "../Graphs/ProfileGraphs/RoleGraph";
import SalaryGraph from "../Graphs/ProfileGraphs/SalaryGraph";
function ProfilePage() {
  // HOOKS
  const dispatch = useDispatch();
  const { profileId } = useParams();
  // Load Profile data to use in the Graph
  useEffect(() => {
    dispatch({ type: "FETCH_PROFILE_GRAPHS", payload: profileId });
  }, []);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* Grid Item 1*/}
          <Typography variant="h5" component="header" className="subheading">
           Job:
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PaidIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Salary:" secondary="Add salary here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Current Job:" secondary="Add job here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MovingIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Job Number:"
                secondary="Add job number here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Bootcamp:"
                secondary="Add bootcamp here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <DateRangeRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Graduation Date:"
                secondary="Add Grad date here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Date hired:"
                secondary="Add date hired  here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CottageRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="State:" secondary="Add State here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BusinessRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Company Name:"
                secondary="Add Company name here!"
              />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item 3*/}

          <Typography variant="h5" component="header" className="subheading">
            Benefits:
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HealthAndSafetyRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Health Insurance:"
                secondary="Add Health here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Dental Insurance:"
                secondary="Add Dental here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="401K:" secondary="Add 401K here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Long Term Disability:"
                secondary="Add LTD here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Short Term Disability:"
                secondary="Add STD here!"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <GroupsRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Equity:" secondary="Add Equity here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AttachMoneyRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Bonuses:" secondary="Add Bonuses here!" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalAirportRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="PTO:" secondary="Add PTO  here!" />
            </ListItem>
            <Divider />
          </List>
        </Grid>
        <Grid item xs={4}>
          {/* Grid Item 4*/}
          <List className="CardStyle3">
            <ListItem>
              <SalaryGraph />
            </ListItem>
          </List>
          <List className="CardStyle3">
            <ListItem>
              <RoleGraph />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}

export default ProfilePage;
