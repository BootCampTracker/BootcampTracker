const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// GET route to grab the data we need for our charts
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('In the server GET route for /api/compare');

    // req.body documentation
    let comparisonData = req.body;
    console.log(`comparisonData req.body is: ${JSON.stringify(comparisonData)}`);
    console.log(`${JSON.stringify(comparisonData.bootcamp)}`);


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
