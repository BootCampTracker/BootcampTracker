const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


// Fetch all job entries
router.get('/', (req, res,) => {
const queryText = `SELECT "user"."id", "user"."username", "job_info"."job_title", 
"job_info"."salary", "benefits"."total_yearly_bonus"
  FROM "user"
  JOIN "job_info" ON "user"."id" = "job_info"."user_id"
  JOIN "benefits" ON "benefits"."job_id" = "job_info"."id"
  ORDER BY "user"."id" DESC;`;


// if (req.isAuthenticated()) {
  pool
    .query(queryText)
    .then(response => {
      res.send(response.rows)
    })
    .catch((error) => {
      console.log('Error fetching all jobs data ', error);
      res.sendStatus(500);
    });
  // }
  // else {
  //   res.sendStatus(403);
  // }
});

module.exports = router;
