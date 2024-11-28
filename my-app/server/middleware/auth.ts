import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

// Middleware for verifying the JWT and protecting routes
const protect = asyncHandler(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  let token;

  // Check for token in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      req.user = await User.findById(decoded.id).select('-password'); // Exclude password from the response

      if (!req.user) {
        res.status(401);
        throw new Error('User not found');
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Error in authentication middleware:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware for restricting access to admin users
const admin = asyncHandler(async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Not authorized');
  }

  // Example of admin logic; change as needed
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }

  next(); // Proceed if the user is an admin
});

// Utility to generate a JWT token
const generateToken = (id: string): string => {
  console.log('JWT_SECRET:', process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

export { protect, admin, generateToken };
