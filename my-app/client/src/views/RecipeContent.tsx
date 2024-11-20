import { useEffect, useState } from 'react';
import '../css/RecipeContent.css';
import pasta_img from '../assets/pasta_img.png';
import { useParams } from "react-router-dom";

// Define the Comment interface to ensure each comment has a text and likes property
interface Comment {
  text: string;
  likes: number;
}

interface recipe_content {
  name: string;
  user: string;
  rating: number;
  likes: number;
  summary: string;
  prep_time: number;
  prep_time_unit: string;
  estimated_total_time: number;
  estimated_total_time_unit: string;
  serving: number;
  calories: number;
  cost: string;
  tags: string[];
  ingredients: string[];
  directions: string[];
  _id: string;
}

// Main component function
function RecipeContent() {
  // State to manage the list of comments, initially containing a few sample comments
  const [comments, setComments] = useState<Comment[]>([
    { text: 'This was so simple to make but so delicious!', likes: 2 },
    { text: 'So good! I recommend adding more veggies!', likes: 3 },
    { text: 'Can’t wait to see more recipes from you!', likes: 1 }
  ]);

  // State to manage the input for new comments
  const [newComment, setNewComment] = useState('');

  // Function to handle adding a new comment to the comments list
  const handleAddComment = () => {
    // Add only if there's text in the newComment input
    if (newComment.trim()) {
      // Update comments state by appending the new comment
      setComments([...comments, { text: newComment, likes: 0 }]);
      // Clear the input field
      setNewComment('');
    }
  };

  const params = useParams();

  // Initialize recipeData with default values to prevent undefined access
  const [recipeData, setRecipeData] = useState<recipe_content>({
    name: '',
    user: '',
    rating: 0,
    likes: 0,
    summary: '',
    prep_time: 0,
    prep_time_unit: '',
    estimated_total_time: 0,
    estimated_total_time_unit: '',
    serving: 0,
    calories: 0,
    cost: '',
    tags: [],
    ingredients: [],
    directions: [],
    _id: ''
  });

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(`http://localhost:5050/recipe/${params.id}`);
      if (!response.ok) {
        console.error(`An error has occurred: ${response.statusText}`);
        return;
      }
      const recipe = await response.json();
      if (!recipe) {
        console.warn(`Record with id ${id} not found`);
        return;
      }
      setRecipeData(recipe);
    }
    fetchData();
  }, [params.id]);

  return (
    <div className="app">
      <div className="recipe">
        <div className="titleAndDetails">
          <div className="titleAndImg">
            <div className="titleDetailContainer">

              {/* Recipe Title and Rating */}
              <div className="titleSection">
                <h1>{recipeData?.name}</h1>
                <p className="rating">Rating: {recipeData?.rating} / 5 | Likes: {recipeData?.likes}</p>
              </div>

              {/* Recipe Details Section */}
              <div className="details">
                <p>🕒 Prep: {recipeData?.prep_time} {recipeData?.prep_time_unit} | 🕒 Estimated Total: {recipeData?.estimated_total_time} {recipeData?.estimated_total_time_unit} | Serves: {recipeData?.serving} | Calories: {recipeData?.calories} | Cost: {recipeData?.cost}</p>
                <p>Tags: 
                  {Array.isArray(recipeData?.tags) && recipeData?.tags.length > 0 ? (
                    recipeData?.tags.map((tag, index) => (
                      <span key={index} className={`tag ${tag.toLowerCase()}`}>{tag}</span>
                    ))
                  ) : (
                    <span>No tags available</span>
                  )}
                </p>
                <p>Created by: {recipeData?.user}</p>
              </div>

              {/* Summary */}
              <div className="summary">
                <h3>Summary:</h3>
                <p>{recipeData?.summary}</p>
              </div>

              {/* Ingredients List */}
              <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                  {Array.isArray(recipeData?.ingredients) && recipeData?.ingredients.length > 0 ? (
                    recipeData?.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))
                  ) : (
                    <p>No ingredients available</p>
                  )}
                </ul>
              </div>

              {/* Cooking Directions */}
              <div className="directions">
                <h3>Directions:</h3>
                <ol>
                  {Array.isArray(recipeData?.directions) && recipeData?.directions.length > 0 ? (
                    recipeData?.directions.map((direction, index) => (
                      <li key={index}>{direction}</li>
                    ))
                  ) : (
                    <p>No directions available</p>
                  )}
                </ol>
              </div>

              {/* Action Buttons Section */}
              <div className="actions">
                <button>Share: 🔗</button>
                <button>Bookmark: 🔖</button>
                <button>Like: ❤️</button>
                <div className="rating">Rating: ⭐⭐⭐☆☆</div>
              </div>
            </div>

            {/* Image and Comments Section */}
            <div className="imgAndCommentsContainer">
              <div className="imgHolder">
                <img className='pasta_img' src={pasta_img} alt="Delicious plate of pasta" />
              </div>
              
              {/* Comments Section */}
              <div className="comments">
                <h3>Comments:</h3>
                
                {/* Input field to post a new comment */}
                <div className="commentInputAndBtn">
                  <input
                    type="text"
                    placeholder="Post a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button onClick={handleAddComment}>Post</button>
                </div>
                
                {/* Display each comment */}
                <div className="comment-section">
                  {comments.map((comment, index) => (
                    <div key={index} className="comment">
                      <p>{comment.text}</p>
                      <p>❤️ {comment.likes}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeContent;
