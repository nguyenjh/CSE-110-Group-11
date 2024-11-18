////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OUTDATED, but left for reference
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the shape of the context value
interface IngredientsContextType {
  ingredients: string[];
  setIngredients: Dispatch<SetStateAction<string[]>>;
}

// Create the context with default values
export const IngredientsContext = createContext<IngredientsContextType>({
  ingredients: [],
  setIngredients: () => {} // Placeholder function; will be overridden by provider
});

// Define the provider component
interface IngredientsProviderProps {
  children: ReactNode;
}

export const IngredientsProvider: React.FC<IngredientsProviderProps> = ({ children }) => {
  const [ingredients, setIngredients] = useState<string[]>([]);

  return (
    <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
      {children}
    </IngredientsContext.Provider>
  );
};
