const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// GET Profile for graphs
router.get("/graph/:id",rejectUnauthenticated, (req, res) => {
  // Query and requesting User id
  const queryText = `SELECT "job_info"."id", "date_hired", "salary", "job_number" FROM "job_info"
  WHERE "user_id" = $1;`;
  const profileId = req.user.id;

  pool
    .query(queryText, [profileId])
    .then(result => {
      // Send the Profile info for Graphs to Client
      console.log("Recieved Profile info for graph from Database:");
      res.send(result.rows);
      // Catch any ERRORS
    })
    .catch(err => {
      console.log(`ERROR in GET for Profile info Graphs: ${queryText}`);
      res.sendStatus(500);
    });
});

module.exports = router;
