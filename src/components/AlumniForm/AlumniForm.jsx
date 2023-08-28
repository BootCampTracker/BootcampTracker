import React from "react";
import {
    Box,
    Typography,
    Select,
    Checkbox,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel
} from '@mui/material';
import { Button } from "@mui/base";



function AlumniForm() {


    return (
        <FormControl>
            <Box>
                <Typography>Bootcamp</Typography>
                <Select placeholder="Bootcamp/Program" />
                <Select type="" placeholder="Graduation Date" />
            </Box>
            <Box>
                <Typography>Job Information</Typography>
                <Select type="text" placeholder="Job Name" />
                <Select type="text" placeholder="Job Title" />
                <Select type="number" placeholder="Job Number" />
                <Select type="text" placeholder="Promotion - Yes/No" />
                <Select type="text" placeholder="Company Name" />
                <Select type="text" placeholder="State" />
                <Select type="number" placeholder="Hours Worked" />
                <Select type="text" placeholder="Job Type - Full time/part time" />
                <Select type="text" placeholder="Hire Date" />
                <Select type="text" placeholder="Salary - Yearly/hourly" />
            </Box>
            <Box>
                <Typography >Benefits</Typography>
                <FormLabel id="health-insurance-radio-group">Health Insurance</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="health-insurance-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="dental-insurance-radio-group">Dental Insurance</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="dental-insurance-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="pto-radio-group">PTO</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="pto-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="401k-radio-group">Health Insurance</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="401k-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="lt-diability-radio-group">Long Term Disability</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="lt-diability-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="st-diability-radio-group">Short Term Disability</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="st-diability-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <FormLabel id="bonus-radio-group">Bonus</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="bonus-radio-group"
                >
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                <Select type="text" placeholder="Bonuses $$" />
                <Select type="text" placeholder="Equity Y/N" />
                <textarea type="text" placeholder="Notes" />
            </Box>
            <Button>Submit</Button>
        </FormControl>
    )
};

export default AlumniForm;