//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PostInterface.ts
//
// The main interface we use for Posts. Adding to this should be safe, but let me know of any issues.
// Created by Alex Paz
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface IPost {
  name: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: number;
  tags: string[];
  ingredients: string[];
  directions: string[];
  numOfRatings: number;
  ratingsTotal: number;
}

