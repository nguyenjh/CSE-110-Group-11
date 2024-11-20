import { Express, Request, Response } from 'express';
import { Post } from '../models/Post';

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let  posts = await Post.find();
    res.json(posts);
  }
  catch(err) {
    res.status(500).json({ message: "Failed to fetch posts", error: err });
  }
};

export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    const cost = decodeURIComponent(req.query.cost as string || '');
    const calories = decodeURIComponent(req.query.cost as string || '');
    const time = decodeURIComponent(req.query.cost as string || '');
    const sortBy = decodeURIComponent(req.query.cost as string || '');


    const query: any = {};

    if(cost == "Under $5"){
      query.cost = {$lt: 5};
      console.log("Searching below 5 dollars");
    }
    else if(cost == "$5-$15"){
      query.cost = { $gt: 5, $lt: 15 };
    }
    else if(cost == "$15-$30"){
      query.cost = { $gt: 15, $lt: 30 };
    }
    else {
      console.log("Did not get a query for cost");
    }

    if(calories == "Under 50 Calo"){
      query.calories = {$lt: 50};
      console.log("Searching below 50 calories");
    }
    else if(calories == "50-150 Calo"){
      query.calories = {$gt: 50, $lt: 150};
    }
    else if(calories == "Over 150 Calo"){
      query.calories = {$gt: 150};
    }
    else {
      console.log("Did not get a query for calories");
    }

    let result = await Post.find(query);
    res.json(result);
  }
  catch(err){
    res.status(500).json({ message: "Failed to fetch post", error: err });
  }
}

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
    res.status(201).send(post);
  } 
  
  catch (err) {
    res.status(500).json({ message: "Failed to add post", error: err });
  }
};