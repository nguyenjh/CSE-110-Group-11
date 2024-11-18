import express, { Express, Request, Response } from 'express';
import { User } from '../models/User'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Joi from 'joi';


const JWT_SECRET = process.env.JWT_SECRET;
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err });
    }
};

// Function to handle creating a new user
// export const createUser = async (req: Request, res: Response) => {
    // try {
    //     const user = new User(req.body);
    //     await user.save();
    //     res.status(201).send(user);
    // } catch (err) {
    //     res.status(400).send({ message: "Failed to create user", error: err });
    // }


    // const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {}
// }

interface RegisterUserBody {
    name: string;
    email: string;
    password: string;
  }
  
  interface LoginUserBody {
    email: string;
    password: string;
  }
  
  // @desc    Register new user
  // @route   POST /api/users
  // @access  Public
  const registerUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(), // Validates email format
        password: Joi.string().min(6).required(), // Ensures a strong password
      });
    
      const { error } = schema.validate(req.body);
      if (error) {
        res.status(400);
        throw new Error(error.details[0].message);
      }
    
    const { name, email, password }: RegisterUserBody = req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }
  
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
  });

  const generateToken = (id: string): string => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
  
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  };
  
// loginUser controller
  const loginUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { email, password }: LoginUserBody = req.body;
  
    // Check for user email
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
  

//   interface CustomRequest extends Request {
//     user?: {
//       _id: string;
//       name: string;
//       email: string;
//     };
//   }

  const getMe = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body) {
      res.status(401);
      throw new Error('User not found');
    }
    res.status(200).json(req.body);
  });
  
// ONLY HAVE IN DEV MODE, DELETE AFTER TESTING
  const getAll = asyncHandler(async(req:Request, res:Response):Promise<void>=>{
    const decks = await User.find();
        res.json(decks);
    
  } )
  export { registerUser, loginUser, getMe, getAll };



