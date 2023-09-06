// HOOKS
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// MUI and Assets
import {
  Box,
  Typography,
  Select,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  InputLabel,
  MenuItem,
  Button,
  Grid,
} from "@mui/material";
import illustrationsImg from "../Assets/bootcamp_illustrations.png";
import Swal from "sweetalert2";
import "./AlumniForm.css";
// Form Data
import bootcamps from "./FormData/bootcamps";
import JobDuration from "./FormData/jobDuration";
import JobType from "./FormData/jobType";
import JobTitle from "./FormData/jobTitle";
import JobRole from "./FormData/jobRole";
import states from "./FormData/states";
function AlumniForm() {
  // HOOKS
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const [openInput, setOpenInput] = useState(false);
  const [error, setError] = useState(false);
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
  const handleSubmit = e => {
    e.preventDefault();
    // Logs
    console.log("Submitted", jobInfoInput);
    console.log("User id:", user.id);
    // Validation Form on Salary input
    if (jobInfoInput.salary > 200000) {
      setError(true);
      return;
    }
    setError(false);
    // Dispatch
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
    // Modal Alert for Submit
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Anonymously submitted!",
      showConfirmButton: false,
      timer: 1500,
    });
    // //   Clear inputs
    // setJobInfoInput("");
  };

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, []);
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
              <label>Bootcamp graduated from:</label>
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
                required
                value={jobInfoInput.extra}
              />
            </Box>
            {error ? (
              <p className="error-text">
                Please enter a Valid Salary and complete the form! Max Salary:
                200,000
              </p>
            ) : (
              <></>
            )}
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </Grid>
        {/* illustrations Image */}
        <Grid item xs={6}>
          <div className="img-box">
            <img
              src={illustrationsImg}
              alt="Illustrations image"
              className="img"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default AlumniForm;
