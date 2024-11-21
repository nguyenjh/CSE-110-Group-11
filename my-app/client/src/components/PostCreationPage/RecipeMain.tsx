import { ChangeEvent, useContext, useRef } from "react";
import { recipeContext } from "../../context/RecipeContext";

function RecipeMain() {
    const context = useContext(recipeContext);
    if (!context) {
        throw new Error('Component must be used within a RecipeProvider');
    }
    const { recipeForm, setRecipeForm } = context;
    
    // Use a ref to access the textarea DOM element
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Handle dynamic height adjustment
    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (textarea) {
        textarea.style.height = 'auto'; // Reset height to allow shrinking
        textarea.style.height = `${textarea.scrollHeight}px`; // Set height to fit content
        }
    };

    return(
        <div id="recipe-main">
            <div id='recipe-title' className="large-input-field">
                <label htmlFor="recipe-title-input"><h2>Title:</h2></label>
                <input type="text" 
                id="recipe-title-input"
                value = {recipeForm.name}
                onChange = {(e) => setRecipeForm({...recipeForm, name: e.target.value})}
                required/>
            </div>
            <div id='recipe-summary' className="large-input-field">
                <label htmlFor="recipe-summary-input"><h2>Summary</h2></label>
                <textarea 
                id="recipe-summary-input"
                ref={textareaRef}
                onInput={handleInput}  />
            </div>
        </div>
    )
}

export default RecipeMain;