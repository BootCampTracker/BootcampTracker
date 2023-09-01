const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// GET route to grab the data we need for our charts
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In the server GET route for /api/compare');

    // instead of req.body, use req.query
    // req.query is our object with key value pairs
    // req.query = comparisonData
    console.log(`req.query is: ${JSON.stringify(req.query)}`);

    console.log(`req.query.job is ${req.query.job}`);
    console.log(`req.query.workplaceLocation is ${req.query.workplaceLocation}`);
    console.log(`req.query.job is ${req.query.bootcamp}`);
    console.log(`req.query.job is ${req.query.state}`);

    const queryText = ``

    if (req.isAuthenticated()) {
        pool.query(queryText)
        .then(response => {
            res.send(response.rows)
        })
        .catch((error) => {
            console.log('Error fetching comparison data for charts ', error);
            res.sendStatus(500);
        });
        }
        else {
            res.sendStatus(403);
        }
});

module.exports = router;
