import { FormControl, Input, Typography, InputLabel, Select, MenuItem, Button, Card, CardContent, Box, CardActions } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import './ComparisonPage.css';
// Chart.js imports
import ComparisonSalaryGraph from '../Graphs/ComparisonGraphs/ComparisonSalaryGraph';
import ComparisonRoleGraph from "../Graphs/ComparisonGraphs/ComparisonRoleGraph";



// This is the component function for the ComparisonPage
function ComparisonPage() {

    // Bring in results from comparison page search
    const searchResults = useSelector(store => store.compare);

    //-------------React State Hooks
    // store the useDispatch hook in the variable dispatch
    const dispatch = useDispatch();

    // hook to set local state for workplace location
    const [workplaceLocation, setWorkplaceLocation] = useState('');

    // hook to set local state for job
    const [job, setJob] = useState('');

    // hook to set local state for bootcamp
    const [bootcamp, setBootcamp] = useState('');

    // hook to set local state for state
    const [state, setState] = useState('');

    // -------------------- hooks for card
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
    const [averageTimeToJob, setAverageTimeToJob] = useState(0);

    // --------------------- bring in compare store
    // do not show graph on page load, only after form submit
    const [showGraph, setShowGraph] = useState(false) ? useSelector(store => store.compare) : '';

    //---------------------- calculating averages for the benefits card
    // function that averages how many folks have health insurance
    const functionAverageHealth = () => {
        console.log('in the functionAverageHealth!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.health_insurance) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageHealth(result.toFixed(2));
    }

    // function that averages how many folks have dental insurance
    const functionAverageDental = () => {
        console.log('in the functionAverageDental!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.dental_insurance) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageDental(result.toFixed(2));
    }

    // function that averages how many folks have a work 401K
    const functionAverage401K = () => {
        console.log('in the functionAverage401K!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.fourOhOneKay) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverage401K(result.toFixed(2));
    }

    // function that averages how many folks have work long-term disability insurance
    const functionAverageLTD = () => {
        console.log('in the functionAverageLTD!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.long_term_disability) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageLTD(result.toFixed(2));
    }

    // function that averages how many folks have work short-term disability insurance
    const functionAverageEquity = () => {
        console.log('in the functionAverageEquity!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.equity) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageEquity(result.toFixed(2));
    }

    // function that averages how many folks have an equity option
    const functionAverageSTD = () => {
        console.log('in the functionAverageSTD!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.short_term_disability) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageSTD(result.toFixed(2));
    }

    // function that averages folks' yearly bonus
    const functionAverageBonus = () => {
        console.log('in the functionAverageBonus!');
        let totalBonuses = 0;
        for (const response of searchResults) {
            totalBonuses += response.total_yearly_bonus;
        }
        let result = totalBonuses / searchResults.length
        setAverageBonus(result.toFixed(2));
    }

    // function that averages the percent of folks with PTO
    const functionAverageDaysOff = () => {
        console.log('in the functionAverageDaysOff!');
        let boolCount = 0;
        for (const response of searchResults) {
            if (response.PTO) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults.length) * 100
        setAverageDaysOff(result.toFixed(2));
    }

    // function that averages time from graduation to first job
    const functionAverageTimeToJob = () => {
        console.log('in the functionAverageTimeToGrad!');
        //initialize our totalTimeToJob variable
        let totalTimeToJob = 0;

        // loop to go through our array of job entries
        for (const response of searchResults) {
            // only add this difference to our calculations if it's the user's first job after bootcamp
            if (response.job_number = 1) {
                const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
                const firstDate = new Date(response.date_hired);
                const secondDate = new Date(response.graduation_date); // 2008, 1, 22
                const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
                // console.log('diffDays is:', diffDays);
                totalTimeToJob += diffDays;
            }
        }
        let result = totalTimeToJob / searchResults.length;
        setAverageTimeToJob(result.toFixed(2));
    }


    useEffect(() => {
        // do stuff when searchResults (dependency listed in the dependency array) changes
        functionAverageHealth();
        functionAverageDental();
        functionAverage401K();
        functionAverageLTD();
        functionAverageSTD();
        functionAverageEquity();
        functionAverageBonus();
        functionAverageDaysOff();
        functionAverageTimeToJob();
    }, [searchResults])


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
        });
    }

    let displayCard = false;
    const toggleCard = () => { displayCard = true}
    console.log(`displayCard: `, displayCard);

    //------------Handler functions
    // This function handles the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        toggleCard();
        console.log(`display card: `, displayCard);
        console.log('form submitted!');
        dispatchChange();
        // handleComparisonData();
        console.log('form submitted!');
        // benefits card functions will be handled in the useEffect function
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
        {/* End of submit button */}

        {/* End of form */}
        </form>
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
                    sx={{ marginTop: 5 }}
                    type="submit"
                    value="submit"
                >
                    Create Charts
                </Button>
            </form>
            {/* End of form */}

            {/* Salaries over time graph */}
            <div className="chart-container">
                {showGraph ? (
                    <ComparisonSalaryGraph />
                ) : (
                    <div className="chart-container-empty">
                        Submit form to view graph
                    </div>
                )}
            </div>
            
            {/* Roles over time graph */}
            <div className="chart-container">
                {showGraph ? (
                    <ComparisonRoleGraph />
                ) : (
                    <div className="chart-container-empty">
                        Submit form to view graph
                    </div>
                )}
            </div>

        {/* This is our card to display benefits */}
        {displayCard ? `<h1>display card</h1>` : `<h1>don't display card</h1>`}


            {/* This is our card to display benefits */}
            <Card sx={{ minWidth: 275, maxWidth: 500, backgroundColor: "#bbdefb" }} variant="outlined">
                <CardContent sx={{ backgroundColor: "white", margin: 2 }}>
                    <Typography variant="h5" component="div">
                        {job}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Benefits, Averages, Etc.
                    </Typography>
                    <Typography variant="body2">
                        {averageHealth}% {job ? `of ${job}s` : ''} have health insurance.
                        <br />
                        {averageDental}% {job ? `of ${job}s` : ''} have dental insurance.
                        <br />
                        {average401K}% {job ? `of ${job}s` : ''} have a 401K.
                        <br />
                        {averageLTD}% {job ? `of ${job}s` : ''} have Long Term Disability.
                        <br />
                        {averageSTD}% {job ? `of ${job}s` : ''} have Short Term Disability.
                        <br />
                        {averageEquity}% {job ? `of ${job}s` : ''} receive an Equity option.
                        <br />
                        The average yearly bonus {job ? `of ${job}s` : ''} is ${averageBonus}
                        <br />
                        {averageDaysOff}% {job ? `of ${job}s` : ''} have PTO.
                        <br />
                        Average time from graduation to first role: {averageTimeToJob} days
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
};

// Export our comparison page to App.jsx file to render
export default ComparisonPage;