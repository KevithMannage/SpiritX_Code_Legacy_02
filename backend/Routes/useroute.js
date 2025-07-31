import express from 'express';
import { loginUser } from '../Controllers/UserController.js';
import {registerUser,verifyUserIdentity} from '../Controllers/UserController.js';
const router = express.Router();

router.post('/login', loginUser);
router.post("/register",registerUser);
router.post("/verify", verifyUserIdentity);

export default router;