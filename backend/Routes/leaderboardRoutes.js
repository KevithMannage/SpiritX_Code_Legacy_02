// leaderboardRoutes.js
import express from 'express';
import LeaderboardController from '../Controllers/leaderboardController.js';

const router = express.Router();

router.get('/', LeaderboardController.getLeaderboard);

export default router;