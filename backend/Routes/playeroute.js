import express from 'express';
import * as playerController from '../controllers/playerController.js';

const router = express.Router();

router.get('/:category', playerController.getPlayersByCategory);

export default router;