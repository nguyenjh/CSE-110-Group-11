import { FilterContextProvider } from "../context/FilterContext";
import { SearchContextProvider } from "../context/SearchContext";
import RecipeList from "./RecipeList";
import FilterBar from "./FilterBar";

export default function HomePage(){
  return (
    <SearchContextProvider>
      <FilterContextProvider>
        <FilterBar/>
        <RecipeList/>
      </FilterContextProvider>
    </SearchContextProvider>
  )
}