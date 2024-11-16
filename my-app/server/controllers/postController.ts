import express from 'express';
import { Express, Request, Response } from 'express';
import { Post } from '../models/Post';
import mongoose, { Types } from 'mongoose';

interface IPost extends Document {
  name: string;
  user: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: string;
  tags: string[];
  ingredients: string[];
  directions: string[];
  _id: Types.ObjectId;
}


export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let  posts = await Post.find();
    res.json(posts);
  }
  catch(err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    let  post = await Post.find(req.body._id);
    res.json(post);
  }
  catch(err) {
    res.status(500).json({ message: "Failed to fetch user by id", error: err });
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
      const user = new Post(req.body); 
      await user.save();
      res.status(201).send(user);
  } catch (err) {
      res.status(400).send(err);
  }
};