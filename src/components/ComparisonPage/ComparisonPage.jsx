// MUI and CSS
import {
    Container,
    Typography,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    Box,
    Grid,
} from "@mui/material";
import "./ComparisonPage.css";
// HOOKS
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// Chart.js imports
import ComparisonSalaryGraph from '../Graphs/ComparisonGraphs/ComparisonSalaryGraph';
import ComparisonRoleGraph from '../Graphs/ComparisonGraphs/ComparisonRoleGraph';
import ComparisonSalaryGraph2 from "../Graphs/ComparisonGraphs/ComparisonSalaryGraph2";
import ComparisonRoleGraph2 from "../Graphs/ComparisonGraphs/ComparisonRoleGraph2";


// This is the component function for the ComparisonPage
function ComparisonPage() {

    // Bring in results from comparison page search
    const searchResults = useSelector(store => store.compare);
    const searchResults2 = useSelector(store => store.compare2);

    //-------------React State Hooks
    // store the useDispatch hook in the variable dispatch
    const dispatch = useDispatch();

    // hook to set local state for workplace location
    const [workplaceLocation, setWorkplaceLocation] = useState('');
    const [workplaceLocation2, setWorkplaceLocation2] = useState('');

    // hook to set local state for job
    const [job, setJob] = useState('');
    const [job2, setJob2] = useState('');

    // hook to set local state for bootcamp
    const [bootcamp, setBootcamp] = useState('');
    const [bootcamp2, setBootcamp2] = useState('');

    // hook to set local state for state
    const [state, setState] = useState('');
    const [state2, setState2] = useState('');

    // hook to set local state for conditional rendering
    const [ displayCardAndCharts, setDisplayCardAndCharts] = useState(false)

    // -------------------- hooks for card
    // hook to set local state with  % of job with health insurance
    const [averageHealth, setAverageHealth] = useState(0);
    const [averageHealth2, setAverageHealth2] = useState(0);

    // hook to set local state with % of job with dental insurance
    const [averageDental, setAverageDental] = useState(0);
    const [averageDental2, setAverageDental2] = useState(0);

    // hook to set local state with % of job with 401K
    const [average401K, setAverage401K] = useState(0);
    const [average401K2, setAverage401K2] = useState(0);

    // hook to set local state with % of job with LTD
    const [averageLTD, setAverageLTD] = useState(0);
    const [averageLTD2, setAverageLTD2] = useState(0);

    // hook to set local state with  % of job with STD
    const [averageSTD, setAverageSTD] = useState(0);
    const [averageSTD2, setAverageSTD2] = useState(0);

    // hook to set local state with % of job with equity option
    const [averageEquity, setAverageEquity] = useState(0);
    const [averageEquity2, setAverageEquity2] = useState(0);

    // hook to set local state with average yearly $ bonus of job
    const [averageBonus, setAverageBonus] = useState(0);
    const [averageBonus2, setAverageBonus2] = useState(0);

    // hook to set local state with average paid time off days of job
    const [averageDaysOff, setAverageDaysOff] = useState(0);
    const [averageDaysOff2, setAverageDaysOff2] = useState(0);

    // hook to set local state with average time to first role from bootcamp graduation
    const [averageTimeToJob, setAverageTimeToJob] = useState(0);
    const [averageTimeToJob2, setAverageTimeToJob2] = useState(0);

    // do not show graph on page load, only after form submit
    const [showGraph, setShowGraph] = useState(false) ? useSelector(store => store.compare) : '';

    const [showCompare, setShowCompare] = useState(false);

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
    };

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
    };

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
    };

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
    };

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
    };

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
    };

    // function that averages folks' yearly bonus
    const functionAverageBonus = () => {
        console.log('in the functionAverageBonus!');
        let totalBonuses = 0;
        for (const response of searchResults) {
            totalBonuses += response.total_yearly_bonus;
        }
        let result = totalBonuses / searchResults.length
        setAverageBonus(result.toFixed(2));
    };

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
    };

    // function that averages time from graduation to first job
    const functionAverageTimeToJob = () => {
        console.log("in the functionAverageTimeToGrad!");
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
    };



    const functionAverageHealth2 = () => {
        console.log('in the functionAverageHealth2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.health_insurance) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageHealth2(result.toFixed(2));
    };

    // function that averages how many folks have dental insurance
    const functionAverageDental2 = () => {
        console.log('in the functionAverageDental2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.dental_insurance) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageDental2(result.toFixed(2));
    };

    // function that averages how many folks have a work 401K
    const functionAverage401K2 = () => {
        console.log('in the functionAverage401K2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.fourOhOneKay) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverage401K2(result.toFixed(2));
    };

    // function that averages how many folks have work long-term disability insurance
    const functionAverageLTD2 = () => {
        console.log('in the functionAverageLTD2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.long_term_disability) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageLTD2(result.toFixed(2));
    };

    // function that averages how many folks have work short-term disability insurance
    const functionAverageEquity2 = () => {
        console.log('in the functionAverageEquity2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.equity) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageEquity2(result.toFixed(2));
    };

    // function that averages how many folks have an equity option
    const functionAverageSTD2 = () => {
        console.log('in the functionAverageSTD2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.short_term_disability) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageSTD2(result.toFixed(2));
    };

    // function that averages folks' yearly bonus
    const functionAverageBonus2 = () => {
        console.log('in the functionAverageBonus2!');
        let totalBonuses = 0;
        for (const response of searchResults2) {
            totalBonuses += response.total_yearly_bonus;
        }
        let result = totalBonuses / searchResults2.length
        setAverageBonus2(result.toFixed(2));
    };

    // function that averages the percent of folks with PTO
    const functionAverageDaysOff2 = () => {
        console.log('in the functionAverageDaysOff2!');
        let boolCount = 0;
        for (const response of searchResults2) {
            if (response.PTO) {
                boolCount += 1
            }
        }
        let result = (boolCount / searchResults2.length) * 100
        setAverageDaysOff2(result.toFixed(2));
    };

    // function that averages time from graduation to first job
    const functionAverageTimeToJob2 = () => {
        console.log('in the functionAverageTimeToGrad2!');
        //initialize our totalTimeToJob variable
        let totalTimeToJob = 0;

        // loop to go through our array of job entries
        for (const response of searchResults2) {
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
        let result = totalTimeToJob / searchResults2.length;
        setAverageTimeToJob2(result.toFixed(2));
    };

    useEffect(() => {
        // do stuff when searchResults changes (dependency listed in the dependency array)
        functionAverageHealth();
        functionAverageDental();
        functionAverage401K();
        functionAverageLTD();
        functionAverageSTD();
        functionAverageEquity();
        functionAverageBonus();
        functionAverageDaysOff();
        functionAverageTimeToJob();
        // Calculate benefits for second job when searchResults2 changes
        functionAverageHealth2();
        functionAverageDental2();
        functionAverage401K2();
        functionAverageLTD2();
        functionAverageSTD2();
        functionAverageEquity2();
        functionAverageBonus2();
        functionAverageDaysOff2();
        functionAverageTimeToJob2();
    }, [searchResults, searchResults2]);

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
    };

    // function to dispatch the event.target.value to the global state
    const dispatchChange2 = () => {
        dispatch({
            type: "FETCH_COMPARE_JOBS_TWO",
            payload:
            {
                workplaceLocation: workplaceLocation2,
                job: job2,
                bootcamp: bootcamp2,
                state: state2,
            }
        });
    };

    //------------Handler functions
    // This function handles the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatchChange();
        console.log('form submitted!');
        setDisplayCardAndCharts(true)
        // benefits card functions will be handled in the useEffect function
    } // end handleSubmit

    // This function handles the submit of the compare form
    const handleCompareSubmit = (event) => {
        event.preventDefault();
        dispatchChange2();
    }; // end handleSubmit

    // Show Comparison Form when user clicks 'Compare jobs' button and remove button from DOM
    const addCompare = (event) => {
        event.preventDefault();
        setShowCompare(true)
    };

    // This function handles the dropdown for workplace location
    const handleWorkplaceLocationChange = (event) => {
        console.log('workplace location input changed!');
        console.log(`workplace location is: ${event.target.value}`);
        setWorkplaceLocation(event.target.value)
        // We need a dispatch and change in state for every change in the input fields!
    }; // end handleWorkplaceLocationChange

    // This function handles the dropdown for the job
    const handleJobChange = (event) => {
        console.log('job input changed!');
        console.log(`job is: ${event.target.value}`);
        setJob(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    }; // end handleJobChange

    // This function handles the dropdown for the bootcamp
    const handleBootcampChange = (event) => {
        console.log('bootcamp input changed!');
        console.log(`bootcamp is: ${event.target.value}`);
        setBootcamp(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    }; // end handleBootcampChange

    // This function handles the dropdown for the state
    const handleStateChange = (event) => {
        console.log('state input changed!');
        console.log(`state is: ${event.target.value}`);
        setState(event.target.value);
        // We need a dispatch and change in state for every change in the input fields!
    }; // end handleStateChange

    // This function handles the dropdown for workplace location
    const handleWorkplaceLocationChange2 = (event) => {
        setWorkplaceLocation2(event.target.value)
    }; // end handleWorkplaceLocationChange

    // This function handles the dropdown for the job
    const handleJobChange2 = (event) => {
        setJob2(event.target.value);
    }; // end handleJobChange

    // This function handles the dropdown for the bootcamp
    const handleBootcampChange2 = (event) => {
        setBootcamp2(event.target.value);
    }; // end handleBootcampChange

    // This function handles the dropdown for the state
    const handleStateChange2 = (event) => {
        setState2(event.target.value);
    }; // end handleStateChange


    // ----------rendered jsx
    return (
        <div className="comparison-page-body">
            <Typography variant="h1" sx={{ fontSize: 50, marginBottom: 3 }}>
                Bootcamp Comparisons
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                <span style={{ fontWeight: "bold" }}>Use the dropdowns</span> to filter results in the graph.
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                <span style={{ fontWeight: "bold" }}>Click the plus button</span> to add comparisons.
            </Typography>

            <Box className="primary-comparison-box" sx={{ display: "flex", marginTop: 5 }}>
                {/* Form that takes in dropdown inputs, updates global state, and sends the state to server onSubmit to GET values for charts */}
                <form className="comparison-form" onSubmit={handleSubmit}>
                    {/* This is the dropdown for the workplace location */}
                    <InputLabel id="workplace-location">Workplace Location</InputLabel>
                    <Select
                        sx={{ minWidth: 120, width: '100%' }}
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
                        sx={{ minWidth: 120, width: '100%' }}
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
                        sx={{ minWidth: 120, width: '100%' }}
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
                        sx={{ minWidth: 120, width: '100%' }}
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

                    {/* This button will submit our form */}
                    <Button variant="contained"
                        sx={{ marginTop: 3, width: '100%' }}
                        type="submit"
                        value="submit"
                    >
                        Create Charts
                    </Button>
                </form>
                {/* End of form */}

                {displayCardAndCharts ? (
                <>
                {/* Salary over time graph */}
                <Box className="chart-container-empty" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%' }}>
                <ComparisonSalaryGraph />
                </Box>

                {/* Roles over time graph */}
                <Box className="chart-container" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%' }}>
                <ComparisonRoleGraph />
                    {/* {showGraph ? (
                        <ComparisonRoleGraph />
                    ) : (
                        <div className="chart-container-empty">
                            Submit form to view graph
                        </div>
                    )} */}
                </Box>
                </>
                ) : (
                    <>
                    {/* Salary over time graph */}
                    <Box className="chart-container-empty" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%' }}>
                            {/* <div className="chart-container"> */}
                                Submit form to view graph
                            {/* </div> */}
                    </Box>
    
                    {/* Roles over time graph */}
                    <Box className="chart-container" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%' }}>
                    <ComparisonRoleGraph />
                        {/* {showGraph ? (
                            <ComparisonRoleGraph />
                        ) : (
                            <div className="chart-container-empty">
                                Submit form to view graph
                            </div>
                        )} */}
                    </Box>
                    </>
    
                )}

                {/* This is our card to display benefits */}
                {displayCardAndCharts ?  (
                <Card className="card-container" sx={{ backgroundColor: "#bbdefb", height: 'fit-content', ml: 3, mt: 5 }} variant="outlined">
                    <CardContent sx={{ backgroundColor: "white", margin: 2, p: 1 }}>
                        <Typography component='span' sx={{ fontSize: '20px', m: 1 }} color="text.secondary">
                            Benefits, Averages, etc.
                        </Typography>
                        <br />
                        <Typography component='span' sx={{ display: 'inline', fontSize: '25px', mb: 2, mr: 2 }}>
                            {job}
                        </Typography>
                        <Grid sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
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
                                {averageDaysOff}% {job ? `of ${job}s` : ''} have PTO.
                                <br />
                                Average yearly bonus {job ? `of ${job}s` : ''} is ${averageBonus}
                                <br />
                                Average time from graduation to first role: {averageTimeToJob} days
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
                ) : ('displayCardAndCharts false')}
            </Box>

            {/* This button will show our 2nd comparison form */}
            {!showCompare ? (
                <Button
                    className="add-compare-btn"
                    variant="contained"
                    onClick={addCompare}
                    // sx={{ marginTop: 3, mb: 5, width: '17em' }}
                    sx={{ mt: 3, mb: 13 }}
                    type="submit"
                    value="submit"
                >
                    Compare a second job
                </Button>
            ) : (
                <Box className="secondary-comparison-box" sx={{ display: "flex", marginTop: 5 }}>
                    {/* Form that takes in dropdown inputs, updates global state, and sends the state to server onSubmit to GET values for charts */}
                    <form className="comparison-form" onSubmit={handleCompareSubmit}>
                        {/* This is the dropdown for the workplace location */}
                        <InputLabel id="workplace-location2">Workplace Location</InputLabel>
                        <Select
                            sx={{ minWidth: 120, width: '100%' }}
                            labelId="workplace-location2"
                            id="workplace-location2"
                            value={workplaceLocation2}
                            label="workplace-location2"
                            onChange={handleWorkplaceLocationChange2}
                        >
                            <MenuItem value={`In-Person`}>In-Person</MenuItem>
                            <MenuItem value={`Hybrid`}>Hybrid</MenuItem>
                            <MenuItem value={`Remote`}>Remote</MenuItem>
                        </Select>
                        {/* End of workplace location dropdown */}

                        {/* This is the dropdown for the job */}
                        <InputLabel id="job2">Job</InputLabel>
                        <Select
                            sx={{ minWidth: 120, width: '100%' }}
                            labelId="job2"
                            id="job2"
                            value={job2}
                            label="job2"
                            onChange={handleJobChange2}
                        >
                            <MenuItem value={'Software Engineer/Developer'}>Software Engineer/Developer</MenuItem>
                            <MenuItem value={'UX Designer/Researcher'}>UX Designer/Researcher</MenuItem>
                            <MenuItem value={'Product Owner'}>Product Owner</MenuItem>
                            <MenuItem value={'QA Engineer'}>QA Engineer</MenuItem>
                            <MenuItem value={'Data Engineer'}>Data Engineer</MenuItem>
                        </Select>
                        {/* End of job dropdown */}

                        {/* This is the dropdown for the bootcamp */}
                        <InputLabel id="bootcamp2">Bootcamp</InputLabel>
                        <Select
                            sx={{ minWidth: 120, width: '100%' }}
                            labelId="bootcamp2"
                            id="bootcamp2"
                            value={bootcamp2}
                            label="bootcamp2"
                            onChange={handleBootcampChange2}
                        >
                            <MenuItem value={'Prime Digital Academy'}>Prime Digital Academy</MenuItem>
                            <MenuItem value={'University of MN Boot Camps'}>University of MN Boot Camps</MenuItem>
                        </Select>
                        {/* End of bootcamp dropdown */}

                        {/* This is the dropdown for the state */}
                        <InputLabel id="state2">State</InputLabel>
                        <Select
                            sx={{ minWidth: 120, width: '100%' }}
                            labelId="state2"
                            id="state2"
                            value={state2}
                            label="state2"
                            onChange={handleStateChange2}
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

                        {/* This button will submit our form */}
                        <Button variant="contained"
                            sx={{ mt: 3, mb: 10, width: '100%' }}
                            type="submit"
                            value="submit"
                        >
                            Compare Jobs!
                        </Button>
                    </form>
                    {/* End of form */}

                    {/* Salary over time graph */}
                    <Box className="chart-container" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%', alignItems: 'center' }}>
                    <ComparisonSalaryGraph2 />
                        {/* {showGraph ? (
                            <ComparisonSalaryGraph2 />
                        ) : (
                            <div className="chart-container-empty">
                                Submit form to view graph
                            </div>
                        )} */}
                    </Box>

                    {/* Roles over time graph */}
                    <Box className="chart-container" sx={{ m: 3, mt: 10, p: 2, minWidth: '25%' }}>
                    <ComparisonRoleGraph2 />
                        {/* {showGraph ? (
                            <ComparisonRoleGraph2 />
                        ) : (
                            <div className="chart-container-empty">
                                Submit form to view graph
                            </div>
                        )} */}
                    </Box>

                    {/* This is our card to display benefits */}
                    <Card className="card-container" sx={{ backgroundColor: "#bbdefb", height: 'fit-content', ml: 3, mt: 5 }} variant="outlined">
                        <CardContent sx={{ backgroundColor: "white", margin: 2, p: 1 }}>
                            <Typography component='span' sx={{ fontSize: '20px', m: 1 }} color="text.secondary">
                                Benefits, Averages, etc.
                            </Typography>
                            <br />
                            <Typography component='span' sx={{ display: 'inline', fontSize: '25px', mb: 2, mr: 2 }}>
                                {job2}
                            </Typography>
                            <Grid sx={{ display: 'flex', flexDirection: 'column', m: 1 }}>
                                <Typography variant="body2">
                                    {averageHealth2}% {job2 ? `of ${job2}s` : ''} have health insurance.
                                    <br />
                                    {averageDental2}% {job2 ? `of ${job2}s` : ''} have dental insurance.
                                    <br />
                                    {average401K2}% {job2 ? `of ${job2}s` : ''} have a 401K.
                                    <br />
                                    {averageLTD2}% {job2 ? `of ${job2}s` : ''} have Long Term Disability.
                                    <br />
                                    {averageSTD2}% {job2 ? `of ${job2}s` : ''} have Short Term Disability.
                                    <br />
                                    {averageEquity2}% {job2 ? `of ${job2}s` : ''} receive an Equity option.
                                    <br />
                                    {averageDaysOff2}% {job2 ? `of ${job2}s` : ''} have PTO.
                                    <br />
                                    Average yearly bonus {job2 ? `of ${job2}s` : ''} is ${averageBonus2}
                                    <br />
                                    Average time from graduation to first role: {averageTimeToJob2} days
                                </Typography>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </div>
    )
};

// Export our comparison page to App.jsx file to render
export default ComparisonPage;
