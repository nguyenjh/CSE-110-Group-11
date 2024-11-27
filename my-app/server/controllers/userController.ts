import express, { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Joi from 'joi';

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);

const generateToken = (id: string): string => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }

    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id.toString()),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error: any) {
    console.error('Error during registration:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    res.status(200).json(user);
});

// @desc    Fetch all users (for dev only)
// @route   GET /api/users
// @access  Private (Admin-only if applicable)
const getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await User.find().select('-password');
    res.json(users);
});

export { registerUser, loginUser, getMe, getAll };
