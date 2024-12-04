import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecipeContent.css";
import pasta_img from "../assets/pasta_img.png";
import { useParams } from "react-router-dom";
import blackRibbon from "../assets/blackRibbon.svg";
import whiteRibbon from "../assets/whiteRibbon.svg";
import RatingStars from "../components/RecipeContent/RatingStars";
import CommentLike from "../components/RecipeContent/CommentLike";
import { ratingContext } from "../context/RatingContext";
import { IPost } from "../../../PostInterface";

// Define the Comment interface to ensure each comment has a text and likes property
interface Comment {
  text: string;
  likes: number;
}

interface recipe_content extends IPost {
  _id: string;
}

// Main component function
function RecipeContent() {
  // State to manage the list of comments, initially containing a few sample comments

  const { userRating, setUserRating } = useContext(ratingContext);

  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0); // Refreshes the current route
  };



  const [comments, setComments] = useState<Comment[]>([
    { text: "This was so simple to make but so delicious!", likes: 2 },
    { text: "So good! I recommend adding more veggies!", likes: 3 },
    { text: "Can’t wait to see more recipes from you!", likes: 1 },
  ]);


 // State to manage the input for new comments
 const [newComment, setNewComment] = useState('');
 // State to mange alert visability for share feature
 const [alertVisible, setAlertVisible] = useState(false);

  // Function to handle adding a new comment to the comments list
  const handleAddComment = () => {
    // Add only if there's text in the newComment input
    if (newComment.trim()) {
      // Update comments state by appending the new comment
      setComments([...comments, { text: newComment, likes: 0 }]);
      // Clear the input field
      setNewComment("");
    }
  };

  const params = useParams();

  const [recipeData, setRecipeData] = useState<recipe_content>();
  const [isFav, setIsFav] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString();
      if (!id) {
        console.warn("No recipe ID provided");
        return;
      }
      try {
        console.log(`Fetching recipe with ID: ${id}`);
        const response = await fetch(`http://localhost:5050/recipe/${id}`);
        if (!response.ok) {
          throw new Error(`An error has occurred: ${response.statusText}`);
        }
        const recipes = await response.json();
        if (!recipes || recipes.length === 0) {
          console.warn(`No recipes found with id ${id}`);
          return;
        }
        // Find the specific recipe matching the ID from the fetched recipes
        const recipe = recipes.find(
          (recipe: recipe_content) => recipe._id === id
        );

        if (recipe) {
          console.log("Fetched recipe data:", recipe);
          setRecipeData(recipe); // Store the specific recipe in the state
        } else {
          console.warn(`Recipe with ID ${id} not found`);
        }
        } catch (err) {
          console.error("Fetch error:", err);
        }
    }
    fetchData();
  }, [params.id]);

const userString = localStorage.getItem('user');
let user;
let userId: string;
let token;

 // Parse the JSON string into an object
if (userString) {
    user = JSON.parse(userString);
    userId = String(user._id);
    token = String(user.token);
    console.log('User ID:', userId);
} else {
    user = null;
    userId = "";
    token = null;
    console.log('No user found in localStorage');
}


useEffect(() => {
  const fetchUserInfo = async () => {
    try {
        const response = await fetch(`http://localhost:5050/api/me/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch ratings');
        }
  
        const data = await response.json();
        console.log('Fetched user rating:', data.ratings);
        console.log('Fetched user favorites:', data.favorites);
  
        // Check if any rating matches the recipeID
        const matchingRating = data.ratings.find(
            (rating: [string, number]) => rating[0] === params.id
        );
  
        if (matchingRating) {
            console.log(`Matching rating found: RecipeID=${matchingRating[0]}, Rating=${matchingRating[1]}`);
            setUserRating(matchingRating[1]); // Set the user's rating
        } else {
            console.log('No matching rating found for this recipeID');
            setUserRating(0); // Default to 0 if no rating is found
        }
  
        const matchingFavorite = data.favorites.find((favorite: string) => favorite === params.id);

        if(matchingFavorite) {
          console.log("matching Favorite found");
            setIsFav(true);
        }
        else {
          console.log("matching favorite was not found");
          setIsFav(false);
        }
  
    } catch (error) {
        console.error('Error fetching ratings:', error);
        setUserRating(0); // Default to 0 in case of an error
    }
  };
  fetchUserInfo();
}, [params.id]); // Re-run if the recipe ID changes

 // Bookmark/favorite funcionality
function ToggleBookmark({ isFav }: { isFav : boolean }) {
  const bookmarkToggle = async() => {
    try{

      const response = await fetch(`http://localhost:5050/api/favorites`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          userId: userId?.toString(),
          itemId: params.id?.toString(),
      }),
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update favorites');
      }
      
      const data = await response.json();
      console.log('favorites updated successfully:', data);
      
  }

    catch (error) {
        console.error('Error updating rating:', error);
        throw error;
    }

    handleRefresh();
  };
    
    return (
    <img
      data-testid= "testID?"
      style={{ color: isFav ? "red" : "black", width: "20px" }}
      id="save-icon"
      onClick={bookmarkToggle}
      role="button"
      src={isFav ? blackRibbon : whiteRibbon}
      alt="savemark"
    />
  );
}


/* Like Button for recipe*/

// Use initial value from recipeData
const [numberLikes, setNumberLikes] = useState<number>(recipeData?.likes || 0); 
// Default to not liked
const [isLiked, setIsLiked] = useState<boolean>(false); 


// // Update numberLikes when recipeData changes
useEffect(() => {
  if (!recipeData?._id) return;

  // Initialize likes
  const storedLikes = localStorage.getItem(`likes_${recipeData._id}`);
  const storedIsLiked = localStorage.getItem(`isLiked_${recipeData._id}`);

  setNumberLikes(storedLikes ? parseInt(storedLikes, 10) : recipeData.likes || 0);
  setIsLiked(storedIsLiked === 'true');
}, [recipeData]);

const likeRecipeToggle = () => {
  if (!recipeData) return;

  setIsLiked((prevLiked) => {
    const updatedLiked = !prevLiked;
    const likeChange = updatedLiked ? 1 : -1;

    setNumberLikes((prevLikes) => {
      const updatedLikes = prevLikes + likeChange;

      localStorage.setItem(`isLiked_${recipeData._id}`, updatedLiked.toString());
      localStorage.setItem(`likes_${recipeData._id}`, updatedLikes.toString());

      return updatedLikes;
    });

    return updatedLiked;
  });
};
  

// // Update numberLikes when recipeData changes
useEffect(() => {
  if (!recipeData?._id) return;

  // Initialize likes
  const storedLikes = localStorage.getItem(`likes_${recipeData._id}`);
  const storedIsLiked = localStorage.getItem(`isLiked_${recipeData._id}`);

  setNumberLikes(storedLikes ? parseInt(storedLikes, 10) : recipeData.likes || 0);
  setIsLiked(storedIsLiked === 'true');
}, [recipeData]);
  
 // Share button functionality
 const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setAlertVisible(true);
      // Hide alert after 2 seconds
      setTimeout(() => setAlertVisible(false), 2000); 
    });
 };
  
   // Runtime rating calculation
   const isValidNumRating = (recipeData?.numOfRatings === undefined || recipeData?.numOfRatings < 1);
   let rating = isValidNumRating ? "-" : (recipeData?.ratingsTotal / recipeData?.numOfRatings).toFixed(1); // Shows placeholder value for rating if there isnt a valid numRatings in db
   rating = rating.replace(/[.,]0$/, ""); // Format rating value to show decimal values only if they are nonzero
 
  return (
    <div className="app">
      <div className="recipe">
        <div className="titleAndDetails">
          <div className="titleAndImg">
            <div className="titleDetailContainer">
              {/* Recipe Title and Rating */}
              <div className="titleSection">
                <h1>{recipeData?.name}</h1>
                <p className="rating">
                  Rating: {rating} / 5 | Likes: {recipeData?.likes}
                </p>
              </div>

              {/* Recipe Details Section */}
              <div className="details">
              <p>🕒 Prep: {recipeData?.prep_time} {recipeData?.prep_time_unit} | 🕒 Estimated Total: {recipeData?.estimated_total_time} {recipeData?.estimated_total_time_unit} | Serves: {recipeData?.serving} | Calories: {recipeData?.calories} | Cost: ${recipeData?.cost}</p>
              <p>
                Tags:{" "}
                {recipeData?.tags?.length ? (
                  recipeData.tags.map((tag, index) => (
                    <span key={index} className={`tag ${tag.toLowerCase()}`}>{tag}</span>
                  ))
                ) : (
                  <span>No tags available</span>
                )}
              </p>
            </div>

             {/* Summary */}
             <div className="summary">
               <h3>Summary:</h3>
               <p>{recipeData?.summary}</p>
             </div>


             {/* Ingredients List */}
             <div className="ingredients">
               <h3>Ingredients:</h3>
               <p>
                 {recipeData?.ingredients?.length
                   ? recipeData.ingredients.join(", ")
                   : "No ingredients available"}
               </p>
             </div>


             {/* Cooking Directions */}
             <div className="directions">
               <h3>Directions:</h3>
               <ol>
                 {recipeData?.directions?.length
                   ? recipeData.directions.map((direction, index) => (
                       <li key={index}>{direction}</li>
                     ))
                   : <li>No directions available</li>}
               </ol>
             </div>


             {/* Action Buttons Section */}
             <div className="actions">
               <button onClick={handleShare}>Share: 🔗</button>
               <p className={`alert-box ${alertVisible ? 'visible' : ''}`}>Copied to clipboard!</p>
               <button>Bookmark: <ToggleBookmark isFav = {isFav} /></button>
               <button
                 data-testid='like-post'
                 className='likeRecipe'
                 id="likeRecipe"
                 onClick={likeRecipeToggle}
               >
                 Like: {isLiked ? '💖' : '🤍'}
               </button>
               <RatingStars initialRating={userRating} recipeID={recipeData?._id} />
             </div>
           </div>


           {/* Image Section */}
           <div className="imgContainer">
             <div className="imgHolder">
               <img className='pasta_img' src={pasta_img} alt="Delicious plate of pasta" />
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 );
}

export default RecipeContent;