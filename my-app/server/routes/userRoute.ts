// userRoute.ts

import express, { Request, Response } from 'express';
import { protect } from '../middleware/auth';
import { registerUser, loginUser, getMe, getAll } from '../controllers/userController';

const router = express.Router();

// Public routes
router.post('/register', registerUser);  // POST /api/register
router.post('/login', loginUser);        // POST /api/login

// Private route
router.get('/me', protect, getMe);       // GET /api/me
router.get('/', getAll);                 // Get all users (for testing purposes)

export default router;
