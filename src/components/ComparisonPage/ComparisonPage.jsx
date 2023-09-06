import { FormControl, Input, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import './ComparisonPage.css';
import ComparisonSalaryGraph from '../Graphs/ComparisonGraphs/ComparisonSalaryGraph';



// This is the component function for the ComparisonPage
function ComparisonPage() {
    const [chartData, setChartData] = useState({});
    const [data, setData] = useState([]);
    const searchResults = useSelector(store => store.compare);
    const salaries = [];
    // console.log('searchResults is:', searchResults);

    // function objectCreator(num, year) {
    // }

    // let averageSalary;
    // function getAverageSalary(array) {
    //     let initialValue = 0;
    //     array.reduce((accumulator, currentValue) => 
    //     accumulator + currentValue, initialValue) / array.length;
    //     return averageSalary;
    // };

    function handleComparisonData() {
        let oneYearSalaryArr = [];
        let twoYearSalaryArr = [];
        let threeYearSalaryArr = [];
        let fourYearSalaryArr = [];
        let fiveYearSalaryArr = [];

        // Loop through searchResults array and sort salaries into new arrays 
        // based on how many years after graduation date it has been.
        for (let i of searchResults) {
            const oneDay = 24 * 60 * 60 * 1000; // in milliseconds
            const firstDate = new Date(i.graduation_date);
            const secondDate = new Date(i.date_hired);
            const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

            if (diffDays <= 365) {
                oneYearSalaryArr.push(i.salary);
            }
            else if (diffDays <= 730 && diffDays > 365) {
                twoYearSalaryArr.push(i.salary);
            }
            else if (diffDays <= 1095 && diffDays > 730) {
                threeYearSalaryArr.push(i.salary);
            }
            else if (diffDays <= 1460 && diffDays > 1095) {
                fourYearSalaryArr.push(i.salary);
            }
            else if (diffDays <= 1825 && diffDays > 1460) {
                fiveYearSalaryArr.push(i.salary);
            }
        };

        // Get the average for salaries by year
        let initialValue = 0;
        const yearThreeSalarySum = threeYearSalaryArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / threeYearSalaryArr.length;

        const yearOneSalarySum = oneYearSalaryArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / oneYearSalaryArr.length;

        const yearTwoSalarySum = twoYearSalaryArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / twoYearSalaryArr.length;

        const yearFourSalarySum = threeYearSalaryArr.reduce((accumulator, currentValue) =>
            accumulator + currentValue, initialValue) / fourYearSalaryArr.length;

        // Set data array to send to chartDate
        setData([
            {
                year: 1,
                avgSalaries: yearOneSalarySum
            },
            {
                year: 2,
                avgSalaries: yearTwoSalarySum
            },
            {
                year: 3,
                avgSalaries: yearThreeSalarySum
            }
        ]);

        console.log('data is:', data);

        // Set chartData state
        setChartData({
            labels: data?.map((data) => data?.avgSalaries),
            datasets: [
                {
                    label: "Users Gained ",
                    data: data?.map((data) => data?.year),
                    backgroundColor: [
                        "rgba(75,192,192,1)",
                        "#ecf0f1",
                        "#50AF95",
                        "#f3ba2f",
                        "#2a71d0"
                    ],
                    borderColor: "blue",
                    borderWidth: 2
                }
            ]
        });

        console.log('chartData is:', chartData)

        // setShowGraph(true);
        showGraphNow();
        // console.log('average is:', yearThreeSalarySum)
        // console.log('variable is:', threeYearSalaryArr);
    };

    // function showGraphNow() {
    //     console.log('data is:', data);
    //     console.log('chartData is:', chartData)

    //     setShowGraph(true);

    // }


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

    // do not show graph on page load, only after form submit
    const [showGraph, setShowGraph] = useState(false);

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

    //------------Handler functions
    // This function handles the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatchChange();
        handleComparisonData();
        console.log('form submitted!');
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
    return (
        <>
            <Typography variant="h1" sx={{ fontSize: 50, marginBottom: 8 }}>
                Bootcamp Comparisons
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20 }}>
                <span style={{ fontWeight: "bold" }}>Use the dropdowns</span> to filter results in the graph.
            </Typography>
            <Typography variant="h2" sx={{ fontSize: 20, marginBottom: 8 }}>
                <span style={{ fontWeight: "bold" }}>Click the plus button</span> to add comparisons.
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
                    sx={{ marginTop: 5 }}
                    type="submit"
                    value="submit"
                >
                    Create Charts
                </Button>

            </form>
            {/* Salary over time graph */}
            <div className="chart-container">
                {showGraph ? (
                    <ComparisonSalaryGraph chartData={chartData} />
                ) : (
                    <div className="chart-container-empty">
                        Submit form to view graph
                    </div>
                )}
            </div>
        </>
    )
};

// Export our comparison page to App.jsx file to render
export default ComparisonPage;