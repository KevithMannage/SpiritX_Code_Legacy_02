import express from 'express';
import { getAllPlayers } from '../Controllers/PlayerController.js';

const router = express.Router();

// Route to fetch all players
router.get('/getplayers', getAllPlayers);

export default router;
