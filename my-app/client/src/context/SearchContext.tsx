
import React, { createContext, useState, ReactNode} from 'react';


interface SearchFormType {
  search: string;
  setSearch:  React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: SearchFormType = {
  search: "",
  setSearch: () => {}, // A no-op function as a placeholder
};

export const searchContext = createContext<SearchFormType>(defaultContextValue);

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [search, setSearch] = useState<string>("");



  return (
    <searchContext.Provider value={{ search, setSearch }}>
      {children}
    </searchContext.Provider>
  );
};