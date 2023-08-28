import React from "react";
import { Box, Typography } from '@mui/material';
import { Button } from "@mui/base";


function AlumniForm() {


    return (
        <form className="alumni-form">
            <Box>
            <Typography>Bootcamp</Typography>
                <input placeholder="Bootcamp/Program" />
                <input type="" placeholder="Graduation Date" />
            </Box>
            <Box>
            <Typography>Job Information</Typography>
                <input type="text" placeholder="Job Name" />
                <input type="text" placeholder="Job Title" />
                <input type="number" placeholder="Job Number" />
                <input type="text" placeholder="Promotion - Yes/No" />
                <input type="text" placeholder="Company Name" />
                <input type="text" placeholder="State" />
                <input type="number" placeholder="Hours Worked" />
                <input type="text" placeholder="Job Type - Full time/part time" />
                <input type="text" placeholder="Hire Date" />
                <input type="text" placeholder="Salary - Yearly/hourly" />
            </Box>
            <Box>
            <Typography>Benefits</Typography>
                <input type="text" placeholder="Health Insurance" />
                <input type="text" placeholder="Dental Insurance" />
                <input type="text" placeholder="PTO" />
                <input type="text" placeholder="401K" />
                <input type="text" placeholder="LT Dis" />
                <input type="text" placeholder="ST Dis" />
                <input type="text" placeholder="Bonuses $$" />
                <input type="text" placeholder="Equity Y/N" />
                <textarea type="text" placeholder="Notes" />
            </Box>
           <Button>Submit</Button>
        </form>
    )
};

export default AlumniForm;