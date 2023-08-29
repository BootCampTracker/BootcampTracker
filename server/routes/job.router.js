const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", (req, res) => {
  // GET route
});

// POST for Benefits and Jobs info
router.post("/", async (req, res) => {
  let jobInfo = req.body;
  let benefitInfo = req.body;
  // Parameterizations
  let paramsJobInfo = [
    jobInfo.userId,
    jobInfo.jobTitle,
    jobInfo.jobRole,
    jobInfo.Company,
    jobInfo.state,
    jobInfo.promotions,
    jobInfo.jobNumber,
    jobInfo.hours,
    jobInfo.jobDuration,
    jobInfo.jobType,
    jobInfo.dateHired,
    jobInfo.salary,
    jobInfo.graduationDate,
    jobInfo.bootcamp,
  ];
  let paramsBenefitInfo = [
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
  // We need to use the same connection for all queries...
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");
    const queryJobText = `INSERT INTO "job_info" ("user_id","job_title", "job_role", "company", "state", "promotions", "job_number","hours", "job_duration", "job_type", "date_hired", "salary", "graduation_date","bootcamp")
  VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14);`;
    const queryBenefitText = `INSERT INTO "benefits" ("health_insurance","dental_insurance","PTO", "401K", "equity", "bonuses", "long_term_disability","short_term_disability", "notes")
  VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    await connection.query(queryJobText, paramsJobInfo);
    await connection.query(queryBenefitText, paramsBenefitInfo);
    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (err) {
    await connection.query("ROLLBACK");
    console.log(`ERROR in POST for job and benefits:`, err);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

module.exports = router;
