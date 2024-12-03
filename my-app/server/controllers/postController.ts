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
      query.cost = { $gte: 5, $lte: 15 };
    }
    else if (cost === "$16-$30") {
    console.log("Filtering posts with cost between $16 and $30");
    query.cost = { $gte: 16, $lte: 30 };
    }
    else if (cost === "> $30") {
      console.log("Filtering posts with cost over $30");
      query.cost = { $gt: 30};
    }

    if (calories === "< 500 Cal") {
      console.log("Filtering posts with calories under 500");
      query.calories = { $lt: 500 };
    } else if (calories === "500-750 Cal") {
      console.log("Filtering posts with calories between 500 and 750");
      query.calories = { $gte: 500, $lte: 750 };
    } else if (calories === "751-1000 Cal") {
      console.log("Filtering posts with calories between 751 and 1000");
      query.calories = { $gte: 751, $lte: 1000 };
    }else if (calories === "> 1000 Cal") {
    console.log("Filtering posts with calories over 1000");
    query.calories = { $gt: 1000 };
    }

    if (time === "< 10 mins") {
      query.prep_time = { $lt: 10 };
    } else if (time === "10-30 mins") {
      query.prep_time = { $gte: 10, $lte: 30 };
    } else if (time === "> 30 mins") {
      query.prep_time = { $gt: 30 };
    }

    let sortOption: any = {};
    if (sortBy === "Most Popular") {
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
interface AuthenticatedRequest extends Request {
  user?: { id: string }; // Extend the Request type to include the user
}

export const addPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const { name, rating, likes, summary, prep_time, prep_time_unit, estimated_total_time, estimated_total_time_unit, serving, calories, cost, tags, ingredients, directions } = req.body;

    // Validate that all required fields are provided
    if (!name) {
      res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new post using the data from req.body
    const post = new Post({
      user: userId,
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

export const updateRating = async (req: Request, res: Response): Promise<void> => {
  const postId = req.params.id;
  const { newRating, incrementCount } = req.body;

  // Validate the incoming rating
  if (typeof newRating !== 'number') {
    res.status(400).json({ error: 'Invalid rating. Must be a number.' });
    return; // Ensure the function exits after responding
  }

  // Validate incrementCount (optional, if not provided defaults to false)
  if (typeof incrementCount !== 'boolean') {
    res.status(400).json({ error: 'Invalid incrementCount. Must be a boolean.' });
    return;
  }

  try {
    // Atomic update logic
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      [
        {
          $set: {
            ratingsTotal: { $add: ["$ratingsTotal", newRating] }, // Add newRating to ratingsTotal
            numOfRatings: { $add: ["$numOfRatings", incrementCount ? 1 : 0] }, // Conditionally increment numOfRatings
            rating: { // Recalculate the average rating
              $round: [
                {
                  $divide: [
                    { $add: ["$ratingsTotal", newRating] },
                    { $add: ["$numOfRatings", incrementCount ? 1 : 0] },
                  ],
                },
                1,
              ],
            },
          },
        },
      ],
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Rating updated successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
