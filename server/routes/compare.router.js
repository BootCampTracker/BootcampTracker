const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


// Fetch salaries for all jobs that meet the search criteria
router.get('/', rejectUnauthenticated, (req, res) => {
    const { job, state, bootcamp, workplaceLocation } = req.query;
    // set up for multiple queries
    let paramNum = 0;
    // create an array to push our parameterized values
    const values = [];
    // sql for GETting all requested info for the user
    let queryText = `
    SELECT "job_info"."user_id", 
    "job_info"."salary", 
    "job_info"."date_hired", 
    "job_info"."job_number",
    "job_info"."state",
    "job_info"."workplace",
    "job_info"."job_title",
    "bootcamp"."graduation_date",
    "bootcamp"."bootcamp",
    "benefits"."health_insurance",
    "benefits"."dental_insurance",
    "benefits"."PTO",
    "benefits"."401K" AS "fourohonekay",
    "benefits"."equity",
    "benefits"."long_term_disability",
    "benefits"."short_term_disability",
    "benefits"."total_yearly_bonus",
    "benefits"."notes"
    FROM "job_info" 
    JOIN "bootcamp" ON "bootcamp"."user_id" = "job_info"."user_id"
    JOIN "benefits" ON "benefits"."job_id" = "job_info"."id"
    WHERE 1=1
    `;
    // if the user queried for a job (job==true), add it to the SQL
    if (job) {
        paramNum += 1;
        queryText += ` AND "job_title" = $${paramNum}`;
        values.push(job);
    }
    // if the user queried for a workplaceLocation (workplaceLocation==true), add it to the SQL
    if (workplaceLocation) {
        paramNum += 1;
        queryText += ` AND "workplace" = $${paramNum}`;
        values.push(workplaceLocation)
    }
    // if the user queried for a state (state==true), add it to the SQL
    if (state) {
        paramNum += 1;
        queryText += ` AND "state" = $${paramNum}`;
        values.push(state);
    }
    // if the user queried for a bootcamp (bootcamp==true), add it to the SQL
    if (bootcamp) {
        paramNum += 1;
        queryText += ` AND "bootcamp" = $${paramNum}`;
        values.push(bootcamp);
    }
    // use pool to connect from our server to our db
    pool.query(queryText, values)
        // take the response and send it back to the client
        .then(response => {
            console.log('response.rows is:', response.rows);
            res.send(response.rows);
        })
        // if there's an error, log it in the server and send a 500 (server error code) to the client
        .catch((error) => {
            console.log('Error fetching comparison data for charts ', error);
            res.sendStatus(500);
        });
});

module.exports = router;
