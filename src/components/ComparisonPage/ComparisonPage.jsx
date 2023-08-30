import { FormControl, Input, Typography, InputLabel, Select, MenuItem, Button } from "@mui/material";
import React from "react";

function ComparisonPage() {
    

    const handleSubmit = () => {
        console.log('form submitted!');
    }

    const handleWorkplaceLocationChange = (event) => {
        console.log('workplace location input changed!');
        console.log(`input is: ${event.target.value}` );
        // how do we attach this to global state?
    }


    return(
    <>
        <Typography variant="h1">
            Bootcamp Comparisons
        </Typography>
        <Typography variant="h2">
            <span style={{fontWeight: "bold"}}>Use the dropdowns</span> to filter results in the graph.
        </Typography>
        <Typography variant="h2">
            <span style={{fontWeight: "bold"}}>Click the plus button</span> to add comparisons.
        </Typography>

        <form onSubmit={handleSubmit}>

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
            
            <InputLabel id="job">Job</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="job"
                id="job"
                value={''}
                label="job"
                onChange={'handleJobChange'}
            >
                <MenuItem value={10}>Software Engineer/Developer</MenuItem>
                <MenuItem value={20}>UX Designer/Researcher</MenuItem>
                <MenuItem value={30}>Product Owner</MenuItem>
                <MenuItem value={30}>QA Engineer</MenuItem>
                <MenuItem value={30}>Data Engineer</MenuItem>
            </Select>
            
            <InputLabel id="demo-simple-select-label">Bootcamp</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="butts"
                id="demo-simple-select"
                value={''}
                label="Age"
                onChange={'handleChange'}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
                sx={{ minWidth: 120 }}
                labelId="butts"
                id="demo-simple-select"
                value={''}
                label="Age"
                onChange={'handleChange'}
            >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>

            <br />

            <Button variant="contained"
            sx={{marginTop: 5}}
            type="submit"
            value="submit"
            >
                butts
            </Button>

        </form>

    </>
    )
}

export default ComparisonPage;