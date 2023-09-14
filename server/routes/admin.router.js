// Import dependencies
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


// Fetch all job entries for AdminPage
router.get('/', rejectUnauthenticated, (req, res,) => {
  // SQL for our GET route
  const queryText = `SELECT "user"."username", "user"."id" AS "user_id", "user"."username",
  "job_info"."job_title", "job_info"."salary", "benefits"."total_yearly_bonus",
  "job_info"."id" AS "job_id"
  FROM "user"
  JOIN "job_info" ON "user"."id" = "job_info"."user_id"
  JOIN "benefits" ON "benefits"."job_id" = "job_info"."id"
  ORDER BY "user"."id" DESC;`;

  // Pool connection between our server and db
  // send the SQL as queryText
  // send the response back to the client as response.rows
  pool
    .query(queryText)
    .then(response => {
      res.send(response.rows)
    })
    // Catch any errors in the request and return
    .catch((error) => {
      console.log('Error fetching all jobs data ', error);
      // send a status of 500 when something goes wrong
      res.sendStatus(500);
    });
});

// Delete job from database by jobId.
router.delete('/:id', rejectUnauthenticated, async (req, res,) => {
  // store the id passed in the dynamic route (req.params.id) to the variable jobIdToDelete
  const jobIdToDelete = req.params.id;
  
  const connection = await pool.connect()
  try {
    await connection.query('BEGIN');
    // SQL to delete from the job_info table
    const sqlDeleteJobInfo = `DELETE FROM "job_info" WHERE "id" = $1;`;
    // SQL to delete from the benefits table
    const sqlDeleteJobBenefits = `DELETE FROM "benefits" WHERE "job_id" = $1;`;
    // delete job_info at the specified jobIdToDelete
    await connection.query(sqlDeleteJobBenefits, [jobIdToDelete])
        // delete benefits at the specified jobIdToDelete
    await connection.query(sqlDeleteJobInfo, [jobIdToDelete])
    await connection.query('COMMIT');
    res.sendStatus(200);
  } catch (error) {
    // rollback any specified changes in the try
    await connection.query('ROLLBACK');
    console.log(`Error deleting job entry`, error);
    // send 500 status to the user that there was a server error
    res.sendStatus(500);
  } finally {
    // end connection to the db
    connection.release()
  }
});

module.exports = router;
