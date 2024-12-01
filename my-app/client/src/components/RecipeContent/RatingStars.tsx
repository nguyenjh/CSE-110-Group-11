import { useState } from "react";
import "../../css/RatingStars.css";

// Constants
const numberOfSymbols = 5;
const symbol = '✭';
const default_unselected_color = 'grey';
const default_selected_color = '#FFBB00';

// Props interface
interface RatingStarsProps {
    initialRating: number | undefined;
    recipeID: string | undefined;
}

export default function RatingStars({initialRating, recipeID}:RatingStarsProps) {
    initialRating = initialRating ? initialRating : 0; // Unwrapping optional initialRating
    // State to separate onhover and onclick rating star states
    const [rating, setRating] = useState(initialRating); // Retains old value if post has be reviewed before, else 0 
    const [tempRating, setTempRating] = useState(0);
    
    // Star array for the five star symbols display
    let stars = Array(numberOfSymbols).fill(symbol);

    // Dummy user ratingsList map
    const ratingsMap = new Map(); // TODO: get current session's user's ratings list
    ratingsMap.set(`673bbff9ef36b9f360142f4a`, 4); // Temp testing hardcoded user's ratings list   

    const handleClickSymbol = async(new_rating_input:number) => {
        setRating(new_rating_input);
        const incrementCount = (!ratingsMap.has(recipeID)); // True means user has never rated this recipe before:+1 to the numRatings
        const newRating = initialRating; // Difference between new and old

        console.log("isThisNewRating?: " + incrementCount)
        console.log("difference of new vs old rating: " + newRating)
        try {
            const response = await fetch(`http://localhost:5050/recipe/${recipeID}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                newRating, 
                incrementCount }),
            });
        
            if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update rating');
            }
        
            const data = await response.json();
            console.log('Rating updated successfully:', data);
            return data;
        } catch (error) {
            console.error('Error updating rating:', error);
            throw error;
        }
    };

    return (
        <div>
            <span>Ratings:</span>
            <div className="StarsContainer">
            {stars.map((item,star_index) => {
                const isActivedColor = (rating || tempRating) && (star_index < rating || star_index < tempRating );      
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