import express from 'express';
import { getPlayersByUser} from '../Controllers/BudgetController.js';
const router = express.Router();
router.get('/budgetforuser/:userId', getPlayersByUser);

export default router;