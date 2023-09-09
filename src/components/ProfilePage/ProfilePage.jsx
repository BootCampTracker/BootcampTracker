// HOOKS
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
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
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import CottageRoundedIcon from "@mui/icons-material/CottageRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LocalAirportRoundedIcon from "@mui/icons-material/LocalAirportRounded";
import "./ProfilePage.css";

// Chart.js components
import RoleGraph from "../Graphs/ProfileGraphs/RoleGraph";
import SalaryGraph from "../Graphs/ProfileGraphs/SalaryGraph";


function ProfilePage() {
  // HOOKS
  const history = useHistory();
  const dispatch = useDispatch();
  // const { profileId } = useParams();

  // bringing in use selector and pulling from profileReducer/user store
  const user = useSelector((store) => store.user);
  const profileInfo = useSelector((store) => store.profileReducer);
  console.log("user id is", user.id);
  // console.log("profileInfo is ", profileInfo);

  // Load Profile data to use in the Graph and profile info
  useEffect(() => {
    // dispatch({ type: "FETCH_PROFILE_GRAPHS", payload: profileId });
    dispatch({ type: "FETCH_PROFILE_INFO", payload: user.id });
  }, []);

  //setting use history to go to alumni form when new job is clicked 
  const alumniRoute = () => {
    history.push("/alumniform")
  }

  let info = profileInfo[0]+'?';
  console.log("profileInfo is ", profileInfo);
  // console.log('info is:', info.salary);

  return (
    <>
        <Grid container spacing={2} >
          <Grid className = "CardStyle" item xs={3}>
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
                <ListItemText primary="Salary:" secondary={profileInfo[profileInfo.length - 1]?.salary} className = "bold-secondary-text"/>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Current Job:"
                  secondary={profileInfo[profileInfo.length - 1]?.job_title}
                  className = "bold-secondary-text"
                />
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
                  secondary={profileInfo[profileInfo.length - 1]?.job_number}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SchoolIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Bootcamp:" secondary={profileInfo[profileInfo.length - 1]?.bootcamp} className = "" />
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
                  secondary={new Date(profileInfo[profileInfo.length - 1]?.graduation_date).toLocaleString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                  className = "bold-secondary-text"
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
                  secondary={new Date(profileInfo[profileInfo.length - 1]?.date_hired).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <CottageRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="State:" secondary={profileInfo[profileInfo.length - 1]?.state} className = "" />
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
                  secondary={profileInfo[profileInfo.length - 1]?.company}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid className = "CardStyle" item xs={3} marginLeft="200px">
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
                  secondary={profileInfo[profileInfo.length - 1]?.health_insurance ? "Yes" : "No"}
                  className = "bold-secondary-text"
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
                  secondary={profileInfo[profileInfo.length - 1]?.dental_insurance ? "Yes" : "No"}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="401K:"
                  secondary={profileInfo[profileInfo.length - 1]?.when_im_old ? "Yes" : "No"}
                  className = "bold-secondary-text"
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
                  primary="Long Term Disability:"
                  secondary={profileInfo[profileInfo.length - 1]?.long_term_disability ? "Yes" : "No"}
                  className = "bold-secondary-text"
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
                  secondary={profileInfo[profileInfo.length - 1]?.short_term_disability ? "Yes" : "No"}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <GroupsRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Equity:"
                  secondary={profileInfo[profileInfo.length - 1]?.equity ? "Yes" : "No"}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Bonuses:"
                  secondary={profileInfo[profileInfo.length - 1]?.total_yearly_bonus}
                  className = "bold-secondary-text"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <LocalAirportRoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="PTO:"
                  secondary={profileInfo[profileInfo.length - 1]?.PTO ? "Yes" : "No"}
                  className = "bold-secondary-text"
                  />
              </ListItem>
              <Divider />
            </List>
          </Grid>
          <Grid className = "CardStyle" item xs={3}>
            <List>
              <ListItem>
                <SalaryGraph />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <RoleGraph />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      <Grid marginLeft="160px" marginTop= "25px">
        <Button onClick= {alumniRoute} color="primary" variant="contained"> New Job</Button>
      </Grid>
    </>
  );
};

export default ProfilePage;
