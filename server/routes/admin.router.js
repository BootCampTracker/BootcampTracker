const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require('../modules/authentication-middleware');


// Fetch all job entries
router.get('/', (req, res) => {
  // GET route code here
});

// POST
// router.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = router;
