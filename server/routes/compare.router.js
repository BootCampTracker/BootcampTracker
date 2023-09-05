const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');


// workplaceLocation: workplaceLocation,
// job: job,
// bootcamp: bootcamp,
// state: state,
router.get('/', (req, res) => {
    console.log('In the server GET route, req.query is:', req.query);

    const { job, state, bootcamp, workplaceLocation } = req.query;
    let paramNum = 0;
    const values = [];
    let queryText = `SELECT "salary" FROM "job_info" JOIN "bootcamp" 
        ON "bootcamp"."user_id" = "job_info"."user_id" WHERE 1=1`;

    if (job) {
        paramNum += 1;
        queryText += ` AND "job_title" = $${paramNum}`;
        values.push(job);
    }
    if (workplaceLocation) {
        paramNum += 1;
        queryText += ` AND "workplace" = $${paramNum}`;
        values.push(workplaceLocation)
    }
    if (state) {
        paramNum += 1;
        queryText += ` AND "state" = $${paramNum}`;
        values.push(state);
    }
    if (bootcamp) {
        paramNum += 1;
        queryText += ` AND "bootcamp" = $${paramNum}`;
        values.push(bootcamp);
    }
    console.log('queryText is:', req.query)
    

        pool.query(queryText, values)
        .then(response => {
            console.log('response.rows is:', response.rows);
            res.send(response.rows);
        })
        .catch((error) => {
            console.log('Error fetching comparison data for charts ', error);
            res.sendStatus(500);
        });
});




// GET route to grab the data we need for our charts
// router.get('/', rejectUnauthenticated, (req, res) => {
//     console.log('In the server GET route for /api/compare');

//     // instead of req.body, use req.query
//     // req.query is our object with key value pairs
//     // req.query = comparisonData
//     console.log(`req.query is: ${JSON.stringify(req.query)}`);

//     console.log(`req.query.job is ${req.query.job}`);
//     console.log(`req.query.workplaceLocation is ${req.query.workplaceLocation}`);
//     console.log(`req.query.job is ${req.query.bootcamp}`);
//     console.log(`req.query.job is ${req.query.state}`);


//         pool.query(queryText, [workplace, state])
//         .then(response => {
//             res.send(response.rows)
//         })
//         .catch((error) => {
//             console.log('Error fetching comparison data for charts ', error);
//             res.sendStatus(500);
//         });
// });

module.exports = router;
