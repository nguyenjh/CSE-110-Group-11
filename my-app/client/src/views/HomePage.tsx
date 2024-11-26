import { FilterContextProvider } from "../context/FilterContext";
import RecipeList from "./RecipeList";
import FilterBar from "./FilterBar";

export default function HomePage(){
  return (
    <FilterContextProvider>
      <FilterBar/>
      <RecipeList/>
    </FilterContextProvider>
  )
}