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
// Modules
import bootcamps from "./Modules/Bootcamps";
import JobDuration from "./Modules/JobDuration";
import JobType from "./Modules/JobType";
import JobTitle from "./Modules/JobTitle";
import JobRole from "./Modules/JobRole";
import states from "./Modules/States";
function AlumniForm() {
  // HOOKS
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const [openInput, setOpenInput] = useState(false);
  const [jobInfoInput, setJobInfoInput] = useState({
    Bootcamp: "",
    GradDate: "",
    JobTitle: "",
    JobRole: "",
    Company: "",
    States: "",
    Promotions: "",
    Position: "",
    Hours: "",
    JobType: "",
    Workplace: "",
    HireDate: "",
    Salary: "",
    Health: "",
    Dental: "",
    PTO: "",
    FourZeroOneK: "",
    STD: "",
    LTD: "",
    Bonuses: "",
    Equity: "",
    Extra: "",
  });
  // Submit Form and dispatch
  const handleSubmit = e => {
    e.preventDefault();
    // Logs
    console.log("Submitted", jobInfoInput);
    console.log("User id:", user.id);
    // Dispatch
    dispatch({
      type: "ADD_JOB_INFO",
      payload: {
        jobUserId: user.id,
        benefitUserId: user.id,
        bootcampUserId: user.id,
        jobTitle: jobInfoInput.JobTitle,
        jobLevel: jobInfoInput.JobRole,
        company: jobInfoInput.Company,
        state: jobInfoInput.States,
        promotions: jobInfoInput.Promotions,
        jobNumber: jobInfoInput.Position,
        hours: jobInfoInput.Hours,
        workplace: jobInfoInput.Workplace,
        jobType: jobInfoInput.JobType,
        dateHired: jobInfoInput.HireDate,
        salary: jobInfoInput.Salary,
        gradDate: jobInfoInput.GradDate,
        bootcamp: jobInfoInput.Bootcamp,
        health: jobInfoInput.Health,
        dental: jobInfoInput.Dental,
        PTO: jobInfoInput.PTO,
        fourZeroOneK: jobInfoInput.FourZeroOneK,
        equity: jobInfoInput.Equity,
        bonuses: jobInfoInput.Bonuses,
        LTD: jobInfoInput.LTD,
        STD: jobInfoInput.STD,
        notes: jobInfoInput.Extra,
      },
    });
    // Modal Alert for Submit
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Anonosumly saved your data!",
      showConfirmButton: false,
      timer: 1500,
    });
    //   Clear inputs
    setJobInfoInput("");
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
                  setJobInfoInput({ ...jobInfoInput, Bootcamp: e.target.value })
                }
                required
                value={jobInfoInput.Bootcamp}
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
                  setJobInfoInput({ ...jobInfoInput, GradDate: e.target.value })
                }
                value={jobInfoInput.GradDate}
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
                  setJobInfoInput({ ...jobInfoInput, JobTitle: e.target.value })
                }
                value={jobInfoInput.JobTitle}
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
                  setJobInfoInput({ ...jobInfoInput, JobRole: e.target.value })
                }
                value={jobInfoInput.JobRole}
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
                  setJobInfoInput({ ...jobInfoInput, Company: e.target.value })
                }
                required
              />
              <label id="demo-simple-select-label">States</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="States"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, States: e.target.value })
                }
                required
                value={jobInfoInput.States}
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
                    Promotions: e.target.value,
                  })
                }
                required
                value={jobInfoInput.Promotions}
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
                  setJobInfoInput({ ...jobInfoInput, Position: e.target.value })
                }
                required
                value={jobInfoInput.Position}
              />
              <label id="demo-simple-select-label">Hours Worked</label>
              <TextField
                type="number"
                placeholder="Hours Worked"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, Hours: e.target.value })
                }
                required
                value={jobInfoInput.Hours}
              />
              <label id="demo-simple-select-label">Job Duration</label>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Job Duration"
                onChange={e =>
                  setJobInfoInput({
                    ...jobInfoInput,
                    JobType: e.target.value,
                  })
                }
                required
                value={jobInfoInput.JobType}
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
                    Workplace: e.target.value,
                  })
                }
                required
                value={jobInfoInput.Workplace}
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
                  setJobInfoInput({ ...jobInfoInput, HireDate: e.target.value })
                }
                required
                value={jobInfoInput.HireDate}
              />
              <label id="demo-simple-select-label">Salary</label>
              <TextField
                type="number"
                placeholder="Salary - Yearly/hourly"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, Salary: e.target.value })
                }
                required
                value={jobInfoInput.Salary}
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
                  setJobInfoInput({ ...jobInfoInput, Health: e.target.value })
                }
                required
                value={jobInfoInput.Health}
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
                  setJobInfoInput({ ...jobInfoInput, Dental: e.target.value })
                }
                value={jobInfoInput.Dental}
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
                    FourZeroOneK: e.target.value,
                  })
                }
                value={jobInfoInput.FourZeroOneK}
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
              <FormLabel id="bonus-radio-group">Bonuses</FormLabel>
              <RadioGroup row aria-labelledby="bonus-radio-group">
                <FormControlLabel
                  value="TRUE"
                  control={<Radio />}
                  label="Yes"
                  onClick={() => setOpenInput(!openInput)}
                  required
                />
                <FormControlLabel
                  value="FALSE"
                  control={<Radio />}
                  label="No"
                  required
                />
                {openInput && (
                  <TextField
                    type="number"
                    placeholder="Bonuses"
                    onChange={e =>
                      setJobInfoInput({
                        ...jobInfoInput,
                        Bonuses: e.target.value,
                      })
                    }
                    required
                    value={jobInfoInput.Bonuses}
                  />
                )}
              </RadioGroup>
              <FormLabel id="bonus-radio-group">Equity</FormLabel>
              <RadioGroup
                row
                aria-labelledby="bonus-radio-group"
                onChange={e =>
                  setJobInfoInput({ ...jobInfoInput, Equity: e.target.value })
                }
                value={jobInfoInput.Equity}
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
                  setJobInfoInput({ ...jobInfoInput, Extra: e.target.value })
                }
                required
                value={jobInfoInput.Extra}
              />
            </Box>
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
