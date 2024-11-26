import React, { createContext, useState, ReactNode} from 'react';

interface filterType {
  cost: string;
  calories: string;
  time: string;
  sortBy: string;
  tags: string[];
}

interface FilterFormType {
  filterForm: filterType;
  setFilterForm:  React.Dispatch<React.SetStateAction<filterType>>;
}

export const filterContext = createContext<FilterFormType | undefined>(undefined);

export const FilterContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filterForm, setFilterForm] = useState<filterType>({ 
    cost: "",
    calories: "",
    time: "", 
    sortBy: "",
    tags: [],
  });

  return (
    <filterContext.Provider value={{ filterForm, setFilterForm }}>
      {children}
    </filterContext.Provider>
  );
};