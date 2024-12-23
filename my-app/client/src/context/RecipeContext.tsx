////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RecipeContext.tsx
//
// RecipeForm context used to contain the information inputted into the form across all components in CreatePost.
//
// Note: This file may have concerning dependencies with PostInterface.ts. If a new entry is put into the interface,
// it may be required to add a value for it for the form. This isn't ideal and a solution may be to define
// our interface as Partial<recipeType>.
//
// Assembled by Alex Paz.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { createContext, useState, ReactNode} from 'react';
import { IPost as recipeType } from '../../../PostInterface';


// Define the type for your context data (optional but recommended)
interface RecipeFormType {
  recipeForm: recipeType;
  setRecipeForm: (newRecipeForm: recipeType) => void;
}

// Create the context with a default value
export const recipeContext = createContext<RecipeFormType | undefined>(undefined);

export const RecipeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeForm, setRecipeForm] = useState<recipeType>({ 
    name: "",
    rating: 0,
    likes: 0,
    summary: "",
    prep_time: 0,
    prep_time_unit: "",
    estimated_total_time: 0,
    estimated_total_time_unit: "",
    serving: 0,
    calories: 0,
    cost: 0,
    tags: [],
    ingredients: [],
    directions: [],
  });

  return (
    <recipeContext.Provider value={{ recipeForm, setRecipeForm }}>
      {children}
    </recipeContext.Provider>
  );
};