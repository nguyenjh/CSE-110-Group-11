import { useEffect, useState } from 'react'
import '../css/RecipeContent.css';
import pasta_img from '../assets/pasta_img.png'
import { useParams } from "react-router-dom";
import blackRibbon from '../assets/blackRibbon.svg';
import whiteRibbon from '../assets/whiteRibbon.svg';
import RatingStars from '../components/RecipeContent/RatingStars';

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


  /*Favorite Button*/
  const [favoriteList, setFavoriteList] = useState<string[]>([]); //favorite list per user, get from db later
        
  function ToggleBookmark({recipeID} : {recipeID: string}) {
    const [isFav, setIsFav] = useState(favoriteList.includes(recipeID));

    const bookmarkToggle = () => {
      setIsFav(!isFav);
    };

    useEffect(() => {
      if(isFav && !favoriteList.includes(recipeID)){
        setFavoriteList((prev) => [...prev, recipeID]);
      } else if( !isFav && favoriteList.includes(recipeID)){
        setFavoriteList((prev)=>prev.filter((checkingRecipe) => checkingRecipe != recipeID));
        }
    }, [isFav]);
      
    return (
      <img style={{ color: isFav ? 'red' : 'black' , width: '20px'}}  id ="save-icon" onClick={bookmarkToggle} role='button'
        src={isFav ? blackRibbon : whiteRibbon} alt="savemark">
      </img>
    );
  };

  /* Like Button for recipe*/

  const [numberLikes, setNumberLikes] = useState<number>(0); // change initial by getting number of likes from db later
  const [isLiked, setIsLiked] = useState<boolean>(false); //change initial by getting from db

  function LikeRecipeButton() {

    const likeRecipeToggle = () => {
      setIsLiked((prevIsLiked) => {
        const newIsLiked = !prevIsLiked;
        setNumberLikes((prevLikes) => (newIsLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1)));
        return newIsLiked;
      });
    };
  
    return(
      <button
        className='likeRecipe'
        id="likeRecipe"
        onClick={likeRecipeToggle}
      >
        Like: {isLiked ?'💖' : '🩶'}
      </button>
    );
  }

   
  /* Rating Star */
  const recipeID = '1'; // Hard code for demo, change to const recipeID = recipeData?._id;
  const ratings = localStorage.getItem(`starRating ${recipeID}`); // Change to get it from db later


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
                <ToggleBookmark recipeID={'2'} />  {/*hardcode for now, can change later */}
              </div>

              {/* Recipe Details Section */}
              <div className="details">
                <p>🕒 Prep: {recipeData?.prep_time} {recipeData?.prep_time_unit} | 🕒 Estimated Total: {recipeData?.estimated_total_time} {recipeData?.estimated_total_time_unit} | Serves: {recipeData?.serving} | Calories: {recipeData?.calories} | Cost: {recipeData?.cost}</p>
                <p>Tags: 
                    {recipeData?.tags.map((tag, index) => (
                        <span key={index} className={`tag ${tag.toLowerCase()}`}>{tag}</span>
                    ))}
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
                <p>{recipeData?.ingredients}</p>
              </div>

              {/* Cooking Directions */}
              <div className="directions">
                <h3>Directions:</h3>
                <ol>
                    {recipeData?.directions.map((direction, index) => (
                        <li key={index}>{direction}</li>
                    ))}
                </ol>
              </div>

              {/* Action Buttons Section */}
              <div className="actions">
                <button>Share: 🔗</button>
                <button>Bookmark: <ToggleBookmark recipeID={'2'} /></button> {/*hardcode for now, can change later */}
                <LikeRecipeButton />
                <RatingStars ratings={ratings} index={'2'} />
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
                  {comments.map((comment, index) => {
                     /* Like Button for comment*/
                     const [numberLikesPerComment, setnumberLikesPerComment] = useState<number>(0); // change initial by getting number of likes from db later
                     const [likeComment, setLikeComment] = useState<boolean>(false); //change initial by getting from db
                 
                     const likeCommentToggle = () => {
                       setLikeComment((prevIsLiked) => {
                         const newIsLiked = !prevIsLiked;
                         setnumberLikesPerComment((prevLikes) => (newIsLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1)));
                         return newIsLiked;
                       });
                     }
                 
                      return(
                        <div key={index} className="comment">
                          <p>{comment.text}</p>
                          <div>
                            <button
                            id="likeComment"
                            onClick={likeCommentToggle}
                            style={{ border:'none', background:'none', fontSize:'20px'}}
                            >
                              {likeComment ? '💖' : '🩶'}
                            </button>
                            <span>{numberLikesPerComment}</span>
                          </div>
                        </div>
                      )  
                  })}
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