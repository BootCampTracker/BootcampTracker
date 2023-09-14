const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

  //get all information for specific user on profile page 
  router.get('/:id', rejectUnauthenticated, (req, res) => {
    console.log('req.user is', req.user);
    // console.log('inside of /profile GET router side');
    let userId = req.user.id
    // SQL for query
    let queryText= `SELECT
    job_info.id AS job_info_id,
    job_info."job_title",
    job_info."job_level",
    job_info."job_type",
    job_info."workplace",
    job_info."company",
    job_info."state",
    job_info."promotion",
    job_info."job_number",
    job_info."hours",
    job_info."date_hired",
    job_info."salary",
    benefits."health_insurance",
    benefits."dental_insurance",
    benefits."PTO",
    benefits."401K" AS "when_im_old",
    benefits."equity",
    benefits."total_yearly_bonus",
    benefits."long_term_disability",
    benefits."short_term_disability",
    benefits."notes",
    bootcamp."graduation_date",
    bootcamp."bootcamp"
FROM
    job_info
INNER JOIN
    benefits ON job_info.id = benefits.job_id
INNER JOIN
    bootcamp ON job_info.user_id = bootcamp.user_id
WHERE
    job_info.user_id = $1;
    `
    //bringing in the pool (connection from server to db)
    pool.query(queryText, [userId])
        .then((result) => {
            //sending table row data
            console.log('result.rows is:', result.rows)
            // send the response to the client
            res.send(result.rows)
            //catch error 
        }).catch((err) => {
            // log error in the server
            console.log('error getting profile data router side', err);
            // send error response of 500 (server error) to the client
            res.sendStatus(500)
        })
  })

// GET Profile for graphs
router.get("/graph",rejectUnauthenticated, (req, res) => {
  // Query and requesting user id
  const queryText = `SELECT "job_info"."id", "date_hired", "salary", "job_number" FROM "job_info"
  WHERE "user_id" = $1;`;
  const profileId = req.user.id;
  // connection to pool (server/db connection)
  pool
    // send SQL query to the db
    .query(queryText, [profileId])
    .then(result => {
      // log success in the server
      console.log("Recieved Profile info for graph from Database:");
      // Send the Profile info for Graphs to Client
      res.send(result.rows);
    })
    // Catch any ERRORS
    .catch(err => {
      // log errors in the server
      console.log(`ERROR in GET for Profile info Graphs: ${queryText}`, err);
      // send error code of 500 (server error) to the client
      res.sendStatus(500);
    });
});

module.exports = router;
