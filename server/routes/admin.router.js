const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');

// Fetch all job entries for AdminPage
router.get('/', rejectUnauthenticated, (req, res,) => {
  console.log('made it to server!');
const queryText = `SELECT "user"."username", "user"."id" AS "user_id", "user"."username", "job_info"."job_title", 
"job_info"."salary", "benefits"."total_yearly_bonus", "job_info"."id" AS "job_id"
  FROM "user"
  JOIN "job_info" ON "user"."id" = "job_info"."user_id"
  JOIN "benefits" ON "benefits"."job_id" = "job_info"."id"
  ORDER BY "user"."id" DESC;`;

if (req.isAuthenticated()) {
  pool
    .query(queryText)
    .then(response => {
      console.log('made it to server.then!');

      res.send(response.rows)
    })
    .catch((error) => {
      console.log('Error fetching all jobs data ', error);
      res.sendStatus(500);
    });
  }
  else {
    res.sendStatus(403);
  }
});

// Delete job from database by jobId.
// router.delete('/:id', rejectUnauthenticated, async (req, res,) => {
//   const jobIdToDelete = req.params.id;
//   const queryText = `DELETE FROM "job_info" WHERE "id" = $1;`;
//   const queryText2 = `DELETE FROM "benefits" WHERE ;`;
  
//   if (req.isAuthenticated()) {
//     const connection = await pool.connect()
//     try {
//       await connection.query('BEGIN');
//       const sqlDeleteJob = `DELETE FROM "job_info" WHERE "id" = $1;`;

//     }

//     // pool
//     //   .query(queryText, [jobIdToDelete])
//     //   .then(response => {
//     //     res.send(response.rows)
//     //   })
//     //   .catch((error) => {
//     //     console.log('Error fetching all jobs data ', error);
//     //     res.sendStatus(500);
//     //   });
//     }
//     else {
//       res.sendStatus(403);
//     }
  // });

module.exports = router;
