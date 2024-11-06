import { Recipe } from "../types/types";
import { createContext, useState } from "react";
import { recipesList } from "../constants/constants";

interface AppContextType {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const initialState: AppContextType = {
    recipes: recipesList,
    setRecipes: () => {},
}

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvide = (props: any) => {
    const [ recipes, setRecipes] = useState<Recipe[]>(initialState.recipes);
    return (
        <AppContext.Provider
            value = {{
                recipes: recipes,
                setRecipes: setRecipes,
            }}>
                {props.children}
        </AppContext.Provider>
    );
}