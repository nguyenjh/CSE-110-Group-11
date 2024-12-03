import express, { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

interface AuthenticatedRequest extends Request {
    user?: { id: string };
}

const JWT_SECRET = 'scrumdiddlyumptious'; // Hardcoded JWT secret

const generateToken = (id: string): string => {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: { name: string; email: string; password: string } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Please add all fields' });
    return;
  }

  try {
    // Check if user exists by email
    const emailExists = await User.findOne({ email });
    // Check if user exists by username
    const usernameExists = await User.findOne({ name });

    if (emailExists && usernameExists) {
      res.status(400).json({ message: 'Both email and username already exist' });
      return;
    }

    // If only email exists
    if (emailExists) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // If only username exists
    if (usernameExists) {
      res.status(400).json({ message: 'Username already exists' });
      return;
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
      res.status(400).json({ message: 'Invalid user data' });
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

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = await User.findById(req.user?.id).select('-password');

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
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

const updateFavorites = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { userId, itemId } = req.body; 

  if (!itemId || !userId) {
    res.status(400).json({ message: 'Action must be a boolean and itemId is required.' });
    return;
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (!user.favorites.includes(itemId)) {
    user.favorites.push(itemId);
  }

  else {

  user.favorites = user.favorites.filter((id) => id !== itemId);
  }

  await user.save(); 

  res.status(200).json({ message: 'Favorites updated', favorites: user.favorites });
});

const updateRatings = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId, itemId, newRating } = req.body; 
  console.log("Received body.");

  const user = await User.findById(userId);

  // Check that user does exist.
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  console.log("received user");

  const existingRating = user.ratings.find(([id]) => id === itemId);

  // Update or add rating entry.
  if (existingRating) {
    console.log("Existing rating found");
    existingRating[1] = newRating;
  } else {
    console.log("No existing rating");
    user.ratings.push([itemId, newRating]);
  }

  await user.save();

  res.status(200).json({ message: 'Ratings updated', ratings: user.ratings });
});

export { registerUser, loginUser, getMe, getAll , updateFavorites, updateRatings};
