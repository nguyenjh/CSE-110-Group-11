import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/RatingStars.css";
import { ratingContext } from "../../context/RatingContext";

// Constants
const numberOfSymbols = 5;
const symbol = '✭';
const default_unselected_color = 'grey';
const default_selected_color = '#FFBB00';

// Props interface
interface RatingStarsProps {
    initialRating: number;
    recipeID: string | undefined;
}

export default function RatingStars({initialRating, recipeID}:RatingStarsProps) {
    const { userRating, setUserRating } = useContext(ratingContext);

    const [tempRating, setTempRating] = useState(0);

    const navigate = useNavigate();

    const handleRefresh = () => {
      navigate(0); // Refreshes the current route
    };
  

    // Star array for the five star symbols display
    let stars = Array(numberOfSymbols).fill(symbol);
    
    const userString = localStorage.getItem('user');
    let user: { _id: string; token: string } | null = null; // Explicitly define the type
    let userId: string | null = null;
    let token: string | null = null;
    
    // Parse the JSON string into an object
    if (userString) {
        user = JSON.parse(userString);
        if (user && typeof user._id === 'string' && typeof user.token === 'string') {
            userId = user._id.toString();
            token = String(user.token);
            console.log('User ID:', userId);
        } else {
            console.warn('Invalid user data in localStorage');
        }
    }
    


    const handleClickSymbol = async(new_rating_input:number) => {
        let noRating = initialRating ? 1 : 0
        const ratingDifference =  new_rating_input - initialRating; // Difference between new and old
        setUserRating(new_rating_input);
        const incrementCount = (!noRating); // True means user has never rated this recipe before:+1 to the numRatings

        
        console.log("New rating inputted: " + new_rating_input);
        console.log("rating is: " + userRating);
        console.log("isThisNewRating?: " + incrementCount);
        console.log("difference of new vs old rating: " + ratingDifference);

        console.log("Trying post update");
        try {
            const response = await fetch(`http://localhost:5050/recipe/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                recipeID: recipeID, 
                ratingDifference: ratingDifference, 
                incrementCount: incrementCount,
                newRating: new_rating_input}),
            });
        
            if (!response.ok) {
                const errorDetails = await response.json();
                console.error("Error response:", errorDetails);
                throw new Error(errorDetails.error || "Failed to update ratings");
            }
        
            const data = await response.json();
            console.log('Rating updated successfully:', data);
            console.log('Rating updated to ' + (data.totalRatings/data.numOfRatings));
            } catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }

        console.log("Trying user update for rating.")
        try{

            const response = await fetch(`http://localhost:5050/api/ratings`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId?.toString(),
                itemId: recipeID?.toString(),
                newRating: new_rating_input,
            }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to update ratings');
            }
            
            const data = await response.json();
            console.log('Rating updated successfully:', data);
            
        }

        catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }

        handleRefresh();
    };

    return (
        <div>
            <span>Ratings:</span>
            <div className="StarsContainer">
            {stars.map((item,star_index) => {
                const isActivedColor = (userRating || tempRating) && (star_index < userRating || star_index < tempRating );      
                let elementColor = isActivedColor ? default_selected_color : default_unselected_color;
                        
                return (
                <div className="star" key={star_index} 
                    style={{ fontSize: '25px', color: elementColor, filter: `${isActivedColor? "grayscale(0%)" : "grayscale(100%)"}`}}
                    onMouseEnter={() => setTempRating(star_index +1)}
                    onMouseLeave={() => setTempRating(0)}
                    onClick={() => handleClickSymbol(star_index + 1)}>
                    
                {symbol}
                </div>)
            })}
            </div>      
        </div>
    )
}