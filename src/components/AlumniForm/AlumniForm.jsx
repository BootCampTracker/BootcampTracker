// import HOOKS
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import MUI and Assets
import {
  Box,
  Typography,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  TextField,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import SoftwareEngineerImg from '../Assets/SoftwareEngineer.png'
import Swal from "sweetalert2";
import "./AlumniForm.css";
// Form Data
import bootcamps from "./FormData/bootcamps";
import JobDuration from "./FormData/jobDuration";
import JobType from "./FormData/jobType";
import JobTitle from "./FormData/jobTitle";
import JobRole from "./FormData/jobRole";
import states from "./FormData/states";

// This is the AlumniForm component
function AlumniForm() {
  // HOOKS
  // bring in useDispatch hook and store in the variable dispatch
  const dispatch = useDispatch();
  // bring in user global state from the store
  const user = useSelector(store => store.user);
  // bring in useHistory and store in the variable history
  const history = useHistory();
  // local state hook to track errors (just being used for hours worked right now)
  const [error, setError] = useState(false);
  // local state to save ALL data that the user is filling out on the page
  const [jobInfoInput, setJobInfoInput] = useState({
    bootcamp: "",
    gradDate: "",
    jobTitle: "",
    jobRole: "",
    company: "",
    states: "",
    promotions: "",
    position: "",
    hours: "",
    jobType: "",
    workplace: "",
    hireDate: "",
    salary: "",
    health: "",
    dental: "",
    PTO: "",
    fourZeroOneK: "",
    STD: "",
    LTD: "",
    bonuses: "",
    equity: "",
    extra: "",
  });

  // Submit Form and dispatch
  const handleSubmit = event => {
    // prevent the form from refreshing the page on submission
    event.preventDefault();
    // log that the from has been submitted, along with what was submitted
    console.log("Submitted", jobInfoInput);
    // log the user id
    console.log("User id:", user.id);

    // validation to check that hours worked does not exceed 60, if it does, throw an error
    if (jobInfoInput.hours > 60 || jobInfoInput.hours < 0) {
      setError(true);
      return;
    }
    setError(false);

    // Dispatch an action to the saga for ALL information filled out by the user
    dispatch({
      type: "ADD_JOB_INFO",
      payload: {
        jobUserId: user.id,
        benefitUserId: user.id,
        bootcampUserId: user.id,
        jobTitle: jobInfoInput.jobTitle,
        jobLevel: jobInfoInput.jobRole,
        company: jobInfoInput.company,
        state: jobInfoInput.states,
        promotions: jobInfoInput.promotions,
        jobNumber: jobInfoInput.position,
        hours: jobInfoInput.hours,
        workplace: jobInfoInput.workplace,
        jobType: jobInfoInput.jobType,
        dateHired: jobInfoInput.hireDate,
        salary: jobInfoInput.salary,
        gradDate: jobInfoInput.gradDate,
        bootcamp: jobInfoInput.bootcamp,
        health: jobInfoInput.health,
        dental: jobInfoInput.dental,
        PTO: jobInfoInput.PTO,
        fourZeroOneK: jobInfoInput.fourZeroOneK,
        equity: jobInfoInput.equity,
        bonuses: jobInfoInput.bonuses,
        LTD: jobInfoInput.LTD,
        STD: jobInfoInput.STD,
        notes: jobInfoInput.extra,
      },
    });

    // Modal alert from sweetalert that the form has successfully been submitted
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Anonymously submitted!",
      showConfirmButton: false,
      timer: 1500,
    });

    // push the user to the url /profile
    history.push("/profile");
    //   Clear inputs on the AlumniForm
    setJobInfoInput("");
  };

  // Auto fill the form when clicked anywhere on the page!
  /*
  const handleFillForm = () => {
    console.log("Fill the Form:");
    setJobInfoInput({
      hours: 40,
      bootcamp: "Prime Digital Academy",
      jobType: "Full-time",
      jobTitle: "Full Stack Engineer",
      bonuses: 120,
      jobRole: "Entry Level",
      company: "Target",
      states: "Minnesota",
      position: 1,
      workplace: "Hybrid",
      salary: 70000,
      extra:
        "Target was the best place worked at for my first position, Thanks to the Target team!",
      gradDate: "2023-09-15",
      hireDate: "2023-10-20",
      health: "TRUE",
      dental: "TRUE",
      PTO: "TRUE",
      fourZeroOneK: "TRUE",
      equity: "TRUE",
      LTD: "FALSE",
      STD: "FALSE",
      promotions: "TRUE",
    });
  };
   */

  return (
    <div className="main-section">
      <h1 className="main-heading">Anonymously submit your information</h1>
      <Grid container>
        <Grid item xs={6}>
          <form onSubmit={handleSubmit} className="form-section">
            {/* Bootcamps and Graduation Date  */}
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              Bootcamps
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Click on this Label and it will Auto fill */}
              <label onClick={handleFillForm}>Bootcamp graduated from:</label>
              <Select
                id="demo-simple-select"
                label="Bootcamps"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, bootcamp: e.target.value })
                }
                required
                value={jobInfoInput.bootcamp}
              >
                {bootcamps.map(bootcamp => {
                  return (
                    <MenuItem key={bootcamp.id} value={bootcamp.name}>
                      {bootcamp.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <label>Graduation Date:</label>
              <TextField
                type="date"
                placeholder="Graduation Date"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, gradDate: e.target.value })
                }
                value={jobInfoInput.gradDate}
                required
              />
            </Box>

            {/* Job Information  */}
            <Typography
              sx={{
                fontSize: "1.4rem",
                fontWeight: "700",
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              Job Information
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <label>Job Level</label>
              <Select
                labelId="job-label"
                id="job-label"
                label="Job Level"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, jobRole: e.target.value })
                }
                value={jobInfoInput.jobRole}
                required
              >
                {JobTitle.map(job => {
                  return (
                    <MenuItem key={job.id} value={job.title}>
                      {job.title}
                    </MenuItem>
                  );
                })}
              </Select>
              <label>Job Title</label>
              <Select
                id="demo-simple-select"
                label="Job Title"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, jobTitle: e.target.value })
                }
                value={jobInfoInput.jobTitle}
                required
              >
                {JobRole.map(job => {
                  return (
                    <MenuItem key={job.id} value={job.role}>
                      {job.role}
                    </MenuItem>
                  );
                })}
              </Select>
              <label id="demo-simple-select-label">Company Name</label>
              <TextField
                type="text"
                placeholder="Company Name"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, company: e.target.value })
                }
                value={jobInfoInput.company}
                required
              />
              <label id="demo-simple-select-label">States</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="States"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, states: e.target.value })
                }
                required
                value={jobInfoInput.states}
              >
                {states.map(state => {
                  return (
                    <MenuItem key={state.id} value={state.name}>
                      {state.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box sx={{ margin: "1rem 0" }}>
              <FormLabel id="promotion-radio-group">Promotions</FormLabel>
              <RadioGroup
                row
                aria-labelledby="promotion-radio-group"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    promotions: e.target.value,
                  })
                }
                required
                value={jobInfoInput.promotions}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <TextField
                id="demo-simple-select"
                label="Position"
                type="number"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, position: e.target.value })
                }
                required
                value={jobInfoInput.position}
              />
              <label id="demo-simple-select-label">Hours Worked</label>
              <TextField
                type="number"
                placeholder="Hours Worked"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, hours: e.target.value })
                }
                required
                value={jobInfoInput.hours}
              />
              <label id="demo-simple-select-label">Job Duration</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Job Duration"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    jobType: e.target.value,
                  })
                }
                required
                value={jobInfoInput.jobType}
              >
                {JobDuration.map(job => {
                  return (
                    <MenuItem key={job.id} value={job.duration}>
                      {job.duration}
                    </MenuItem>
                  );
                })}
              </Select>

              <label id="demo-simple-select-label">Workplace</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Job Type"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    workplace: e.target.value,
                  })
                }
                required
                value={jobInfoInput.workplace}
              >
                {JobType.map(job => {
                  return (
                    <MenuItem key={job.id} value={job.type}>
                      {job.type}
                    </MenuItem>
                  );
                })}
              </Select>
              <label id="demo-simple-select-label">Hire Date</label>
              <TextField
                type="date"
                placeholder="Hire Date"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, hireDate: e.target.value })
                }
                required
                value={jobInfoInput.hireDate}
              />
              <label id="demo-simple-select-label">Salary</label>
              <TextField
                type="number"
                placeholder="Salary - Yearly/hourly"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, salary: e.target.value })
                }
                required
                value={jobInfoInput.salary}
                error={error}
              />
              <FormLabel id="bonus-radio-group">Bonuses</FormLabel>
              <TextField
                type="number"
                placeholder="Bonuses"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    bonuses: e.target.value,
                  })
                }
                required
                value={jobInfoInput.bonuses}
              />
            </Box>
            {/* Benefits */}
            <Box sx={{ marginTop: "1rem" }}>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                Benefits
              </Typography>
              <FormLabel id="health-insurance-radio-group">
                Health Insurance
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="health-insurance-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, health: e.target.value })
                }
                required
                value={jobInfoInput.health}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="dental-insurance-radio-group">
                Dental Insurance
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="dental-insurance-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, dental: e.target.value })
                }
                value={jobInfoInput.dental}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="pto-radio-group">PTO</FormLabel>
              <RadioGroup
                row
                aria-labelledby="pto-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, PTO: e.target.value })
                }
                value={jobInfoInput.PTO}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="401k-radio-group">401K</FormLabel>
              <RadioGroup
                row
                aria-labelledby="401k-radio-group"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    fourZeroOneK: e.target.value,
                  })
                }
                value={jobInfoInput.fourZeroOneK}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="lt-diability-radio-group">
                Long Term Disability
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="lt-diability-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, LTD: e.target.value })
                }
                value={jobInfoInput.LTD}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="st-diability-radio-group">
                Short Term Disability
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="st-diability-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, STD: e.target.value })
                }
                value={jobInfoInput.STD}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>
              <FormLabel id="bonus-radio-group">Equity</FormLabel>
              <RadioGroup
                row
                aria-labelledby="bonus-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, equity: e.target.value })
                }
                value={jobInfoInput.equity}
              >
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
              </RadioGroup>

              <textarea
                type="text"
                placeholder="Notes"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, extra: e.target.value })
                }
                className="notes-input"
                required
                value={jobInfoInput.extra}
              />
            </Box>
            {error ? (
              <p className="error-text">
                Please fill out the form. Max hours 60!
              </p>
            ) : (
              <></>
            )}
            <Button variant="contained" type="submit" sx={{marginTop: '1rem'}}>
              Submit
            </Button>
          </form>
        </Grid>
        {/* illustrations Image */}
        <Grid item xs={6}>
          <div className="img-box">
            <img
              src={SoftwareEngineerImg}
              alt="Software Engineer Illustrations image"
              className="img img-"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AlumniForm;
