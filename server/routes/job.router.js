const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();


// POST for Benefits, Jobs and Bootcamp info
router.post("/", async (req, res) => {

  let jobInfo = req.body;
  let benefitInfo = req.body;
  let bootcampInfo = req.body;
  // Parameterizations
  let paramsJobInfo = [
    jobInfo.userId,
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
    benefitInfo.userId,
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
    bootcampInfo.userId,
    bootcampInfo.gradDate,
    bootcampInfo.bootcamp,
  ];
  // We need to use the same connection for all queries...
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    // Querys
    const queryJobText = ``;
    const queryBenefitText = ``;
    const queryBootcampText = ``;
    // Await for querys and Parameterization
    await connection.query(queryJobText, paramsJobInfo);
    await connection.query(queryBenefitText, paramsBenefitInfo);
    await connection.query(queryBootcampText, paramsBootcampInfo);
    await connection.query("COMMIT");
    console.log('Connection', connection);
    // Send an OK status
    res.sendStatus(200);
    // Catch any Errors
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log(`ERROR in POST for Job, Benefits, and Bootcamp:`, err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;
