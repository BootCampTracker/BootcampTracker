const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


// Fetch all job entries
// router.get('/', rejectUnauthenticated, (req, res,) => {
// const queryText = `SELECT "user"."id", "user"."username" 
//   FROM "user"
//   JOIN "job_info" ON "user"."id" = "job_info"."user_id"
//   ORDER BY "user"."id" DESC`


// if (req.isAuthenticated()) {
//   pool
//     .query(queryText)
//     .then(response => {
//       res.send(response.rows)
//     })
//     .catch((error) => {
//       console.log('Error fetching all jobs data ', error);
//       res.sendStatus(500);
//     });
//   }
//   else {
//     res.sendStatus(403);
//   }
// });

module.exports = router;
