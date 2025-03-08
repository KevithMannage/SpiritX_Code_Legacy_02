import express from 'express';
import { getAllPlayers } from '../Controllers/PlayerController.js';
import { fetchPlayers } from '../Controllers/PlayerController.js';
const router = express.Router();

// Route to fetch all players
router.get('/getplayers', getAllPlayers);
router.post('/getplayerbycategory',fetchPlayers);
export default router;
