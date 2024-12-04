import React, { createContext, useState, ReactNode } from "react";

interface RatingContextType {
  userRating: number;
  setUserRating: React.Dispatch<React.SetStateAction<number>>;
}

const initialState: RatingContextType = {
  userRating: 0,
  setUserRating: () => {},
};

interface RatingProviderProps {
  children: ReactNode;
}

export const ratingContext = createContext<RatingContextType>(initialState);

export const RatingContextProvider: React.FC<RatingProviderProps> = ({ children }) => {
  const [userRating, setUserRating] = useState<number>(0);

  return (
    <ratingContext.Provider value={{ userRating, setUserRating }}>
      {children}
    </ratingContext.Provider>
  );
};
