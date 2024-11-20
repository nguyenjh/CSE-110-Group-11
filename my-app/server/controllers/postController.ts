import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { ParsedQs } from 'qs';

// Get all posts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.json(posts); // Sending the response here, not returning it
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
};

// Get a post by ID or filter
export const getPost = async (req: Request, res: Response): Promise<void> => {
  // Type the query parameters as string or string array
  const { cost, calories, time, sortBy } = req.query;

  try {
    let queryFilters: { [key: string]: any } = {};

    // Ensure query parameters are strings or arrays of strings
    if (cost && typeof cost === 'string') {
      // Apply the cost filter based on the value
      if (cost === "Under $5") {
        queryFilters.cost = { $lt: 5 }; // Less than $5
      } else if (cost === "$5-$15") {
        queryFilters.cost = { $gte: 5, $lte: 15 }; // Between $5 and $15
      } else if (cost === "$15-$30") {
        queryFilters.cost = { $gte: 15, $lte: 30 }; // Between $15 and $30
      } else if (cost === "Over $30") {
        queryFilters.cost = { $gt: 30 }; // More than $30
      }
    }

    if (calories && typeof calories === 'string') {
      // Apply the calories filter based on the value
      if (calories === "Under 50 Calo") {
        queryFilters.calories = { $lt: 50 }; // Less than 50 calories
      } else if (calories === "50-150 Calo") {
        queryFilters.calories = { $gte: 50, $lte: 150 }; // Between 50 and 150 calories
      } else if (calories === "Over 150 Calo") {
        queryFilters.calories = { $gt: 150 }; // More than 150 calories
      }
    }

    if (time && typeof time === 'string') {
      // Apply the time filter based on the value
      if (time === "Under 10 mins") {
        queryFilters.estimated_total_time = { $lt: 10 }; // Less than 10 minutes
      } else if (time === "10-30 mins") {
        queryFilters.estimated_total_time = { $gte: 10, $lte: 30 }; // Between 10 and 30 minutes
      } else if (time === "Over 30 mins") {
        queryFilters.estimated_total_time = { $gt: 30 }; // More than 30 minutes
      }
    }

    // Handle the sort parameter
    const sortOptions: { [key: string]: 1 | -1 } = {};
    if (sortBy && typeof sortBy === 'string') {
      sortOptions[sortBy] = 1; // Sorting based on the selected option (ascending order by default)
    }

    // Fetch posts based on the filters and sorting
    const posts = await Post.find(queryFilters).sort(sortOptions);

    if (posts.length === 0) {
      res.status(404).json({ message: "No posts found matching the filters" });
    } else {
      res.json(posts);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
};


// Add a post
export const addPost = async (req: Request, res: Response): Promise<void> => {
  const { name, rating, likes, summary, prep_time, prep_time_unit, estimated_total_time, estimated_total_time_unit, serving, calories, cost, tags, ingredients, directions } = req.body;

  // Validation check for required fields
  if (!name) {
    res.status(400).json({ message: 'Missing required fields' });
    return; // Return early if validation fails
  }

  const post = new Post({
    name,
    rating,
    likes,
    summary,
    prep_time,
    prep_time_unit,
    estimated_total_time,
    estimated_total_time_unit,
    serving,
    calories,
    cost,
    tags,
    ingredients,
    directions
  });

  try {
    await post.save(); // Save the post to the database
    res.status(201).json(post); // Respond with the created post
  } catch (err) {
    res.status(500).json({ message: "Failed to add post", error: err });
  }
};
