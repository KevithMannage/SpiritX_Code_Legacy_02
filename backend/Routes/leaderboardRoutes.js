// leaderboardRoutes.js
const express = require("express");
const router = express.Router();
const leaderboardController = require("../Controllers/leaderboardController.js");
const authenticate = require("../middleware/authMiddleware.js"); // Assuming you have authentication middleware

router.get("/leaderboard", authenticate, leaderboardController.getLeaderboard);

module.exports = router;