import React, { createContext, useState, ReactNode} from 'react';

interface recipeType {
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
}


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