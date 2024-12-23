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

    // Get the `tags` parameter from the query
    const tags = req.query.tags;
    const tagsArray: string[] = tags ? tags.toString().split(',') : [];

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
    
    if (tagsArray.length > 0) {
      query.tags = { $all: tagsArray };
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

    const { name, rating, likes, summary, prep_time, prep_time_unit, estimated_total_time, estimated_total_time_unit, serving, calories, cost, tags, ingredients, directions, numOfRatings, ratingsTotal } = req.body;

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
      directions,
      numOfRatings,
      ratingsTotal,
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
  const { recipeID, ratingDifference, incrementCount, newRating } = req.body;
  console.log('Received body:', req.body);

 if (typeof recipeID !== 'string'){
    res.status(400).json({ error: 'Invalid recipeID. Must be a string.' });
    return;
 }
 console.log('Checked recipe ID:', recipeID);

  // Validate the incoming rating
  if (typeof ratingDifference !== 'number') {
    res.status(400).json({ error: 'Invalid ratingDifference. Must be a number.' });
    return; // Ensure the function exits after responding
  }
  console.log('Checked rating difference:', ratingDifference);

  // Validate incrementCount (optional, if not provided defaults to false)
  if (typeof incrementCount !== 'boolean') {
    res.status(400).json({ error: 'Invalid incrementCount. Must be a boolean.' });
    return;
  }
  console.log('Checked increment count boolean:', incrementCount);

  if (typeof newRating !== 'number') {
    res.status(400).json({ error: 'Invalid newRating. Must be a number.' });
    return; // Ensure the function exits after responding
  }
  console.log('Checked newRating:', newRating);

  console.log('Running the findByIdAndUpdate');
  try {
    // Atomic update logic
    const updatedPost = await Post.findByIdAndUpdate(
      recipeID,
      [
        {
          $set: {
            ratingsTotal: {
              $add: [
                "$ratingsTotal", 
                incrementCount ? newRating : ratingDifference
              ]
            },
            numOfRatings: {
              $add: [
                { $ifNull: ["$numOfRatings", 0] },
                incrementCount ? 1 : 0
              ]
            }
          }
        }
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
    res.status(500).json({ error: 'Internal server error running updateRating' });
  }
};

export const updateLikes = async (req: Request, res: Response): Promise<void> => {
  const { recipeID, isLiked } = req.body;
  console.log('Received body:', req.body);

 if (typeof recipeID !== 'string'){
    res.status(400).json({ error: 'Invalid recipeID. Must be a string.' });
    return;
 }
 console.log('Checked recipe ID:', recipeID);

  if (typeof isLiked !== 'boolean') {
    res.status(400).json({ error: 'Invalid liked. Must be a boolean.' });
    return; // Ensure the function exits after responding
  }
  console.log('Checked liked:', isLiked);

  console.log('Running the findByIdAndUpdate');
  try {
    // Atomic update logic
    const updatedPost = await Post.findByIdAndUpdate(
      recipeID,
      [
        {
          $set: {
            likes: {
              $add: [
                "$likes",
                {
                  $cond: {
                    if: isLiked,       // Check the `liked` value
                    then: -1,        // Subtract 1 if liked is true
                    else: 1          // Add 1 if liked is false
                  }
                }
              ]
            }
          }
        }
      ],
      { new: true } // Return the updated document
    );
    
    

    if (!updatedPost) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }

    res.status(200).json({ message: 'Likes updated successfully', post: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error running updateLikes' });
  }
};
