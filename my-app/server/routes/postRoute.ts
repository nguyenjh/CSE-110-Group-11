// postRoute.ts

import express from 'express';
import { getAllPosts, getPost, addPost } from '../controllers/postController';

const router = express.Router();

// GET Request for All Posts
router.get("/", getAllPosts);

// GET Request for Specific Post or Filter Posts
router.get("/:id", getPost); // To get a post by ID
router.get("/filter", getPost); // To get posts by filter query parameter

// POST Request to add a new post
router.post("/", addPost);

export default router;
