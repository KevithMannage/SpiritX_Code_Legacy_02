import express from 'express';
import * as teamController from '../controllers/teamController.js';

const router = express.Router();

router.get('/', teamController.getTeam);
router.post('/add-player', teamController.addPlayer);
router.post('/remove-player', teamController.removePlayer);
router.get('/budget', teamController.getBudget);

export default router;