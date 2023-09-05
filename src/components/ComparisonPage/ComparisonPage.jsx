import { FormControl, Input, Typography, InputLabel, Select, MenuItem, Button, Card, CardContent, Box, CardActions } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './ComparisonPage.css';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js/auto';
import BarChart from '../BarChart/BarChart';
Chart.register(CategoryScale);



// This is the component function for the ComparisonPage
function ComparisonPage() {

    //-------------React State Hooks
    // store the useDispatch hook in the variable dispatch
    const dispatch = useDispatch();
    
    // hook to set local state for workplace location
    const [workplaceLocation, setWorkplaceLocation] = useState('');
    
    // hook to set local state for job
    const [job, setJob] = useState('(job)');
    
    // hook to set local state for bootcamp
    const [bootcamp, setBootcamp] = useState('');
    
    // hook to set local state for state
    const [state, setState] = useState('');

    // ------------ hooks for card
    // hook to set local state with  % of job with health insurance
    const [averageHealth, setAverageHealth] = useState(0);

    // hook to set local state with % of job with dental insurance
    const [averageDental, setAverageDental] = useState(0);

    // hook to set local state with % of job with 401K
    const [average401K, setAverage401K] = useState(0);

    // hook to set local state with % of job with LTD
    const [averageLTD, setAverageLTD] = useState(0);
    
    // hook to set local state with  % of job with STD
    const [averageSTD, setAverageSTD] = useState(0);
    
    // hook to set local state with % of job with equity option
    const [averageEquity, setAverageEquity] = useState(0);
    // hook to set local state with average yearly $ bonus of job
    const [averageBonus, setAverageBonus] = useState(0);

    // hook to set local state with average paid time off days of job
    const [averageDaysOff, setAverageDaysOff] = useState(0);
    
    // hook to set local state with average time to first role from bootcamp graduation
    const [averageTimeToGrad, setAverageTimeToGrad] = useState(0);


    // bring in compare store
    const searchResults = useSelector(store => store.compare);

    // function to dispatch the event.target.value to the global state
    const dispatchChange = () => {
        dispatch({
            type: "FETCH_COMPARE_JOBS",
            payload: 
            {
                workplaceLocation: workplaceLocation,
                job: job,
                bootcamp: bootcamp,
                state: state,
            }
        })
    }

    //------------Handler functions
    // This function handles the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted!');
        dispatchChange();
    } // end handleSubmit

    // This function handles the dropdown for workplace location
    const handleWorkplaceLocationChange = (event) => {
        console.log('workplace location input changed!');
        console.log(`workplace location is: ${event.target.value}`);
        setWorkplaceLocation(event.target.value)
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleWorkplaceLocationChange

    // This function handles the dropdown for the job
    const handleJobChange = (event) => {
        console.log('job input changed!');
        console.log(`job is: ${event.target.value}`);
        setJob(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleJobChange

    // This function handles the dropdown for the bootcamp
    const handleBootcampChange = (event) => {
        console.log('bootcamp input changed!');
        console.log(`bootcamp is: ${event.target.value}`);
        setBootcamp(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleBootcampChange

    // This function handles the dropdown for the state
    const handleStateChange = (event) => {
        console.log('state input changed!');
        console.log(`state is: ${event.target.value}`);
        setState(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleStateChange

    // ----------rendered jsx
    return(
    <>
        <Typography variant="h1" sx={{fontSize: 50, marginBottom: 8}}>
            Bootcamp Comparisons
        </Typography>
        <Typography variant="h2" sx={{fontSize: 20}}>
            <span style={{fontWeight: "bold"}}>Use the dropdowns</span> to filter results in the graph.
        </Typography>
        <Typography variant="h2" sx={{fontSize: 20, marginBottom: 8}}>
            <span style={{fontWeight: "bold"}}>Click the plus button</span> to add comparisons.
        </Typography>

        {/* Form that takes in dropwdown inputs, updates global state, and sends the state to server onSubmit to GET values for charts */}
        <form className="comparison-form" onSubmit={handleSubmit}>

        {/* This is the dropdown for the workplace location */}
            <InputLabel id="workplace-location">Workplace Location</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="workplace-location"
                id="workplace-location"
                value={workplaceLocation}
                label="workplace-location"
                onChange={handleWorkplaceLocationChange}
            >
                <MenuItem value={`In-Person`}>In-Person</MenuItem>
                <MenuItem value={`Hybrid`}>Hybrid</MenuItem>
                <MenuItem value={`Remote`}>Remote</MenuItem>
            </Select>
        {/* End of workplace location dropdown */}
            
        {/* This is the dropdown for the job */}
            <InputLabel id="job">Job</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="job"
                id="job"
                value={job}
                label="job"
                onChange={handleJobChange}
            >
                <MenuItem value={'Software Engineer/Developer'}>Software Engineer/Developer</MenuItem>
                <MenuItem value={'UX Designer/Researcher'}>UX Designer/Researcher</MenuItem>
                <MenuItem value={'Product Owner'}>Product Owner</MenuItem>
                <MenuItem value={'QA Engineer'}>QA Engineer</MenuItem>
                <MenuItem value={'Data Engineer'}>Data Engineer</MenuItem>
            </Select>
        {/* End of job dropdown */}
            
        {/* This is the dropdown for the bootcamp */}
            <InputLabel id="bootcamp">Bootcamp</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="bootcamp"
                id="bootcamp"
                value={bootcamp}
                label="bootcamp"
                onChange={handleBootcampChange}
            >
                <MenuItem value={'Prime Digital Academy'}>Prime Digital Academy</MenuItem>
                <MenuItem value={'University of MN Boot Camps'}>University of MN Boot Camps</MenuItem>
            </Select>
        {/* End of bootcamp dropdown */}

        {/* This is the dropdown for the state */}
            <InputLabel id="state">State</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="state"
                id="state"
                value={state}
                label="state"
                onChange={handleStateChange}
            >
                <MenuItem value={'Alabama'}>Alabama</MenuItem>
                <MenuItem value={'Alaska'}>Alaska</MenuItem>
                <MenuItem value={'Arizona'}>Arizona</MenuItem>
                <MenuItem value={'Arkansas'}>Arkansas</MenuItem>
                <MenuItem value={'California'}>California</MenuItem>
                <MenuItem value={'Connecticut'}>Connecticut</MenuItem>
                <MenuItem value={'Delaware'}>Delaware</MenuItem>
                <MenuItem value={'Florida'}>Florida</MenuItem>
                <MenuItem value={'Georgia'}>Georgia</MenuItem>
                <MenuItem value={'Hawaii'}>Hawaii</MenuItem>
                <MenuItem value={'Idaho'}>Idaho</MenuItem>
                <MenuItem value={'Illinois'}>Illinois</MenuItem>
                <MenuItem value={'Indiana'}>Indiana</MenuItem>
                <MenuItem value={'Iowa'}>Iowa</MenuItem>
                <MenuItem value={'Kansas'}>Kansas</MenuItem>
                <MenuItem value={'Kentucky'}>Kentucky</MenuItem>
                <MenuItem value={'Louisiana'}>Louisiana</MenuItem>
                <MenuItem value={'Maine'}>Maine</MenuItem>
                <MenuItem value={'Maryland'}>Maryland</MenuItem>
                <MenuItem value={'Massachusetts'}>Massachusetts</MenuItem>
                <MenuItem value={'Michigan'}>Michigan</MenuItem>
                <MenuItem value={'Minnesota'}>Minnesota</MenuItem>
                <MenuItem value={'Mississippi'}>Mississippi</MenuItem>
                <MenuItem value={'Missouri'}>Missouri</MenuItem>
                <MenuItem value={'Montana'}>Montana</MenuItem>
                <MenuItem value={'Nebraska'}>Nebraska</MenuItem>
                <MenuItem value={'Nevada'}>Nevada</MenuItem>
                <MenuItem value={'New Hampshire'}>New Hampshire</MenuItem>
                <MenuItem value={'New Jersey'}>New Jersey</MenuItem>
                <MenuItem value={'New Mexico'}>New Mexico</MenuItem>
                <MenuItem value={'New York'}>New York</MenuItem>
                <MenuItem value={'North Carolina'}>North Carolina</MenuItem>
                <MenuItem value={'North Dakota'}>North Dakota</MenuItem>
                <MenuItem value={'Ohio'}>Ohio</MenuItem>
                <MenuItem value={'Oklahoma'}>Oklahoma</MenuItem>
                <MenuItem value={'Oregon'}>Oregon</MenuItem>
                <MenuItem value={'Pennsylvania'}>Pennsylvania</MenuItem>
                <MenuItem value={'Rhode Island'}>Rhode Island</MenuItem>
                <MenuItem value={'South Carolina'}>South Carolina</MenuItem>
                <MenuItem value={'South Dakota'}>South Dakota</MenuItem>
                <MenuItem value={'Tennessee'}>Tennessee</MenuItem>
                <MenuItem value={'Texas'}>Texas</MenuItem>
                <MenuItem value={'Utah'}>Utah</MenuItem>
                <MenuItem value={'Vermont'}>Vermont</MenuItem>
                <MenuItem value={'Virginia'}>Virginia</MenuItem>
                <MenuItem value={'Washington'}>Washington</MenuItem>
                <MenuItem value={'West Virginia'}>West Virginia</MenuItem>
                <MenuItem value={'Wisconsin'}>Wisconsin</MenuItem>
                <MenuItem value={'Wyoming'}>Wyoming</MenuItem>
            </Select>
        {/* End of state dropdown */}

            <br />

        {/* This button will submit our form */}
            <Button variant="contained"
            sx={{marginTop: 5}}
            type="submit"
            value="submit"
            >
                Create Charts
            </Button>

        </form>
        <br />
        
        {/* This is our card to display benefits */}
        <Card sx={{ minWidth: 275, maxWidth: 500, backgroundColor: "#bbdefb" }} variant="outlined">
        <CardContent sx={{backgroundColor: "white", margin: 2}}>
            <Typography variant="h5" component="div">
                {job}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Benefits, Averages, Etc.
            </Typography>
            <Typography variant="body2">
            {averageHealth}% of {job} have health insurance.
            <br />
            {averageDental}% of {job} have dental insurance.
            <br />
            {average401K}% of {job} have a 401K.
            <br />
            {averageLTD}% of {job} have Long Term Disability.
            <br />
            {averageSTD}% of {job} have Short Term Disability.
            <br />
            {averageEquity}% of {job} receive an Equity option.
            <br />
            The average yearly bonus of a {job} is ${averageBonus}
            <br />
            The average number of PTO days received: {averageDaysOff}/year
            <br />
            Average time from graduation to first role: {averageTimeToGrad} days
            </Typography>
        </CardContent>
        </Card>

        <div className="chart-container">
        <BarChart />
        </div>
    </>
    )
}

// Export our comparison page to App.jsx file to render
export default ComparisonPage;