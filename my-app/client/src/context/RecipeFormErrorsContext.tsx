import React, { createContext, useState, ReactNode} from 'react';

interface RecipeFormErrorType {
    title: string;
    summary: string;
    cost: string;
    tags: string;
    calories: string;
    prep_time: string;
    servings: string;
    total_time: string;
    ingredients: string;
    directions: string;
    form: string;
}

interface RecipeFormErrorContextType {
  recipeFormError: RecipeFormErrorType;
  setRecipeFormError:  React.Dispatch<React.SetStateAction<RecipeFormErrorType>>;
}

export const recipeFormErrorContext = createContext<RecipeFormErrorContextType | undefined>(undefined);

export const RecipeFormErrorContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recipeFormError, setRecipeFormError] = useState<RecipeFormErrorType>({ 
    title: "",
    summary: "",
    cost: "",
    tags: "",
    calories: "",
    prep_time: "",
    servings: "",
    total_time: "",
    ingredients: "",
    directions: "",
    form: "",
  });

  return (
    <recipeFormErrorContext.Provider value={{ recipeFormError, setRecipeFormError }}>
      {children}
    </recipeFormErrorContext.Provider>
  );
};