import React, { createContext, useState, ReactNode} from 'react';

interface recipeType {
  name: string;
  summary: string;
  instructions: string[];
}

// Define the type for your context data (optional but recommended)
interface RecipeFormType {
  recipeForm: recipeType;
  setRecipeForm: (newRecipeForm: recipeType) => void;
}

// Create the context with a default value
export const recipeContext = createContext<RecipeFormType | undefined>(undefined);

export const RecipeContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeForm, setRecipeForm] = useState<recipeType>({ name: '', summary: '', instructions: []});

  return (
    <recipeContext.Provider value={{ recipeForm, setRecipeForm }}>
      {children}
    </recipeContext.Provider>
  );
};