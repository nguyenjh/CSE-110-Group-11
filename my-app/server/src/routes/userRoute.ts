import {protect} from '../middleware/auth';
import asyncHandler from 'express-async-handler';
import express, { Request, Response, NextFunction} from 'express';
import {User} from '../models/User';
// import express from 'express';
import { registerUser, loginUser, getMe, getAll } from '../controllers/userController';

const router = express.Router();
router.get('/', getAll);// GET /api/
// Public routes
router.post('/register', registerUser); // POST /api/register
router.post('/login', loginUser); // POST /api/login

// Private route
router.get('/me', protect, getMe); // GET /api/me

export default router;