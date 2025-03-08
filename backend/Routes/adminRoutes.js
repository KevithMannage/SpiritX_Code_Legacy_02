import express from 'express';
import AdminController from '../Controllers/adminController.js'; // Updated path

const router = express.Router();

router.get('/', AdminController.getAllPlayers);        // GET /api/players
router.post('/', AdminController.createPlayer);        // POST /api/players
router.put('/:id', AdminController.updatePlayer);      // PUT /api/players/:id
router.delete('/:id', AdminController.deletePlayer);   // DELETE /api/players/:id

export default router;