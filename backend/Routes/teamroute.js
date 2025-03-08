import express from 'express';

import { getPlayerCount, addPlayer, removePlayer } from '../Controllers/Teamcontroller.js';

const router = express.Router();

router.get('/count/:userId', getPlayerCount);
router.post('/add', addPlayer);
router.delete('/remove', removePlayer);

export default router;
