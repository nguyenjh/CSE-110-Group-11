import express, { Request, Response } from 'express';
import { Post } from '../models/Post';

const router = express.Router();

router.get('/filter', async (req: Request, res: Response) => {
  const { cost, calories, time, sortBy } = req.query;

  try {
    // Create filter object based on query parameters
    const filters: any = {};
    if (cost) filters.cost = { $lte: Number(cost) };
    if (calories) filters.calories = { $lte: Number(calories) };
    if (time) filters.estimated_total_time = { $lte: Number(time) };

    // Fetch and sort data
    const sortOptions: any = {};
    if (sortBy) sortOptions[sortBy as string] = 1;

    const recipes = await Post.find(filters).sort(sortOptions);

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

export default router;
