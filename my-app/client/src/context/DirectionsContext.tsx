import React, { createContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

// Define the shape of the context value
interface DirectionsContextType {
  directions: string[];
  setDirections: Dispatch<SetStateAction<string[]>>;
}

// Create the context with default values
export const DirectionsContext = createContext<DirectionsContextType>({
  directions: [],
  setDirections: () => {} // Placeholder function; will be overridden by provider
});

// Define the provider component
interface DirectionsProviderProps {
  children: ReactNode;
}

export const DirectionsProvider: React.FC<DirectionsProviderProps> = ({ children }) => {
  const [directions, setDirections] = useState<string[]>([]);

  return (
    <DirectionsContext.Provider value={{ directions, setDirections }}>
      {children}
    </DirectionsContext.Provider>
  );
};
