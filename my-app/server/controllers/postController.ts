import { Express, Request, Response } from 'express';
import { Post } from '../models/Post';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let  posts = await Post.find();
    console.log("Got all posts");
    res.json(posts);
  }
  catch(err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
};

export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    console.log("Received request to filter posts");
    const cost = req.query.cost;
    const calories = req.query.calories;
    const time = req.query.time;
    const sortBy = req.query.sortBy;

    console.log("Query parameters:", req.query);

    const query: any = {};

    if (cost === "< $5") {
      console.log("Filtering posts with cost under $5");
      query.cost = { $lt: 5 };
    } else if (cost === "$5-$15") {
      console.log("Filtering posts with cost between $5 and $15");
      query.cost = { $gt: 5, $lt: 15 };
    }
    else if (cost === "$15-$30") {
    console.log("Filtering posts with cost between $15 and $30");
    query.cost = { $gt: 15, $lt: 30 };
    }
    else if (cost === "> $30") {
      console.log("Filtering posts with cost over $30");
      query.cost = { $gt: 30};
    }

    if (calories === "< 50 Calo") {
      console.log("Filtering posts with calories under 50");
      query.calories = { $lt: 50 };
    } else if (calories === "50-150 Calo") {
      console.log("Filtering posts with calories between 50 and 150");
      query.calories = { $gt: 50, $lt: 150 };
    } else if (calories === "> 150 Calo") {
      console.log("Filtering posts with calories over 150");
      query.calories = { $gt: 150 };
    }

    if (time === "< 10 mins") {
      query.prep_time = { $lt: 10 };
    } else if (time === "10-30 mins") {
      query.prep_time = { $gte: 10, $lte: 30 };
    } else if (time === "> 30 mins") {
      query.prep_time = { $gt: 30 };
    }

    let sortOption: any = {};
    if (sortBy === "Newest") {
      sortOption.createdAt = -1; // Sort by creation time, newest first
    } else if (sortBy === "Most Popular") {
      sortOption.likes = -1; // Sort by likes, most popular first
    }

    const result = await Post.find(query).sort(sortOption);
    console.log("Filtered posts result:", result);

    res.json(result);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    let  post = await Post.find(req.body._id);
    res.json(post);
  }
  catch(err) {
    res.status(500).json({ message: "Failed to fetch post by id", error: err });
  }
};

export const addPost = async (req: Request, res: Response) => {
  try {
    const { name, rating, likes, summary, prep_time, prep_time_unit, estimated_total_time, estimated_total_time_unit, serving, calories, cost, tags, ingredients, directions } = req.body;

    // Validate that all required fields are provided
    if (!name) {
      res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new post using the data from req.body
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
    await post.save();
    console.log("Just saved post");
    res.status(201).send(post);
  } 
  
  catch (err) {
    res.status(500).json({ message: "Failed to add post", error: err });
  }
};