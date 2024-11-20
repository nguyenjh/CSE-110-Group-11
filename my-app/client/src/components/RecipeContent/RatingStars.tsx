import { useState } from "react";
import "../../css/RatingStars.css";

const numberOfSymbols = 5;
const symbol = '✭';
const default_unselected_color = 'grey';
const default_selected_color = '#FFBB00';

export default function RatingStars({ratings, index}) {
    const [rating, setRating] = useState(ratings);
    const [tempRating, setTempRating] = useState(0);

    let stars = Array(numberOfSymbols).fill(symbol);
    const handleClickSymbol = (rating) => {
        setRating(rating);
        localStorage.setItem(`starRating ${index}`, rating);//change this later to store it to the db
    }

    return (
        <div>
            <span>Ratings:</span>
            <div className="StarsContainer">
            {stars.map((item,index) => {
                const isActivedColor = (rating || tempRating) && (index < rating || index < tempRating );      
                let elementColor = "";
                if(isActivedColor) {
                elementColor = default_selected_color;
                }
                else{
                elementColor = default_unselected_color;
                }
                        
                return (
                <div className="star" key={index} 
                    style={{ fontSize: '25px', color: elementColor, filter: `${isActivedColor? "grayscale(0%)" : "grayscale(100%)"}`}}
                    onMouseEnter={() => setTempRating(index +1)}
                    onMouseLeave={() => setTempRating(0)}
                    onClick={() => handleClickSymbol(index + 1)}>
                    
                 {symbol}
                </div>)
            })}
            </div>      
      </div>
    )

}