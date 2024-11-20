import { Request, Response } from 'express';
import { Post } from '../models/Post';

export const getFilteredPosts = async (req: Request, res: Response) => {
  try {
    console.log('Received request to filter posts:', req.query);

    const { cost, calories, time, sortBy } = req.query;
    const query: any = {};

    // Cost filtering
    if (cost === 'Under $5') query.cost = { $lt: 5 };
    else if (cost === '$5-$15') query.cost = { $gte: 5, $lte: 15 };
    else if (cost === '$15-$30') query.cost = { $gte: 15, $lte: 30 };

    // Calories filtering
    if (calories === 'Under 50 Calo') query.calories = { $lt: 50 };
    else if (calories === '50-150 Calo') query.calories = { $gte: 50, $lte: 150 };
    else if (calories === 'Over 150 Calo') query.calories = { $gt: 150 };

    // Time filtering
    if (time === 'Under 10 min') query.time = { $lt: 10 };
    else if (time === '10-30 min') query.time = { $gte: 10, $lte: 30 };
    else if (time === 'Over 30 min') query.time = { $gt: 30 };

    // MongoDB sorting logic
    let sortOption = {};
    if (sortBy === 'cost') sortOption = { cost: 1 };
    else if (sortBy === 'calories') sortOption = { calories: 1 };
    else if (sortBy === 'time') sortOption = { time: 1 };

    console.log('MongoDB query:', query, 'Sort option:', sortOption);

    const result = await Post.find(query).sort(sortOption);
    console.log('Filtered posts result:', result);

    res.json(result);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Internal Server Error');
  }
};
