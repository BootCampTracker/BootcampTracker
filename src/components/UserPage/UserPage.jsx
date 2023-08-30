import React from 'react';
import {useSelector} from 'react-redux';
import {Box, Typography, Link, Grid, Item} from '@mui/material';
import './UserPage.css'

function UserPage() {
    const user = useSelector((store) => store.user);
    return (
      <Box margin={5}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} textAlign={'left'}>
            <Grid item xs={8} >
            <Typography variant='h1' fontSize={50} sx={{marginTop: 6}}>
                Salary and hiring timeline transparency for bootcamps,
                      visualized.
            </Typography>
            </Grid>
            <Grid item xs={4} >
            </Grid>
            <Grid item xs={6} sx={{marginTop:6}}>
            <Typography variant='h2' fontSize={20}>
                <span style={{fontWeight: 'bold'}}>Bootcamp Salary Tracker is a valuable tool </span>
                      for anyone considering, 
                      enrolled in, or graduating from a bootcamp. 
                      This tool helps users choose the right educational program for 
                      their situation and informs them statistically about what to expect 
                      as they pursue a career in the tech industry.
            </Typography>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
            
            <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop: 15}}>

              <Box className='circle' sx={{textAlign: 'center'}}>
                <Link className='link' href="#/alumniform" underline="always" sx={{color: 'white', fontSize: 20}}>
                  Anonymously share your salary and timeline
                </Link>
              </Box>
              
              <Box className='circle' sx={{textAlign: 'center'}}>
                <Link className='link' href="#/compare" underline="always" sx={{color: 'white', fontSize: 20}}>
                  View graphed data comparisons
                </Link>
              </Box>
              
              <Box className='circle' sx={{textAlign: 'center'}}>
                <Link className='link' href="/#" textDecoration="underline" sx={{color: 'white', fontSize: 20}} 
                  onClick={() => {
                    navigator.clipboard.writeText("TEXT_TO_BE_COPIED")
                    .then(() => alert(`Link to Bootcamp Tracker has been copied! Paste this into your socials to spread the word about Bootcamp Tracker!`))
                  }}>
                  Share this project to promote transparency
                </Link>
              </Box>
            
            </Box>
            </Box>
    );
}

export default UserPage;
