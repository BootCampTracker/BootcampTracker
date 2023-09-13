const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

// POST for Benefits, Jobs and Bootcamp info
router.post("/", rejectUnauthenticated, async (req, res) => {
  let jobInfo = req.body;
  let benefitInfo = req.body;
  let bootcampInfo = req.body;
  // Parameterizations
  let paramsJobInfo = [
    jobInfo.jobUserId,
    jobInfo.jobTitle,
    jobInfo.jobLevel,
    jobInfo.jobType,
    jobInfo.workplace,
    jobInfo.company,
    jobInfo.state,
    jobInfo.promotions,
    jobInfo.jobNumber,
    jobInfo.hours,
    jobInfo.dateHired,
    jobInfo.salary,
  ];
  let paramsBenefitInfo = [
    benefitInfo.benefitUserId,
    benefitInfo.health,
    benefitInfo.dental,
    benefitInfo.PTO,
    benefitInfo.fourZeroOneK,
    benefitInfo.equity,
    benefitInfo.bonuses,
    benefitInfo.LTD,
    benefitInfo.STD,
    benefitInfo.notes,
  ];

  let paramsBootcampInfo = [
    bootcampInfo.bootcampUserId,
    bootcampInfo.gradDate,
    bootcampInfo.bootcamp,
  ];
  // We need to use the same connection for all queries
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    // SQL Queries
    const queryJobText = `INSERT INTO "job_info" ("user_id","job_title", "job_level", "job_type", "workplace", "company", "state","promotion", "job_number", "hours", "date_hired", "salary")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id;`;
    const queryBenefitText = `INSERT INTO "benefits" ("user_id","job_id", "health_insurance","dental_insurance","PTO", "401K", "equity", "total_yearly_bonus", "long_term_disability","short_term_disability", "notes")
    VALUES ( $1,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11);`;
    const queryBootcampText = `INSERT INTO "bootcamp" ("user_id","graduation_date", "bootcamp")
    VALUES ( $1,$2,$3);
    `;
    // Await for queries and parameterization
    const result = await connection.query(queryJobText, paramsJobInfo);
    const jobId = result.rows[0].id;
    await connection.query(queryBenefitText, [
      benefitInfo.benefitUserId,
      jobId,
      benefitInfo.health,
      benefitInfo.dental,
      benefitInfo.PTO,
      benefitInfo.fourZeroOneK,
      benefitInfo.equity,
      benefitInfo.bonuses,
      benefitInfo.LTD,
      benefitInfo.STD,
      benefitInfo.notes,
    ]);
    await connection.query(queryBootcampText, paramsBootcampInfo);
    await connection.query("COMMIT");
    console.log("Connection", connection);
    // Send an OK status
    res.sendStatus(200);
    // Catch any errors and rollback the transaction
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log(`ERROR in POST for Job, Benefits, and Bootcamp:`, err);
    res.sendStatus(500);
  } finally {
    // end connection to the db
    connection.release();
  }
});

module.exports = router;
