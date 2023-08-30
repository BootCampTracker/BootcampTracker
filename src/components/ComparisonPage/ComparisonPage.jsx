import { FormControl, Input, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";
import React from "react";

// This is the component function for the ComparisonPage
function ComparisonPage() {
    

    // This function handles the submit of the form
    const handleSubmit = () => {
        console.log('form submitted!');
    } // end handleSubmit

    // This function handles the dropdown for workplace location
    const handleWorkplaceLocationChange = (event) => {
        console.log('workplace location input changed!');
        console.log(`workplace location is: ${event.target.value}` );
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleWorkplaceLocationChange

    // This function handles the dropdown for the job
    const handleJobChange = (event) => {
        console.log('job input changed!');
        console.log(`job is: ${event.target.value}` );
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleJobChange

    // This function handles the dropdown for the bootcamp
    const handleBootcampChange = (event) => {
        console.log('bootcamp input changed!');
        console.log(`bootcamp is: ${event.target.value}` );
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleBootcampChange

    // This function handles the dropdown for the state
    const handleStateChange = (event) => {
        console.log('state input changed!');
        console.log(`state is: ${event.target.value}` );
        // We need a dispatch and change in state for every change in the input fields!
    } // end handleStateChange


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
        <form onSubmit={handleSubmit}>

        {/* This is the dropdown for the workplace location */}
            <InputLabel id="workplace-location">Workplace Location</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="workplace-location"
                id="workplace-location"
                value={''}
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
                value={''}
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
                value={''}
                label="bootcamp"
                onChange={'handleBootcampChange'}
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
                value={''}
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

    </>
    )
}

// Export our comparison page to App.jsx file to render
export default ComparisonPage;