import { ChangeEvent, useContext, useRef } from "react";
import { recipeContext } from "../../context/RecipeContext";
import { recipeFormErrorContext } from "../../context/RecipeFormErrorsContext";

function RecipeMain() {
    const context = useContext(recipeContext);
    if (!context) {
        throw new Error('Component must be used within a RecipeProvider');
    }
    const { recipeForm, setRecipeForm } = context;

    // Error context from parent wrapper
    const errorContext = useContext(recipeFormErrorContext);
    if (!errorContext) {
        throw new Error('Component must be used within a RecipeProvider');
    }
    const { recipeFormError } = errorContext;
    
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
            <p><b>* Indicates required field</b></p>
            <div id='recipe-title' className="large-input-field">
                <label htmlFor="recipe-title-input"><h2>Title:*</h2></label>
                <input type="text" 
                id="recipe-title-input"
                value = {recipeForm.name}
                onChange = {(e) => setRecipeForm({...recipeForm, name: e.target.value})}
                />
            </div>
            {recipeFormError.title && <span className="error">{recipeFormError.title}</span>}
            <div id='recipe-summary' className="large-input-field">
                <label htmlFor="recipe-summary-input"><h2>Summary:</h2></label><br/>
                <span><i>(300 characters max)</i></span>
                <textarea 
                id="recipe-summary-input"
                ref={textareaRef}
                onInput={handleInput}
                onChange={(e) => setRecipeForm({...recipeForm, summary: e.target.value})}  />
                {recipeFormError.summary && <span className="error">{recipeFormError.summary}</span>}
            </div>
        </div>
    )
}

export default RecipeMain;