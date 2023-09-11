import React from "react";
import { useSelector } from "react-redux";
// MUI and Assets
import { Box, Typography, Link, Grid, Item } from "@mui/material";
import SoftwareEngineerImg from "../Assets/Home.png";
import HomeVideo from "../Assets/HomeHeroVideo.mp4";
import "./Home.css";


function Home() {
  const user = useSelector(store => store.user);


  return (
    <div className="home-section">
      <Box margin={5}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          textAlign={"left"}
        >
          <Grid item xs={8} md={8} lg={8}>
            <Typography
              variant="h1"
              fontSize={50}
              sx={{ marginTop: 6, fontWeight: 500, color: "#000" }}
            >
              Salary and hiring timeline transparency for bootcamps, visualized.
            </Typography>
            <Typography
              variant="h2"
              fontSize={25}
              sx={{ marginTop: 6, color: "#000" }}
            >
              <span style={{ fontWeight: "bold" }}>
                Bootcamp Salary Tracker is a valuable tool{" "}
              </span>
              for anyone considering, enrolled in, or graduating from a
              bootcamp. This tool helps users choose the right educational
              program for their situation and informs them statistically about
              what to expect as they pursue a career in the tech industry.
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4}>
            <video autoPlay loop muted>
              <source src={HomeVideo} type="video/mp4" />
            </video>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 15,
          }}
        >
          <Box
            className="circle circle-1"
            sx={{ textAlign: "center", textDecoration: "none" }}
          >
            <Link
              className="link"
              href="#/alumniform"
              underline="always"
              sx={{ color: "#000", fontSize: 20 }}
            >
              Anonymously share your salary and timeline
            </Link>
          </Box>

          <Box className="circle circle-2" sx={{ textAlign: "center" }}>
            <Link
              className="link"
              href="#/compare"
              underline="always"
              sx={{ color: "#000", fontSize: 20 }}
            >
              View graphed data comparisons
            </Link>
          </Box>

          <Box className="circle circle-3" sx={{ textAlign: "center" }}>
            <Link
              className="link"
              href="/#"
              textDecoration="underline"
              sx={{ color: "#000", fontSize: 20 }}
              onClick={() => {
                navigator.clipboard
                  .writeText("TEXT_TO_BE_COPIED")
                  .then(() =>
                    alert(
                      `Link to Bootcamp Tracker has been copied! Paste this into your socials to spread the word about Bootcamp Tracker!`
                    )
                  );
              }}
            >
              Share this project to promote transparency
            </Link>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
