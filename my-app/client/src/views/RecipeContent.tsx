import { useEffect, useState } from 'react'
import '../css/RecipeContent.css';
import pasta_img from '../assets/pasta_img.png'
import { useParams } from "react-router-dom";
import { IPost } from '../../../PostInterface';

// Define the Comment interface to ensure each comment has a text and likes property
interface Comment {
  text: string;
  likes: number;
}

interface recipe_content extends IPost{
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

  const [recipeData, setRecipeData] = useState<recipe_content>();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await fetch(
        `http://localhost:5050/recipe/${params.id}`
      );
      if (!response.ok) {
        const message = 'An error has occurred: ${response.statusText}';
        console.error(message);
        return;
      }
      const recipe = await response.json();
      if (!recipe) {
        console.warn('Record with id ${id} not found');
        return;
      }
      setRecipeData(recipe);
    }
    fetchData();
    return;
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
                <p className="rating">Rating: 4.2 / 5 | Likes: 1.6k</p>
              </div>

              {/* Recipe Details Section */}
              <div className="details">
                <p>🕒 Prep: 20 min | 🕒 Estimated Total: 1.1 hr | Serves: 6 | Calories: 550</p>
                <p>Tags: <span className="tag fast">Fast</span> <span className="tag cheap">Cheap</span> <span className="tag italian">Italian</span></p>
                <p>Created by: [User]</p>
              </div>

              {/* Ingredients List */}
              <div className="ingredients">
                <h3>Ingredients:</h3>
                <p>1 small onion (chopped), 1 bell pepper (chopped), 2 tbsp garlic powder, 3 tbsp butter, 1 tsp salt, 1 tsp pepper, 2 cans (15 oz) tomato sauce, 1 box (16 oz) spaghetti noodles, 1 - 1 1/2 lb hamburger meat</p>
              </div>

              {/* Cooking Directions */}
              <div className="directions">
                <h3>Directions:</h3>
                <ol>
                  <li>On medium heat, melt the butter and saute the onion and bell peppers.</li>
                  <li>Add the hamburger meat and cook until meat is well done.</li>
                  <li>Add the tomato sauce, salt, pepper, and garlic powder.</li>
                  <li>Adjust salt, pepper, and garlic powder to taste.</li>
                  <li>Cook noodles as directed.</li>
                  <li>Mix the sauce and noodles if you like; I keep them separated.</li>
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